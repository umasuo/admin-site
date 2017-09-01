<template>
  <div class="eva-single-page-wrapper">

    <transition name="fade">
      <div class="form login_form">
        <section class="login_content">
          <form>
            <h1 class="eva-line-through-title">{{$t('auth.login')}}</h1>
            <div>
              <input type="text" class="form-control" :placeholder="$t('auth.email')" v-model="signinData.username" required="" />
            </div>
            <div>
              <input type="password" class="form-control" :placeholder="$t('auth.pwd')" v-model="signinData.password" required="" />
            </div>

            <p class="text-warning" v-if="signinState === 'fetching'">{{$t('misc.pls_wait')}}</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 404'">{{$t('auth.account_not_exist')}}</p>
            <p class="text-warning" v-else-if="signinState === 'Request failed with status code 401'">{{$t('auth.credential_wrong')}}</p>
            <p class="text-warning" v-else-if="signinState !== ''">{{$t('misc.unknow_error')}}</p>

            <div>
              <button class="btn btn-default submit" type="submit" @click.prevent="signin" :disabled="signinState === 'fetching'">{{$t('auth.login')}}</button>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
              <div>
                <h1>Eva Cloud</h1>
              </div>
            </div>
          </form>
        </section>
      </div>
    </transition>

  </div>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'Signin',

    data () {
      return {
        signinState: '',

        signinData: {
          username: '',
          password: ''
        }
      }
    },

    created () {
      if (api.client.isAuthorized) {
        this.$router.replace({name: 'Dashboard'})
      }
    },

    methods: {
      async signin () {
        this.signinState = 'fetching'
        try {
          await api.auth.signin(this.signinData.username, this.signinData.password)
          this.$router.replace({ name: 'Dashboard' })
        } catch (e) {
          this.signinState = e.message
        }
      }
    }
  }
</script>
