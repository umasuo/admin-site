<template>
  <div v-if="product">
    <template v-if="state === 'viewer'">
      <div class="eva-product-basic-info-media">
        <img class="eva-product-basic-info-media__media" :src="product.icon">

        <div class="eva-product-basic-info-media__content">
          <h3>{{ product.name }} <button class="btn btn-xs btn-default" @click="state = 'editor'" v-if="!viewOnly">{{$t('product_definition.basic_info.edit_info')}}</button></h3>

          <p>
            <span class="label label-default">PID: {{ product.id }}</span>
            <span class="label label-default" v-if="productType">{{$t('misc.type')}}: {{ productType.name }}</span>
            <span class="label label-default">{{$t('product_definition.network_type')}}: {{ product.type }}</span>
            <span class="label label-default">{{$t('misc.state')}}: {{ product.status }}</span>
          </p>
        </div>
      </div>

      <dl>
        <template>
          <dt>{{$t('product_definition.basic_info.product_model')}}:</dt>
          <dd v-if="product.model">{{ product.model }}</dd>
          <dd v-else>{{$t('misc.not_set')}}</dd>
        </template>

        <template>
          <dt>{{$t('product_definition.basic_info.firmware_version')}}:</dt>
          <dd v-if="product.firmwareVersion">{{ product.firmwareVersion }}</dd>
          <dd v-else>{{$t('misc.not_set')}}</dd>
        </template>

        <template>
          <dt>{{$t('product_definition.basic_info.module_model')}}:</dt>
          <dd v-if="product.wifiModule">{{ product.wifiModule }}</dd>
          <dd v-else>{{$t('misc.not_set')}}</dd>
        </template>

        <template>
          <dt>{{$t('misc.description')}}:</dt>
          <dd v-if="product.description">{{ product.description }}</dd>
          <dd v-else>{{$t('misc.empty')}}</dd>
        </template>
      </dl>
    </template>

    <template v-if="state === 'editor'">
      <form class="form-horizontal eva-product-basic-info-editor">
        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.icon')}}: </label>
          <div class="col-xs-9">
            <!-- TODO: 上传图片 -->
            <ProductIconUploader v-model="productBasicInfo.icon"></ProductIconUploader>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.name')}}: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.name">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.type')}}: </label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productType.name }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">PID: </label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productBasicInfo.id }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('product_definition.network_type')}}: </label>
          <div class="col-xs-9 eva-product-basic-info-editor__readonly">
            {{ productBasicInfo.type }}
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('product_definition.basic_info.product_model')}}: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.model" :placeholder="$t('product_definition.basic_info.product_model_desc')">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('product_definition.basic_info.firmware_version')}}: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.firmwareVersion" :placeholder="$t('product_definition.basic_info.product_firmware_version_desc')">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('product_definition.basic_info.module_model')}}: </label>
          <div class="col-xs-9">
            <select class="form-control"  v-model="productBasicInfo.wifiModule">
              <option value="null">{{$t('misc.not_set')}}</option>
              <option value="1">ABC-01</option>
              <option value="2">ABC-02</option>
              <option value="3">ABC-03</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.description')}}: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.description" :placeholder="$t('product_definition.basic_info.desc_description')">
          </div>
        </div>

        <p class="text-danger" v-if="message === 'fail'"><small>{{$t('misc.save_fail')}}</small></p>

        <button type="submit" class="btn btn-primary" @click.prevent="updateAndBackToViewer">{{$t('misc.save')}}</button>
        <button type="button" class="btn btn-default" @click.prevent="cancel">{{$t('misc.cancel')}}</button>
      </form>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import api from 'src/api'
  import ProductIconUploader from 'src/components/ProductIconUploader'

  export default {
    name: 'ProductBasicInfo',

    props: {
      product: Object,
      viewOnly: {
        default: false,
        type: Boolean
      }
    },

    data () {
      return {
        state: 'viewer',
        editingProductBasicInfo: null,

        message: ''
      }
    },

    computed: {
      productType () {
        return this.$store.getters.getProductTypeById(this.product.productTypeId)
      },

      productBasicInfo: {
        get () {
          return this.editingProductBasicInfo || Object.assign({}, this.product)
        },
        set (product) {
          this.editingProductBasicInfo = Object.assign({}, product)
        }
      }
    },

    methods: {
      ...mapActions(['updateProduct']),

      updateAndBackToViewer () {
        const updateAction =
          // elegant way to get a subset of a object
          // https://stackoverflow.com/a/39333479/2202891
          (({name, description, icon, openable, type, firmwareVersion, model, wifiModule}) =>
          ({action: 'updateProduct', name, description, icon, openable, type, firmwareVersion, model, wifiModule}))(this.productBasicInfo)

        try {
          this.updateProduct({
            product: this.product,
            request: api.buildRequest(this.product.version)
                        .addAction(updateAction)
                        .request
          })
          this.state = 'viewer'
        } catch (e) {
          console.dir(e)
          this.message = 'fail'
        }
      },

      cancel () {
        this.productBasicInfo = Object.assign({}, this.product)
        this.state = 'viewer'
      }
    },

    watch: {
      viewOnly (isViewOnly) {
        if (isViewOnly) {
          this.cancel()
        }
      }
    },

    components: {
      ProductIconUploader
    }
  }
</script>

<style lang="scss">
  .eva-product-basic-info-editor {
    width: 400px;

    &__readonly {
      padding-top: 8px;
    }
  }

  .eva-product-basic-info-media {
    &__media {
      float: left;
      margin-right: 15px;
      margin-top: 10px;
      width: 64px;
      height: 64px;
    }

    &__content {
      overflow: auto;
    }
  }
</style>
