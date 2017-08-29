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
                <input type="text" class="form-control" v-model="editingFunc.name" :disabled="viewOnly">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.id')}}: </label>
              <div class="col-xs-9">
                <input type="text" class="form-control" v-model="editingFunc.functionId" :disabled="viewOnly || mode === 'standard'">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.type')}}: </label>
              <div class="col-xs-9">
                <label class="eva-radio-label"><input type="radio" value="boolean" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> {{$t('product_definition.func.datatype.bool')}}</label>
                <label class="eva-radio-label"><input type="radio" value="value" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> {{$t('product_definition.func.datatype.value')}}</label>
                <label class="eva-radio-label"><input type="radio" value="enum" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> {{$t('product_definition.func.datatype.enum')}}</label>
                <!--<label class="eva-radio-label"><input type="radio" value="error" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> 故障型</label>-->
                <label class="eva-radio-label"><input type="radio" value="string" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> {{$t('product_definition.func.datatype.string')}}</label>
                <!--<label class="eva-radio-label"><input type="radio" value="raw" v-model="editingFunc.dataType.type" :disabled="viewOnly || mode === 'standard'"> RAW型</label>-->
              </div>
            </div>

            <!-- Fields for number type -->
            <template v-if="editingFunc.dataType.type === 'value'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.value')}}: </label>
                <div class="col-xs-9 form-inline">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.startValue" :disabled="viewOnly"> -
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.endValue" :disabled="viewOnly">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.interval')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.interval" :disabled="viewOnly">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.multiple')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" :placeholder="$t('product_definition.func_editor.input_int')" v-model="numberType.multiple" :disabled="viewOnly">
                </div>
              </div>

              <div class="form-group">
                <label class="col-xs-3 control-label"> {{$t('product_definition.func_editor.unit')}}: </label>
                <div class="col-xs-9">
                  <input type="text" class="form-control" placeholder="" v-model="numberType.unit" :disabled="viewOnly">
                </div>
              </div>
            </template>

            <!-- Fields for enum type -->
            <template v-else-if="editingFunc.dataType.type === 'enum'">
              <div class="form-group">
                <label class="col-xs-3 control-label"><span class="required">*</span> {{$t('product_definition.func_editor.enum')}}: </label>
                <div class="col-xs-9">
                  <textarea class="form-control" v-model="enumValues" :placeholder="$t('product_definition.func_editor.enum_hint')" :disabled="viewOnly"></textarea>
                  <p class="text-danger" v-if="enumMessage === 'enum duplicated'"><small>{{$t('product_definition.func_editor.enum_duplicate')}}</small></p>
                  <p class="text-danger" v-else-if="enumMessage !== ''"><small>{{$t('misc.unknow_error')}}</small></p>
                </div>
              </div>
            </template>

            <!-- Fields for error type -->
            <!--<template v-else-if="editingFunc.dataType === 'error'">-->
              <!--<div class="form-group">-->
                <!--<label class="col-xs-3 control-label"><span class="required">*</span> 故障值：</label>-->
                <!--<div class="col-xs-9">-->
                  <!--<textarea class="form-control" placeholder="将故障值填入此处，用英文逗号分隔"></textarea>-->
                  <!--<p><small>故障值，是按照对应的字节位来标识的，依次为bit0-bitx，多个字节位代表多个故障可同时发生，最多支持32位。</small></p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</template>-->

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
                <label class="eva-radio-label"><input type="radio" value="UPDOWN" v-model="editingFunc.transferType" :disabled="viewOnly || editingFunc.dataType === 'error'"> {{$t('product_definition.func.transfer.updown')}}</label>
                <label class="eva-radio-label"><input type="radio" value="UP" v-model="editingFunc.transferType" :disabled="viewOnly"> {{$t('product_definition.func.transfer.up')}}</label>
                <label class="eva-radio-label"><input type="radio" value="DOWN" v-model="editingFunc.transferType" :disabled="viewOnly || editingFunc.dataType === 'error'"> {{$t('product_definition.func.transfer.down')}}</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-3 control-label">{{$t('misc.description')}}: </label>
              <div class="col-xs-9">
                <textarea class="form-control" v-model="editingFunc.description" :placeholder="$t('product_definition.func_editor.desc')" :disabled="viewOnly"></textarea>
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <p class="text-danger" v-if="message === 'fail'"><small>{{$t('misc.save_fail')}}</small></p>
          <p class="text-danger" v-else-if="message !== ''"><small>{{$t('misc.unknow_error')}}</small></p>

          <button type="submit" class="btn btn-primary" @click.prevent="submit" v-if="!viewOnly">{{$t('misc.confirm')}}</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">{{ viewOnly ? $t('misc.close') : $t('misc.cancel') }}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import $ from 'jquery'

  export default {
    name: 'ProductFuncEditor',

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
      product: Object,
      viewOnly: Boolean
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
        let opr
        switch (this.mode) {
          case 'standard':
            opr = this.viewOnly ? '查看' : '编辑'
            return opr + '标准功能'
          case 'createCustom':
            opr = this.viewOnly ? '查看' : '添加'
            return opr + '自定义功能'
          case 'custom':
            opr = this.viewOnly ? '查看' : '编辑'
            return opr + '自定义功能'
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
          const updatedProduct = await api.productTypes.updateType(this.product.id,
            api.buildRequest(this.product.version)
              .addAction({action: actionName, ...this.editingFunc, ...dataType})
              .request)
          this.$emit('added', updatedProduct)

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
