<template>
  <div>
    <!-- TODO: 过滤查询接口完成后实现 -->
    <!-- <div class="row">
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
    </div> -->

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
                  <th>{{$t('misc.phone')}}</th>
                  <th>{{$t('misc.email')}}</th>
                  <th>{{$t('misc.state')}}</th>
                  <th>{{$t('user_manage.register_date')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="developer in developers">
                  <td>{{ developer.id }}</td>
                  <td>{{ developer.phone }}</td>
                  <td>{{ developer.email }}</td>
                  <td>{{ developer.status }}</td>
                  <td>{{ formatTime(developer.createdAt) }}</td>
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
  import api from 'src/api'

  export default {
    name: 'DevelopersManager',

    data () {
      return {
        phone: null,
        id: null,

        developers: null,

        message: ''
      }
    },

    async created () {
      try {
        this.developers = await api.developers.getDevelopers()
      } catch (e) {
        this.message = 'fail'
      }
    },

    methods: {
      formatTime (timestamp) {
        return (new Date(timestamp)).toLocaleDateString()
      }
    }
  }
</script>

<style lang="scss">
</style>
