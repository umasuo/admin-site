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
          <a href="javascript:;" @click="showEditor(index)">{{$t('misc.edit')}}</a>
          <!-- TODO: remove confirm dialog -->
          <a href="javascript:;" @click="removeData(data.id)">{{$t('misc.delete')}}</a>

          <portal to="modals" v-if="showingEditor === index">
            <DataDefinitionEditor id="product-data-editor" :productType="productType" :productData="data" @updated="updated"></DataDefinitionEditor>
          </portal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'

  export default {
    name: 'ProductTypeData',

    props: {
      productType: {
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
        return this.productType.data || []
      }
    },

    methods: {
      updated (type) {
        this.$emit('updated', type)
      },

      async removeData (id) {
        try {
          const updatedProductType = await api.productTypes.updateType(this.productType.id,
            api.buildRequest(this.productType.version)
              .addAction({action: 'removeProductTypeData', dataDefinitionId: id})
              .request)
          this.$emit('updated', updatedProductType)
        } catch (e) {
          alert(this.$t('misc.delete_fail'))
        }
      },

      showEditor (index) {
        const vm = this
        this.showingEditor = index
        setTimeout(() => {
          $('#product-data-editor').modal('show').on('hidden.bs.modal', () => {
            vm.showingEditor = null
          })
        }, 0)
      }
    },

    components: {
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
