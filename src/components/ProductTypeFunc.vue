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
      <tr v-for="(func, index) in productType.functions">
        <th scope="row">{{ func.functionId }}</th>
        <td>{{ func.name }}</td>
        <td>{{ stringifyTransferType(func.transferType) }}</td>
        <td>{{ stringifyDataType(func.dataType) }}</td>
        <!-- TODO: need to make a computed property for this field -->
        <td>{{ stringifyDataTypeValue(func.dataType) }}</td>
        <td>
          <a href="javascript:;" @click="showEditor(index)">{{$t('misc.edit')}}</a>
          <a href="javascript:;" @click="removeFunction(func.id)">{{$t('misc.delete')}}</a>

          <portal to="modals" v-if="showingEditor === index">
            <ProductTypeFuncEditor mode="update" id="product-custom-func-editor" :productType="productType" :func="func" @updated="updated"></ProductTypeFuncEditor>
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
  import ProductTypeFuncEditor from 'src/components/ProductTypeFuncEditor'

  export default {
    name: 'ProductTypeFunc',

    mixins: [mixin],

    props: {
      productType: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        showingEditor: false
      }
    },

    methods: {
      updated (type) {
        this.$emit('updated', type)
      },

      showEditor (index) {
        const vm = this
        this.showingEditor = index
        setTimeout(() => {
          $('#product-custom-func-editor').modal('show').on('hidden.bs.modal', () => {
            vm.showingEditor = null
          })
        }, 0)
      },

      async removeFunction (functionId) {
        try {
          const updatedProductType = await api.productTypes.updateType(this.productType.id,
            api.buildRequest(this.productType.version)
              .addAction({action: 'removeProductTypeFunction', functionIds: [functionId]})
              .request)
          this.$emit('updated', updatedProductType)
        } catch (e) {
          alert(this.$t('misc.delete_fail'))
        }
      }
    },

    components: {
      ProductTypeFuncEditor
    }
  }
</script>

<style lang="scss">
</style>
