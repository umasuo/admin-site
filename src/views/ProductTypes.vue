<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

        <div class="eva-wizard eva-wizard--create-product form_wizard wizard_horizontal">

          <div class="stepContainer">
            <button class="btn btn-lg btn-primary" @click="createProd()">{{$t('product_definition.create_product')}}</button>

            <portal to="modals" v-if="isShowCreateModal">
              <ProductTypeCreateModal ref="createProductModal"></ProductTypeCreateModal>
            </portal>
          </div>
        </div><!-- End of eva-create-product-wizard -->

      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.product_list')}}</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table" v-if="productTypes">
              <thead>
                <tr>
                  <th>{{$t('product_definition.name')}}</th>
                  <th>{{$t('product_definition.group_name')}}</th>
                  <th>{{$t('misc.operation')}}</th>
                </tr>
              </thead>
              <tbody>
                <ProductTypeRow v-for="productType in productTypes" :productType="productType" :key="productType.id"></ProductTypeRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import ProductTypeRow from 'src/components/ProductTypeRow'
  import ProductTypeCreateModal from 'src/components/ProductTypeCreateModal'

  export default {
    name: 'ProductTypes',

    data () {
      return {
        isShowCreateModal: false,
        message: '',
        productTypes: null
      }
    },

    async created () {
      try {
        this.productTypes = await api.productTypes.getTypes()
      } catch (e) {
        this.message = 'fail'
      }
    },

    methods: {
      createProd (type) {
        this.isShowCreateModal = true
        const vm = this
        setTimeout(() => {
          if (type) {
            vm.$refs.createProductModal.curStep = 2
            vm.$refs.createProductModal.selectedType = type
          }
          $(vm.$refs.createProductModal.$el).modal('show').on('hidden.bs.modal', e => {
            vm.$refs.createProductModal.curStep = 1
            vm.$refs.createProductModal.selectedType = ''
            vm.isShowCreateModal = false
          })
        }, 0)
      }
    },

    components: {
      ProductTypeRow,
      ProductTypeCreateModal
    }
  }
</script>
