<template>
  <div class="modal fade data-editor" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">

          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.name')}}: </label>
              <div class="col-xs-9">
                <input type="text" class="form-control" v-model="editingFunc.name">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.id')}}: </label>
              <div class="col-xs-9">
                <input type="text" class="form-control" v-model="editingFunc.functionId">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.type')}}: </label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="boolean" v-model="editingFunc.dataType.type"> {{$t('product_definition.func.datatype.bool')}}</label>
                <label class="eva-radio-label"><input type="radio" value="value" v-model="editingFunc.dataType.type"> {{$t('product_definition.func.datatype.value')}}</label>
                <label class="eva-radio-label"><input type="radio" value="enum" v-model="editingFunc.dataType.type"> {{$t('product_definition.func.datatype.enum')}}</label>
                <label class="eva-radio-label"><input type="radio" value="string" v-model="editingFunc.dataType.type"> {{$t('product_definition.func.datatype.string')}}</label>
              </div>
            </div>

            <!-- Fields for number type -->
            <template v-if="editingFunc.dataType.type === 'value'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.value')}}: </label>
                <div class="col-xs-9 form-inline">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.startValue"> -
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.endValue">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.interval')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.interval">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.multiple')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.multiple">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"> {{$t('product_definition.func_editor.unit')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="" v-model="numberType.unit">
                </div>
              </div>
            </template>

            <!-- Fields for enum type -->
            <template v-else-if="editingFunc.dataType.type === 'enum'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.enum')}}: </label>
                <div class="col-xs-9">
                  <textarea class="form-control" v-model="enumValues" :placeholder="$t('product_definition.func_editor.enum_hint')"></textarea>
                  <p class="text-danger" v-if="enumMessage === 'enum duplicated'"><small>{{$t('product_definition.func_editor.enum_duplicate')}}</small></p>
                  <p class="text-danger" v-else-if="enumMessage !== ''"><small>{{$t('misc.unknow_error')}}</small></p>
                </div>
              </div>
            </template>

            <!-- Fields for string type -->
            <template v-else-if="editingFunc.dataType.type === 'string'">
              <div class="form-group">
                <label class="col-xs-3 control-label">{{$t('product_definition.func_editor.max_lenght')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.max_lenght_hint')" disabled>
                </div>
              </div>
            </template>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func.trans_type')}}: </label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="UPDOWN" v-model="editingFunc.transferType"> {{$t('product_definition.func.transfer.updown')}}</label>
                <label class="eva-radio-label"><input type="radio" value="UP" v-model="editingFunc.transferType"> {{$t('product_definition.func.transfer.up')}}</label>
                <label class="eva-radio-label"><input type="radio" value="DOWN" v-model="editingFunc.transferType"> {{$t('product_definition.func.transfer.down')}}</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">{{$t('misc.description')}}: </label>
              <div class="col-xs-9">
                <textarea class="form-control" v-model="editingFunc.description" :placeholder="$t('product_definition.func_editor.desc')"></textarea>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <p class="text-danger" v-if="message === 'fail'"><small>{{$t('misc.save_fail')}}</small></p>
          <p class="text-danger" v-else-if="message !== ''"><small>{{$t('misc.unknow_error')}}</small></p>

          <button type="submit" class="btn btn-primary" @click.prevent="submit">{{$t('misc.confirm')}}</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('misc.cancel')}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import $ from 'jquery'

  export default {
    name: 'ProductTypeFuncEditor',

    props: {
      mode: {
        default: 'standard',
        type: String
      },
      func: {
        type: Object,
        default () {
          return {
            dataType: {
              type: 'value'
            },
            transferType: 'UPDOWN'
          }
        }
      },
      productType: Object
    },

    data () {
      const numberType = this.func.dataType.type === 'value' ? {...this.func.dataType} : {type: 'value'}
      const enumType = this.func.dataType.type === 'enum' ? {...this.func.dataType} : {type: 'enum'}

      return {
        editingFunc: {...this.func},
        enumType,
        numberType,
        enumValues: enumType.values && enumType.values.join(','),
        enumMessage: '',

        message: ''
      }
    },

    computed: {
      title () {
        switch (this.mode) {
          case 'add':
            return '添加标准功能'
          case 'update':
            return '编辑自定义功能'
        }
      }
    },

    methods: {

      async submit () {
        let dataType = {}
        if (this.editingFunc.dataType.type === 'enum') {
          dataType = {dataType: this.enumType}
        } else if (this.editingFunc.dataType.type === 'value') {
          dataType = {dataType: this.numberType}
        }

        var actionName
        switch (this.mode) {
          case 'add':
            actionName = 'addProductTypeFunction'
            break
          case 'update':
            actionName = 'updateProductTypeFunction'
            break
        }

        try {
          const updatedProductType = await api.productTypes.updateType(this.productType.id,
            api.buildRequest(this.productType.version)
              .addAction({action: actionName, ...this.editingFunc, ...dataType})
              .request)
          this.$emit('updated', updatedProductType)

          $(this.$refs.modal).modal('hide')
        } catch (e) {
          console.dir(e)
          this.message = 'fail'
        }
      }
    },

    watch: {
      enumValues (valuesString) {
        this.enumMessage = ''
        const values = valuesString.split(',')

        // remove duplicate values
        const seen = {}
        const enums = values.filter(item => seen.hasOwnProperty(item) ? false : (seen[item] = true))

        if (enums.length < values.length) {
          this.enumMessage = 'enum duplicated'
        }

        this.enumType.values = enums
      }
    }
  }
</script>

<style lang="scss">
</style>
