<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>{{$t('product_definition.data.id')}}</th>
        <th>{{$t('product_definition.data.name')}}</th>
        <th>{{$t('misc.description')}}</th>
        <th>{{$t('misc.operation')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in productDatas" :key="data.id">
        <th scope="row">{{ data.dataId }}</th>
        <td>{{ data.name }}</td>
        <td>{{ data.description }}</td>
        <td>
          <a href="javascript:;" @click="showEditor(index)">{{$t('misc.view')}}</a>

          <portal to="modals" v-if="showingEditor === index">
            <DataDefinitionViewer id="product-data-editor" :product="product" :productData="data"></DataDefinitionViewer>
          </portal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import DataDefinitionViewer from 'src/components/product/DataDefinitionViewer'

  export default {
    name: 'ProductData',

    props: {
      mode: {
        required: true,
        type: String,
        default: 'PLATFORM' // PLATFORM OR PRODUCT
      },

      product: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        showingEditor: null
      }
    },

    computed: {
      productDatas () {
        const datas = this.product.dataDefinitions || []

        return datas.filter(data => {
          return data.category === this.mode
        })
      }
    },

    methods: {
      showEditor (index) {
        const vm = this
        this.showingEditor = index
        setTimeout(() => {
          $('#product-data-editor').modal('show').on('hidden.bs.modal', () => {
            vm.showingEditor = false
          })
        }, 0)
      }
    },

    components: {
      DataDefinitionViewer
    }
  }
</script>

<style lang="scss">
</style>
