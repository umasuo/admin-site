<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('misc.filter_options')}}</h2>
            <div class="clearfix"></div>
          </div>
          <div class="x_content">
            <form class="form-inline">
              <div class="form-group">
                <label>{{$t('user_manage.user_id')}}:
                  <input type="text" class="form-control" v-model="id"/>
                </label>
              </div>
              <div class="form-group">
                <label>{{$t('device_manage.user_phone')}}:
                  <input type="text" class="form-control" v-model="phone"/>
                </label>
              </div>

              <button type="submit" class="btn btn-default">{{$t('misc.search')}}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('user_manage.user_list')}}</h2>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>{{$t('user_manage.user_id')}}</th>
                  <th>{{$t('device_manage.user_phone')}}</th>
                  <th>{{$t('user_manage.register_date')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users">
                  <td>{{ user.userId }}</td>
                  <td>{{ user.phone }}</td>
                  <td>{{ formatTime(user.registerTime) }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import api from 'src/api'

  let moment = null

  export default {
    name: 'UserManager',

    data () {
      return {
        phone: null,
        id: null,

        users: null,

        message: ''
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    async created () {
      try {
        const usersPromise = this.fetchUsers()
        const momentPromise = import(/* webpackChunkName: "moment" */ 'moment')
        moment = (await Promise.all([momentPromise, usersPromise]))[0]

        this.$forceUpdate()
      } catch (e) {
        this.message = 'fail'
      }
    },

    methods: {
      async fetchUsers () {
        if (this.phone) {
          this.users = await api.user.fetchUserByPhone(this.phone)
        } else if (this.id) {
          this.users = await api.user.fetchUserByPhone(this.id)
        } else {
          this.users = await api.user.fetchUsers()
        }
      },

      formatTime (timestamp) {
        // moment library might not loaded yet
        if (!moment) {
          return ''
        }

        return moment(timestamp.toString(), 'x')
          .utcOffset(parseInt(this.timezone.substr(3)))
          .format('YYYY-MM-DD')
      }
    }
  }
</script>

<style lang="scss">
</style>
