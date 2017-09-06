<template>
  <div class="modal fade data-editor" ref="modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">查看数据定义</h4>
        </div>
        <div class="modal-body">

          <label>{{$t('product_definition.data.id')}}: </label>
          <input type="text" class="form-control" v-model="editingDataDefinition.dataId" readonly>

          <label>{{$t('product_definition.data.name')}}: </label>
          <input type="text" class="form-control" v-model="editingDataDefinition.name" readonly>

          <label>{{$t('misc.description')}}: </label>
          <textarea class="form-control" v-model="editingDataDefinition.description" readonly></textarea>

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

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('misc.close')}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DataDefinitionViewer',

    props: {
      productData: {
        type: Object,
        require: false
      }
    },

    data () {
      return {
        editingDataDefinition: this.productData,
        errMsg: null,
        showErrMsg: false,
        demoJson: '',

        message: ''
      }
    },

    async mounted () {
      const brace = (await import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')).default

      this.editor = brace.edit(this.$refs.dataEditor)
      this.editor.getSession().setMode('ace/mode/json')
      this.editor.setReadOnly(true)
    },

    methods: {
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
