<template>
  <div class="row">

    <div class="col-xs-12">
      <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

      <div class="x_panel">
        <div class="x_content">
          <ProductBasicInfo v-if="product" :product="product"></ProductBasicInfo>
        </div>
      </div>
    </div>

    <div class="col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.std_func')}}</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductFuncs v-if="product" :product="product" mode="PLATFORM"></ProductFuncs>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.custom_func')}}</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductFuncs v-if="product" :product="product" mode="PRODUCT"></ProductFuncs>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.std_data')}}</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductData v-if="product" mode="PLATFORM" :product="product"></ProductData>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.custom_data')}}</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductData v-if="product" mode="PRODUCT" :product="product"></ProductData>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'
  import ProductBasicInfo from 'src/components/product/ProductBasicInfo'
  import ProductFuncs from 'src/components/product/ProductFuncs'
  // import ProductCustomFunc from 'src/components/ProductCustomFunc'
  import ProductData from 'src/components/product/ProductData'
  // import ProductFuncEditor from 'src/components/ProductFuncEditor'
  // import DataDefinitionEditor from 'src/components/DataDefinitionEditor'

  export default {
    name: 'ProductDetail',

    props: {
      pid: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        product: null,

        isCreatingCustomFunc: false,
        isShowingDataDefinition: false,

        message: ''
      }
    },

    async created () {
      try {
        this.product = await api.products.getProduct(this.pid, this.$route.query.developerid)
      } catch (e) {
        this.message = 'fail'
      }

      // prefetch libraries for DataDefinitionEditor, doesn't boarder if they fail to load now
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
    },

    methods: {
      showStdFuncManager () {
        const vm = this
        this.isShowingStdFuncManager = true
        setTimeout(() => {
          $(this.$refs.stdFuncManager.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingStdFuncManager = false
          })
        }, 0)
      },

      showCreateCustomFuncModal () {
        const vm = this
        this.isCreatingCustomFunc = true
        setTimeout(() => {
          $(this.$refs.createCustomFuncModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isCreatingCustomFunc = false
          })
        })
      },

      showStdDataModal () {
        const vm = this
        this.isShowingStdDataManager = true
        setTimeout(() => {
          $(this.$refs.stdDataManager.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingStdDataManager = false
          })
        })
      },

      showAddDataModal () {
        const vm = this
        this.isShowingDataDefinition = true
        setTimeout(() => {
          $(this.$refs.dataDefinitionModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isShowingDataDefinition = false
          })
        })
      }
    },

    components: {
      ProductBasicInfo,
      ProductFuncs,
      ProductData
      // ProductFuncEditor,
      // DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
  .eva-dev-device {
    text-align: center;
  }
</style>
