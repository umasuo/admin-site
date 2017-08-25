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
      <tr v-for="data in productDatas">
        <th scope="row">{{ data.dataId }}</th>
        <td>{{ data.name }}</td>
        <td>{{ data.description }}</td>
        <td>
          <a href="javascript:;" @click="showEditor" v-if="!viewOnly">{{$t('misc.edit')}}</a>
          <!-- TODO: remove confirm dialog -->
          <a href="javascript:;" @click="removeData(data.id)" v-if="!viewOnly">{{$t('misc.delete')}}</a>
          <a href="javascript:;" @click="showEditor" v-else>{{$t('misc.view')}}</a>

          <portal to="modals" v-if="isShowingEditor">
            <DataDefinitionEditor id="product-data-editor" :product="product" :productData="data" :viewOnly="viewOnly"></DataDefinitionEditor>
          </portal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  import api from 'src/api'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'

  export default {
    name: 'ProductData',

    props: {
      mode: {
        required: true,
        type: String,
        default: 'stdData' // stdData or customData
      },

      product: {
        required: true,
        type: Object
      },

      viewOnly: Boolean
    },

    data () {
      return {
        isShowingEditor: false
      }
    },

    computed: {
      productDatas () {
        const category = this.mode === 'stdData' ? 'PLATFORM' : 'PRODUCT'
        const datas = this.product.dataDefinitions || []

        return datas.filter(data => {
          return data.category === category
        })
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      async removeData (id) {
        try {
          await this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction({action: 'removeDataDefinition', dataDefinitionId: id})
                        .request
          })
        } catch (e) {
          alert(this.$t('misc.delete_fail'))
        }
      },

      showEditor () {
        const vm = this
        this.isShowingEditor = true
        setTimeout(() => {
          $('#product-data-editor').modal('show').on('hidden.bs.modal', () => {
            vm.isShowingEditor = false
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
