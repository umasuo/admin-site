<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>
    </div>

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.std_func')}}
            <button class="btn btn-xs btn-primary" @click="showCreateCustomFuncModal">{{$t('misc.add')}}</button>
          </h2>

          <portal to="modals" v-if="isCreatingCustomFunc">
            <ProductFuncEditor mode="add" :product="productType" ref="createCustomFuncModal" @added="addedType"></ProductFuncEditor>
          </portal>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductCustomFunc v-if="productType" :product="productType"></ProductCustomFunc>
        </div>
      </div>
    </div>

    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>{{$t('product_definition.std_data')}}
            <button class="btn btn-xs btn-primary" @click="showAddDataModal" :product="productType">{{$t('misc.add')}}</button>
          </h2>

          <portal to="modals" v-if="isShowingDataDefinition">
            <DataDefinitionEditor ref="dataDefinitionModal" :product="productType"></DataDefinitionEditor>
          </portal>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <ProductData v-if="productType" mode="customData" :product="productType"></ProductData>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import api from 'src/api'

  // import ProductTypeBasicInfo from 'src/components/ProductTypeBasicInfo'
  import ProductCustomFunc from 'src/components/ProductCustomFunc'
  import ProductData from 'src/components/ProductData'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'

  export default {
    name: 'ProductTypeDetail',

    props: {
      id: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        productType: null,

        isCreatingCustomFunc: false,
        isShowingDataDefinition: false,

        message: ''
      }
    },

    async created () {
      try {
        this.productType = await api.productTypes.getTypeById(this.id)
      } catch (e) {
        this.message = 'fail'
      }

      // prefetch libraries for DataDefinitionEditor, doesn't boarder if they fail to load now
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
    },

    methods: {
      showCreateCustomFuncModal () {
        const vm = this
        this.isCreatingCustomFunc = true
        setTimeout(() => {
          $(this.$refs.createCustomFuncModal.$el).modal('show').on('hidden.bs.modal', () => {
            vm.isCreatingCustomFunc = false
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
      },

      addedType (type) {
        this.productType = type
      }
    },

    components: {
      ProductCustomFunc,
      ProductData,
      ProductFuncEditor,
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
  .eva-dev-device {
    text-align: center;
  }
</style>
