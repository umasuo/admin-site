<template>
  <div class="eva-single-page-wrapper text-center">
    <form v-if="step === 1">
      <h1 class="eva-line-through-title">{{$t('auth.retrive_pwd')}}</h1>

      <div class="form-group">
        <input type="email"
               class="form-control"
               :placeholder="$t('auth.input_retrive_email')"
               v-model="request.email">
      </div>

      <p class="text-warning" v-if="request.state === 'success'">{{$t('auth.go_retrive_email')}}</p>
      <p class="text-warning" v-else-if="request.state === 'Request failed with status code 404'">{{$t('auth.not_registed')}}</p>
      <p class="text-warning" v-else-if="request.state !== ''">{{$t('misc.unknow_error')}}</p>

      <button class="btn btn-primary" @click.prevent="requestReset">{{$t('auth.send_reset_link')}}</button>
    </form>

    <form v-else>
      <h1 class="eva-line-through-title">{{$t('auth.retrive_pwd')}}</h1>

      <div class="form-group">
        <input type="password" class="form-control" :placeholder="$t('auth.pwd')" v-model="reset.password">
      </div>

      <div class="form-group">
        <input type="password" class="form-control" :placeholder="$t('auth.repeat_pwd')" v-model="reset.repeatPassword">
      </div>

      <p class="text-warning" v-if="reset.state === 'repeat password not match'">{{$t('auth.rpwd_not_match')}}</p>
      <p class="text-warning" v-else-if="reset.state === 'success'">{{$t('auth.reset_success')}}<router-link :to="{name: 'Signin'}">{{$t('auth.relogin')}}</router-link></p>
      <p class="text-warning" v-else-if="reset.state === 'password not valid'">{{$t('auth.pwd_format_wrong')}}</p>
      <p class="text-warning" v-else-if="reset.state !== ''">{{$t('misc.unknow_error')}}</p>

      <button class="btn btn-primary" @click.prevent="doReset">{{$t('auth.reset_pwd')}}</button>
    </form>
  </div>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'ResetPwd',

    data () {
      return {
        request: {
          email: '',
          state: ''
        },
        reset: {
          password: '',
          repeatPassword: '',
          state: ''
        }
      }
    },

    computed: {
      step () {
        // step 1: request reset pwd
        // step 2(or above): set new pwd
        return parseInt(this.$route.query.step) || 1
      }
    },

    methods: {
      async requestReset () {
        try {
          await api.developer.requestResetEmail(this.request.email)
          this.request.state = 'success'
          // TODO: demo link: http://localhost/v1/developers/reset-password?step=2    body: {token:'KPoW3a76swvB',newPassword:'a2222222',developerId:'asdf'}
          // http://localhost:8080/reset-pwd?step=2&token=KPoW3a76swvB&developerId=41b1ab1a-2caa-4305-874b-f6a06c69fdf5
        } catch (e) {
          console.dir(e)
          this.request.state = e.message
        }
      },

      async doReset () {
        this.reset.state = ''

        if (this.reset.password !== this.reset.repeatPassword) {
          this.reset.state = 'repeat password not match'
          return
        }

        try {
          await api.developer.resetPassword(this.$route.query.developerId, this.$route.query.token, this.reset.password)
          api.developer
          this.reset.state = 'success'
        } catch (e) {
          console.dir(e)
          this.reset.state = e.message
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
