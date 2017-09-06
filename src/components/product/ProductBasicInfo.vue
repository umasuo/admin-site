<template>
  <div v-if="product">
    <div class="eva-product-basic-info-media">
      <img class="eva-product-basic-info-media__media" :src="product.icon">

      <div class="eva-product-basic-info-media__content">
        <h3>{{ product.name }}</h3>

        <p>
          <span class="label label-default">PID: {{ product.id }}</span>
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
  </div>
</template>

<script>
  export default {
    name: 'ProductBasicInfo',

    props: {
      product: Object
    },

    data () {
      return {
        message: ''
      }
    }
  }
</script>

<style lang="scss">
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
