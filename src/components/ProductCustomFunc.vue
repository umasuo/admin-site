<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{$t('product_definition.func.name')}}</th>
        <th>{{$t('product_definition.func.trans_type')}}</th>
        <th>{{$t('product_definition.func.type')}}</th>
        <th>{{$t('product_definition.func.prop')}}</th>
        <th>{{$t('misc.operation')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(func, index) in customFuncs">
        <th scope="row">{{ func.functionId }}</th>
        <td>{{ func.name }}</td>
        <td>{{ stringifyTransferType(func.transferType) }}</td>
        <td>{{ stringifyDataType(func.dataType) }}</td>
        <!-- TODO: need to make a computed property for this field -->
        <td>{{ stringifyDataTypeValue(func.dataType) }}</td>
        <td>
          <a href="javascript:;" @click="showEditor(index)" v-if="!viewOnly">{{$t('misc.edit')}}</a>
          <a href="javascript:;" @click="removeFunction(func.id)" v-if="!viewOnly">{{$t('misc.delete')}}</a>
          <a href="javascript:;" @click="showEditor(index)" v-else>{{$t('misc.view')}}</a>

          <portal to="modals" v-if="isShowingEditor">
            <ProductFuncEditor mode="update" id="product-custom-func-editor" :product="product" :func="func" :viewOnly="viewOnly"></ProductFuncEditor>
          </portal>

        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import mixin from 'src/components/ProductFuncMixins'
  import api from 'src/api'
  import { mapActions } from 'vuex'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'

  export default {
    name: 'ProductCustomFunc',

    mixins: [mixin],

    props: {
      product: {
        type: Object,
        required: true
      },
      viewOnly: Boolean
    },

    data () {
      return {
        isShowingEditor: false
      }
    },

    computed: {
      customFuncs () {
        return this.product.functions.filter(func => {
          return func.category === 'PRODUCT'
        })
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      showEditor (index) {
        const vm = this
        this.isShowingEditor = true
        setTimeout(() => {
          $('#product-custom-func-editor').modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
          })
        }, 0)
      },

      async removeFunction (functionId) {
        try {
          await this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction({ action: 'removeFunction', functionIds: [functionId] })
                        .request
          })
        } catch (e) {
          alert(this.$t('misc.delete_fail'))
        }
      }
    },

    components: {
      ProductFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
