<template>
  <div class="eva-single-page-wrapper text-center">
    <template v-if="result === 'success'">
      <h1 class="eva-line-through-title">{{$t('auth.verify_success')}}</h1>

      <p>{{$t('auth.go_login_1')}} <router-link :to="{name:'Signin'}">{{$t('auth.go_login_2')}}</router-link></p>
    </template>

    <template v-if="result === 'failed'">
      <h1 class="eva-line-through-title">{{$t('auth.verify_failed')}}</h1>

      <p>{{$t('auth.verify_failed_msg')}} <router-link :to="{name:'Signin'}">{{$t('auth.go_login_2')}}</router-link></p>
    </template>
  </div>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'EmailVerifyResult',

    computed: {
      result () {
        // result query param should be one of: success, failed
        const verifyResult = this.$route.query.result

        if (verifyResult === 'success') {
          api.developer.signout()
          return 'success'
        } else {
          return 'failed'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
