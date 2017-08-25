<template>
  <div class="x_panel" v-if="step === 3">
    <div class="x_content text-center">
      <!-- 开发中 -->
      <template v-if="product.status === 'DEVELOPING'">
        <button class="btn btn-lg btn-primary" @click="publish()">{{$t('public_prodcut.developing')}}</button>
        <p>{{$t('public_prodcut.developing_hint')}}</p>
        <p class="text-danger" v-if="message === 'publish fail'"><small>{{$t('misc.save_fail')}}</small></p>
      </template>

      <!-- 审核中 -->
      <template v-else-if="product.status === 'CHECKING'">
        <button class="btn btn-lg btn-primary" @click="cancel()">{{$t('public_prodcut.checking')}}</button>
        <p>{{$t('public_prodcut.checking_hint')}}</p>
        <p class="text-danger" v-if="message === 'cancel fail'"><small>{{$t('misc.save_fail')}}</small></p>
      </template>

      <!-- 已发布 -->
      <template v-else-if="product.status === 'PUBLISHED'">
        <button class="btn btn-lg btn-primary" @click="revoke()">{{$t('public_prodcut.published')}}</button>
        <p>{{$t('public_prodcut.published_hint')}}</p>
        <p class="text-danger" v-if="message === 'revoke fail'"><small>{{$t('misc.save_fail')}}</small></p>
      </template>

      <!-- 已下架 -->
      <template v-else-if="product.status === 'REVOKED'">
        <button class="btn btn-lg btn-primary" disabled>{{$t('public_prodcut.revoked')}}</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductStatusControls',

  props: ['product', 'step'],

  data () {
    return {
      message: ''
    }
  },

  methods: {
    ...mapActions(['publishProduct', 'revokeProduct', 'cancelProduct']),

    async publish () {
      this.message = ''
      try {
        await this.publishProduct(this.product)
      } catch (e) {
        this.message = 'publish fail'
      }
    },

    async cancel () {
      this.message = ''
      try {
        await this.cancelProduct(this.product)
      } catch (e) {
        this.message = 'cancel fail'
      }
    },

    async revoke () {
      this.message = ''
      try {
        await this.revokeProduct(this.product)
      } catch (e) {
        this.message = 'revoke fail'
      }
    }
  }
}
</script>

<style>
</style>
