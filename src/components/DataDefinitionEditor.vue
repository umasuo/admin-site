<template>
  <div class="modal fade data-editor" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">

          <form>
            <!-- id is unmutable -->
            <template v-if="isAddingNew">
              <label>{{$t('product_definition.data.id')}}: </label>
              <input type="text" class="form-control" v-model="editingDataDefinition.dataId" required>
            </template>

            <label>{{$t('product_definition.data.name')}}: </label>
            <input type="text" class="form-control" v-model="editingDataDefinition.name" required>

            <label>{{$t('misc.description')}}: </label>
            <textarea class="form-control" v-model="editingDataDefinition.description" required></textarea>

            <label>{{$t('product_definition.data.def')}} <small>{{$t('product_definition.data.def_1')}} <a href="http://json-schema.org/" target="_blank">{{$t('product_definition.data.def_2')}}</a> {{$t('product_definition.data.def_3')}}</small>: </label>
            <div class="data-def-editor" ref="dataEditor">{{ JSON.stringify(JSON.parse(editingDataDefinition.schema), null, 2) }}</div>

            <button type="button" class="btn btn-primary" @click="generateJson">{{$t('product_definition.data.update_demo_data')}}</button>
            <span v-if="errMsg">{{$t('product_definition.data.err')}}
              <a href="javascript:;" class="text-danger" @click="showErrMsg = !showErrMsg">{{$t('product_definition.data.show_err_detail')}}</a>
            </span>

            <div>
              <textarea class="data-editor__err-msg" rows="10" v-if="errMsg && showErrMsg">
                {{ errMsg }}
              </textarea>
            </div>

            <div class="clear-fix"></div>

            <label>{{$t('product_definition.data.demo_data')}}: </label>
            <textarea class="form-control data-editor__demo" v-model="demoJson" readonly></textarea>
          </form>

        </div>
        <div class="modal-footer">
          <p class="text-danger" v-if="message === 'fail'"><small>{{$t('misc.save_fail')}}</small></p>
          <p class="text-danger" v-else-if="message === 'id has been taken'"><small>{{$t('product_definition.data.id_taken')}}</small></p>
          <p class="text-danger" v-else-if="message !== ''"><small>{{$t('misc.cancel')}}</small></p>

          <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('misc.close')}}</button>
          <button type="button" class="btn btn-primary" @click="finishEditing">{{$t('misc.save')}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'

  // prefetch libraries for DataDefinitionEditor (Copy these two line to other component)
  // import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')
  // import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')

  export default {
    name: 'DataDefinitionEditor',

    props: {
      productType: {
        type: Object,
        require: true
      },

      productData: {
        type: Object,
        require: false
      },

      viewOnly: Boolean
    },

    data () {
      let isAddingNew = false
      let editingDataDefinition

      if (this.productData) {
        editingDataDefinition = Object.assign({}, this.productData)
      } else {
        isAddingNew = true

        // demo json schema for new data definition
        editingDataDefinition = {
          dataId: 'newDataId',
          name: '范例数据定义',
          description: '范例数据定义，修改以创建新的数据定义',
          openable: false,
          schema: `{
            "id": "node",
            "type": "object",
            "properties": {
              "title": {
                "type": "string"
              },
              "sub_nodes": {
                "type": "array",
                "items": {
                  "$ref": "node"
                }
              }
            },
            "required": ["title"]
          }`
        }
      }

      return {
        editingDataDefinition,
        isAddingNew,
        errMsg: null,
        showErrMsg: false,
        demoJson: '',

        message: ''
      }
    },

    computed: {
      title () {
        return this.isAddingNew ? '新增标准数据定义' : `编辑"${this.editingDataDefinition.name}"`
      }
    },

    async mounted () {
      const brace = (await import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')).default

      this.editor = brace.edit(this.$refs.dataEditor)
      this.editor.getSession().setMode('ace/mode/json')
      if (this.ReadOnly) {
        this.editor.setReadOnly(true)
      }
    },

    methods: {
      async finishEditing () {
        try {
          await this.parseSchema()
        } catch (e) {
          this.errMsg = e.message
          return
        }

        const actionName = this.isAddingNew ? 'addProductTypeData' : 'updateProductTypeData'
        let action
        if (this.isAddingNew) {
          action = {action: actionName, ...this.editingDataDefinition}
        } else {
          action = {action: actionName, dataDefinitionId: this.productData.id, ...this.editingDataDefinition, openable: false}
        }

        try {
          const updatedProductType = await api.productTypes.updateType(this.productType.id,
            await api.buildRequest(this.productType.version)
              .addAction(action)
              .request)
          this.$emit('updated', updatedProductType)
          $(this.$refs.modal).modal('hide')
        } catch (e) {
          console.dir(e)
          switch (e.message) {
            case 'Request failed with status code 409':
              this.message = 'id has been taken'
              break
            default:
              this.message = 'fail'
          }
        }
      },

      async parseSchema () {
        const schema = JSON.parse(this.editor.getValue())

        const {ajv} = await import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
        const valid = ajv.validateSchema(schema)

        if (!valid) {
          const errorMsg = ajv.errorsText(ajv.errors, { separator: '\n' }) + '\najv validateSchema errors:\n' +
            JSON.stringify(ajv.errors, null, 2)
          throw new Error(errorMsg)
        } else {
          this.editingDataDefinition.schema = this.editor.getValue()
          return schema
        }
      },

      async generateJson () {
        this.errMsg = null

        try {
          const schema = await this.parseSchema()
          // faker is a huge module, lazy load it
          const {faker} = await import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
          const result = faker(schema)

          this.demoJson = JSON.stringify(result, null, 2)
        } catch (e) {
          this.errMsg = e.message
        }
      }
    }
  }
</script>

<style lang="scss">
  .data-editor {
    &__err-msg {
      width: 100%;
      color: red;
    }

    textarea {
      resize: vertical;
    }

    &__demo {
      min-height: 150px;
    }
  }

  .data-def-editor {
    min-height: 250px;
    resize: vertical;
    overflow: auto;
    margin-bottom: 4px;

    span {
      line-height: 16px;
    }
  }
</style>
