<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

        <div class="eva-wizard eva-wizard--create-product form_wizard wizard_horizontal">
          <ul class="wizard_steps anchor">
            <li>
              <span class="wizard_step selected">
                <span class="step_no">1</span>
                <span class="step_descr">
                  {{$t('product_definition.product_definition')}}<br>
                </span>
              </span>
            </li>
            <li>
              <span class="wizard_step disabled">
                <span class="step_no">2</span>
                <span class="step_descr">
                  {{$t('product_definition.develop')}}<br>
                </span>
              </span>
            </li>
            <li>
              <span class="wizard_step disabled">
                <span class="step_no">3</span>
                <span class="step_descr">
                  {{$t('product_definition.production')}}<br>
                </span>
              </span>
            </li>
          </ul>

          <div class="stepContainer">
            <button class="btn btn-lg btn-primary" @click="createProd()">{{$t('product_definition.create_product')}}</button>
            <p class="eva-line-through"><span>{{$t('product_definition.quick_create')}}</span></p>

            <ul class="eva-quick-prod">
              <li v-for="productType in recommandProductTypes">
                <a href="javascript:;" @click="createProd(productType)">{{productType.name}}</a>
              </li>
            </ul>

            <portal to="modals" v-if="isShowCreateModal">
              <ProductCreate ref="createProductModal"></ProductCreate>
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

            <table class="table">
              <thead>
                <tr>
                  <th>{{$t('misc.icon')}}</th>
                  <th>{{$t('misc.name')}}</th>
                  <th>{{$t('misc.type')}}</th>
                  <th>{{$t('misc.description')}}</th>
                  <th>{{$t('product_definition.network_type')}}</th>
                  <th>{{$t('misc.state')}}</th>
                  <th>{{$t('misc.operation')}}</th>
                </tr>
              </thead>
              <tbody>
                <ProductDefinitionRow v-for="product in products" :product="product" :key="product.id"></ProductDefinitionRow>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import $ from 'jquery'
  import ProductDefinitionRow from 'src/components/ProductDefinitionRow'
  import ProductCreate from 'src/components/ProductCreate'

  export default {
    name: 'ProductDefinitions',

    data () {
      return {
        isShowCreateModal: false,
        message: ''
      }
    },

    async created () {
      try {
        await Promise.all([this.fetchProductTypes(), this.fetchProducts()])
      } catch (e) {
        this.message = 'fail'
      }

      // prefetch libraries for DataDefinitionEditor, doesn't boarder if they fail to load now
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
    },

    computed: {
      ...mapState(['productTypes', 'products']),
      ...mapGetters(['categorizedProductTypes']),

      recommandProductTypes () {
        if (!this.categorizedProductTypes || !this.categorizedProductTypes['大家电']) return []
        return this.categorizedProductTypes['大家电']
      }
    },

    methods: {
      ...mapActions(['fetchProductTypes', 'fetchProducts']),

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
      ProductDefinitionRow,
      ProductCreate
    }
  }
</script>

<style lang="scss">
  .eva-quick-prod {
    text-align: center;
    list-style: none;
    padding: 0;

    > li {
      display: inline-block;
      margin: 10px;
    }
  }
</style>
