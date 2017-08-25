<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <form>
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
            </button>
            <h4 class="modal-title">{{$t('auth.change_pwd')}}</h4>
          </div>

          <div class="modal-body">
            <div class="eva-change-password-form">
              <p class="text-success" v-if="state === 'success'">{{$t('auth.change_pwd_success')}}</p>
              <p class="text-warning" v-else-if="state === 'repeat password not match'">{{$t('auth.rpwd_not_match')}}</p>
              <p class="text-warning" v-else-if="state === 'password not valid'">{{$t('auth.pwd_format_wrong')}}</p>
              <p class="text-warning" v-else-if="state !== ''">{{$t('misc.unknow_error')}}</p>

              <div class="form-group">
                <label>
                  {{$t('auth.old_pwd')}}<input class="form-control" type="password" v-model="oldPassword" :placeholder="$t('auth.input_old_pwd')">
                </label>
              </div>

              <div class="form-group">
                <label>
                  {{$t('auth.new_pwd')}}<input class="form-control" type="password" v-model="newPassword" :placeholder="$t('auth.input_new_pwd')">
                </label>
              </div>

              <div class="form-group">
                <label>
                  {{$t('auth.repeat_new_pwd')}}<input class="form-control" type="password" v-model="repeatNewPassword" :placeholder="$t('auth.input_new_pwd_again')">
                </label>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click.prevent="changePassword">{{$t('misc.modify')}}</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">{{$t('misc.close')}}</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
  import utils from 'src/utils'
  import api from 'src/api'

  export default {
    name: 'ChangePassword',

    data () {
      return {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: '',
        state: ''
      }
    },

    methods: {
      async changePassword () {
        this.state = ''

        try {
          if (this.newPassword !== this.repeatNewPassword) {
            this.state = 'repeat password not match'
            return
          } else if (!utils.validatePassword(this.oldPassword) || !utils.validatePassword(this.newPassword)) {
            this.state = 'password not valid'
            return
          }

          await api.developer.changePassword(this.oldPassword, this.newPassword)
          this.$store.commit('setDeveloper', api.client.session.developerView)
          this.state = 'success'
        } catch (e) {
          this.state = e.message
        } finally {
          this.newPassword = ''
          this.repeatNewPassword = ''
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-change-password-form {
    width: 200px;
    margin: 0 auto;
  }
</style>
