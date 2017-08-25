<template>
  <div class="modal fade data-editor" tabindex="-1" role="dialog" aria-hidden="true" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">{{$t('product_definition.func.std_func_manager')}}</h4>
        </div>

        <div class="modal-body">
          <div class="form-inline">
            <div class="checkbox eva-std-func-checkbox" v-for="stdFunc in availableFuncs">
              <label>
                <input type="checkbox" v-model="selectedFuncs" :value="stdFunc.id"> {{ stdFunc.name }}
              </label>
            </div>
            <div v-if="availableFuncs.length === 0">
              <p class="text-warning text-center">{{$t('product_definition.func.no_std_func')}}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <p class="text-danger" v-if="message === 'fail'"><small>{{$t('product_definition.func.add_std_func_error')}}</small></p>
          <p class="text-danger" v-else-if="message !== ''"><small>{{$t('misc.unknow_error')}}</small></p>

          <button type="submit" class="btn btn-primary" @click.prevent="selectStdFuncs">{{$t('misc.confirm')}}</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('misc.cancel')}}</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import { mapActions } from 'vuex'

  export default {
    name: 'ProductStdFuncManager',

    props: ['product', 'productType'],

    data () {
      return {
        selectedFuncs: [],
        message: ''
      }
    },

    computed: {
      availableFuncs () {
        const usedFunctionIds = this.product.functions.map(func => {
          return func.functionId
        })

        if (!this.productType.functions) return []

        return this.productType.functions.filter(typeFunc => {
          return !usedFunctionIds.includes(typeFunc.functionId)
        })
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      async selectStdFuncs () {
        this.message = ''
        if (this.selectedFuncs.length === 0) {
          $(this.$refs.modal).modal('hide')
          return
        }

        try {
          await this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction({action: 'copyFunction', functionIds: this.selectedFuncs})
                        .request
          })
          $(this.$refs.modal).modal('hide')
        } catch (e) {
          this.message = 'fail'
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-std-func-checkbox {
    border: 1px solid #ddd;
    margin: 0 10px 15px 0 !important;

    > label {
      padding: 5px !important;
    }
  }
</style>
