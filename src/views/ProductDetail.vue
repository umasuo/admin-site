<template>
  <div class="row">
    <div class="col-xs-12">

      <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

      <div class="eva-wizard form_wizard wizard_horizontal">
        <ul class="wizard_steps anchor">
          <li>
              <span class="wizard_step" :class="step === 1 ? 'selected' : 'done'">
                <span class="step_no">1</span>
                <span class="step_descr">
                  {{$t('product_definition.product_definition')}}<br>
                </span>
              </span>
          </li>
          <li>
              <span class="wizard_step" :class="{ selected: step === 2, done: step > 2, disabled: step < 2}">
                <span class="step_no">2</span>
                <span class="step_descr">
                  {{$t('product_definition.develop')}}<br>
                </span>
              </span>
          </li>
          <li>
              <span class="wizard_step" :class="step === 3 ? 'selected' : 'disabled'">
                <span class="step_no">3</span>
                <span class="step_descr">
                  {{$t('product_definition.production')}}<br>
                </span>
              </span>
          </li>
        </ul>

        <div class="stepContainer">
          <WizardSteps v-model="step" :max="3"></WizardSteps>
        </div>
      </div>
    </div>

    <div :class="step === 1 ? 'col-xs-12' : 'col-xs-4'">
      <div class="x_panel">
        <div class="x_content">
          <ProductBasicInfo :product="product" :viewOnly="modifyDisabled || step > 1"></ProductBasicInfo>
        </div>
      </div>

      <div class="x_panel" v-if="step === 2">
        <div class="x_title">
          <h2>{{$t('product_definition.credential')}}</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content form-horizontal">
          <div class="form-group">
            <label class="col-xs-3 control-label">{{$t('product_definition.union_id')}}: </label>
            <div class="col-xs-9">
              <p class="control-text">{{ product.testUnion.unionId }}</p>
            </div>
          </div>

          <div class="form-group">
            <label class="col-xs-3 control-label">{{$t('product_definition.secrect_key')}}: </label>
            <div class="col-xs-9">
              <p class="control-text">{{ product.testUnion.secretKey }}</p>
            </div>
          </div>
        </div>
      </div>

      <ProductStatusControls :step="step" :product="product"></ProductStatusControls>

      <!-- TODO: 改成已发布才显示 -->
      <ProductGenerateUnionId v-if="step === 3" :productId="product.id"></ProductGenerateUnionId>
    </div>

    <template v-if="step === 1">
      <div class="col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.std_func')}}
              <button class="btn btn-xs btn-primary" v-if="!modifyDisabled" @click="showStdFuncManager">{{$t('misc.manage')}}</button>
            </h2>

            <portal to="modals" v-if="isShowingStdFuncManager && productType">
              <ProductStdFuncManager ref="stdFuncManager" :product="product" :productType="productType"></ProductStdFuncManager>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductStdFunc v-if="product" :product="product" :viewOnly="modifyDisabled"></ProductStdFunc>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.custom_func')}}
              <button class="btn btn-xs btn-primary" v-if="!modifyDisabled" @click="showCreateCustomFuncModal">{{$t('misc.add')}}</button>
            </h2>

            <portal to="modals" v-if="isCreatingCustomFunc">
              <ProductFuncEditor mode="createCustom" :product="product" :productType="productType" ref="createCustomFuncModal"></ProductFuncEditor>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductCustomFunc v-if="product" :product="product" :viewOnly="modifyDisabled"></ProductCustomFunc>
          </div>
        </div>
      </div>

      <!-- TODO: 标准数据 -->
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.std_data')}}
              <button class="btn btn-xs btn-primary" v-if="!modifyDisabled" @click="showStdDataModal">{{$t('misc.manage')}}</button>
            </h2>

            <portal to="modals" v-if="isShowingStdDataManager && productType">
              <ProductStdDataManager ref="stdDataManager" :product="product" :productType="productType"></ProductStdDataManager>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductData v-if="product" mode="stdData" :viewOnly="modifyDisabled" :product="product"></ProductData>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.custom_data')}}
              <button class="btn btn-xs btn-primary" v-if="!modifyDisabled" @click="showAddDataModal" :product="product">{{$t('misc.add')}}</button>
            </h2>

            <portal to="modals" v-if="isShowingDataDefinition">
              <DataDefinitionEditor ref="dataDefinitionModal" :product="product"></DataDefinitionEditor>
            </portal>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <ProductData v-if="product" mode="customData" :viewOnly="modifyDisabled" :product="product"></ProductData>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="step === 2">
      <div class="col-sm-8">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.debug_device')}}</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <div class="eva-media">
              <div class="eva-dev-device">
                <img src="http://fakeimg.pl/200x200/?text=Fake Photo">
                <h5>Wi-Fi 联网模块／型号：QWERSADF</h5>
                <button class="btn btn-lg btn-primary">{{$t('product_definition.buy_dev_device')}}</button> <!-- TODO:链接到淘宝 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="step === 3">
      <div class="col-sm-8">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('product_definition.buy_module')}}</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content form-horizontal">
            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> {{$t('product_definition.choose_module')}}: </label>
              <div class="col-xs-10">
                <label class="eva-radio-label"><input type="radio" value="1" name="devicetype"> DEMOTYPE1</label>
                <label class="eva-radio-label"><input type="radio" value="2" name="devicetype"> DEMOTYPE2</label>
                <label class="eva-radio-label"><input type="radio" value="3" name="devicetype"> DEMOTYPE2</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> {{$t('product_definition.buy_quantity')}}: </label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <p class="eva-line-through eva-line-through__whitebg"><span>{{$t('product_definition.shipping_info')}}</span></p>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> {{$t('product_definition.shipping_name')}}: </label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> {{$t('product_definition.shipping_phone')}}: </label>
              <div class="col-xs-10">
                <input class="form-control" type="text">
              </div>
            </div>

            <div class="form-group">
              <label class="col-xs-2 control-label"><span class="required">*</span> {{$t('product_definition.shipping_addr')}}: </label>
              <div class="col-xs-10">
                <textarea class="form-control"></textarea>
              </div>
            </div>

            <div class="text-center">
              <a href="javascript:;" class="btn btn-lg btn-primary">{{$t('product_definition.submit_buy_request')}}</a>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapActions } from 'vuex'
  import ProductStdFuncManager from 'src/components/ProductStdFuncManager'
  import ProductBasicInfo from 'src/components/ProductBasicInfo'
  import ProductStdFunc from 'src/components/ProductStdFunc'
  import ProductCustomFunc from 'src/components/ProductCustomFunc'
  import ProductData from 'src/components/ProductData'
  import ProductFuncEditor from 'src/components/ProductFuncEditor'
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'
  import WizardSteps from 'src/components/common/WizardSteps'
  import ProductStdDataManager from 'src/components/ProductStdDataManager'
  import ProductGenerateUnionId from 'src/components/ProductGenerateUnionId'
  import ProductStatusControls from 'src/components/ProductStatusControls'

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
        isShowingStdFuncManager: false,
        isCreatingCustomFunc: false,
        isShowingDataDefinition: false,
        isShowingStdDataManager: false,
        step: 1,
        modifyDisabled: false,

        message: ''
      }
    },

    computed: {
      product () {
        const product = this.$store.getters.getProductById(this.pid)
        if (product && product.status !== 'DEVELOPING') {
          this.step = 3
          this.modifyDisabled = true
        }
        return product
      },

      productType () {
        return this.$store.getters.getProductTypeById(this.product.productTypeId)
      }
    },

    async created () {
      try {
        await Promise.all([this.fetchProducts(), this.fetchProductTypes()])
      } catch (e) {
        this.message = 'fail'
      }

      // prefetch libraries for DataDefinitionEditor, doesn't boarder if they fail to load now
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/brace')
      import(/* webpackChunkName: "data-editor" */ 'src/components/common/jsonSchema')
    },

    methods: {
      ...mapActions(['fetchProducts', 'fetchProductTypes']),

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
      ProductStdFunc,
      ProductCustomFunc,
      ProductData,
      ProductStdFuncManager,
      ProductFuncEditor,
      DataDefinitionEditor,
      WizardSteps,
      ProductStdDataManager,
      ProductGenerateUnionId,
      ProductStatusControls
    }
  }
</script>

<style lang="scss">
  .eva-dev-device {
    text-align: center;
  }
</style>
