<template>
  <div v-if="productType">
    <template v-if="state === 'viewer'">
      <div class="eva-product-basic-info-media">
        <!-- <img class="eva-product-basic-info-media__media" :src="productType.icon"> -->

        <div class="eva-product-basic-info-media__content">
          <h3>{{ productType.name }} <button class="btn btn-xs btn-default" @click="state = 'editor'">{{$t('product_definition.basic_info.edit_info')}}</button></h3>

          <p>
            <span class="label label-default" v-if="productType">所属产品组: {{ productType.groupName }}</span>
          </p>
        </div>
      </div>
    </template>

    <template v-if="state === 'editor'">
      <form class="form-horizontal eva-product-basic-info-editor">
        <!-- <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.icon')}}: </label>
          <div class="col-xs-9">
            <ProductIconUploader v-model="productBasicInfo.icon"></ProductIconUploader>
          </div>
        </div> -->

        <div class="form-group">
          <label class="control-label col-xs-3">产品名称: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.name">
          </div>
        </div>

        <div class="form-group">
          <label class="control-label col-xs-3">所属产品组: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.groupName">
          </div>
        </div>

        <!-- <div class="form-group">
          <label class="control-label col-xs-3">{{$t('misc.description')}}: </label>
          <div class="col-xs-9">
            <input class="form-control" type="text" v-model="productBasicInfo.description" :placeholder="$t('product_definition.basic_info.desc_description')">
          </div>
        </div> -->

        <p class="text-danger" v-if="message === 'fail'"><small>{{$t('misc.save_fail')}}</small></p>

        <button type="submit" class="btn btn-primary" @click.prevent="updateAndBackToViewer">{{$t('misc.save')}}</button>
        <button type="button" class="btn btn-default" @click.prevent="cancel">{{$t('misc.cancel')}}</button>
      </form>
    </template>
  </div>
</template>

<script>
  import api from 'src/api'
  // import ProductIconUploader from 'src/components/ProductIconUploader'

  export default {
    name: 'ProductBasicInfo',

    props: {
      productType: Object
    },

    data () {
      return {
        state: 'viewer',
        editingProductBasicInfo: null,

        message: ''
      }
    },

    computed: {
      productBasicInfo: {
        get () {
          return this.editingProductBasicInfo || Object.assign({}, this.productType)
        },
        set (productType) {
          this.editingProductBasicInfo = Object.assign({}, productType)
        }
      }
    },

    methods: {
      async updateAndBackToViewer () {
        try {
          const updatedProductType = await api.productTypes.updateType(this.productType.id,
            api.buildRequest(this.productType.version)
              .addAction({action: 'updateProductType', name: this.productBasicInfo.name, groupName: this.productBasicInfo.groupName})
              .request)
          this.$emit('updated', updatedProductType)
          this.state = 'viewer'
        } catch (e) {
          console.dir(e)
          this.message = 'fail'
        }
      },

      cancel () {
        this.productBasicInfo = Object.assign({}, this.productType)
        this.state = 'viewer'
      }
    },

    components: {
      // ProductIconUploader
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
