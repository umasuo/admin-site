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
              <div>
                <div class="form-group">
                  <label>{{$t('device_manage.product')}}:
                    <select class="form-control">
                      <option value="all" selected="selected">{{$t('device_manage.p_all_product')}}</option>
                      <!-- <option value="id1" >{{$t('device_manage.p_band')}}</option>
                      <option value="id2" >{{$t('device_manage.p_weight')}</option> -->
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label>{{$t('feedback_manage.type')}}:
                    <select class="form-control">
                      <option value="all" selected="selected">{{$t('feedback_manage.t_all')}}</option>
                      <option value="id1" >{{$t('feedback_manage.t_question')}}</option>
                      <option value="id2" >{{$t('feedback_manage.t_thanks')}}</option>
                      <option value="id2" >{{$t('feedback_manage.t_complain')}}</option>
                      <option value="id2" >{{$t('feedback_manage.t_error')}}</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> {{$t('feedback_manage.is_handled')}}
                  </label>
                </div>
              </div>

              <div>
                <div class="form-group">
                  <label>{{$t('device_manage.user_phone')}}:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>{{$t('device_manage.union_id')}}:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
                <div class="form-group">
                  <label>{{$t('device_manage.device_id')}}:
                    <input type="text" class="form-control"/>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-default">{{$t('misc.search')}}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('feedback_manage.feedback_list')}}</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>{{$t('device_manage.user_phone')}}</th>
                  <th>{{$t('feedback_manage.type')}}</th>
                  <th>{{$t('device_manage.device_id')}}</th>
                  <!-- TODO: show this -->
                  <!-- <th>设备类型</th> -->
                  <th>{{$t('misc.title')}}</th>
                  <th>{{$t('feedback_manage.feedback_date')}}</th>
                  <!-- TODO: show this -->
                  <!-- <th>处理人员</th> -->
                  <th>{{$t('feedback_manage.handle_date')}}</th>
                  <!-- <th>状态</th> -->
                  <!-- <th>操作</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="feedback in feedbacks" :key="feedback.id">
                  <td>{{ feedback.phone }}</td>
                  <td>{{ feedback.type | formatFeedbackType }}</td>
                  <td>{{ feedback.deviceId }}</td>
                  <!-- <td> </td> -->
                  <td>{{ feedback.title }}</td>
                  <td>{{ formatFeedbackDate(feedback.createdAt) }}</td>
                  <!-- <td>admin</td> -->
                  <td>{{ formatFeedbackDate(feedback.lastModifiedAt) }}</td>
                  <!-- <td>{{ feedback.developerStatus }}</td> -->
                  <!-- TODO: 完成处理反馈 modal-->
                  <!-- <td><a href="javascript:;">处理反馈</a></td> -->
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
  import { mapState } from 'vuex'

  let moment = null

  export default {
    name: 'FeedbackManager',

    data () {
      return {
        feedbacks: [],

        message: ''
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    async created () {
      try {
        const feedbacksPromise = this.fetchFeedbacks()
        const momentPromise = import(/* webpackChunkName: "moment" */ 'moment')
        moment = (await Promise.all([momentPromise, feedbacksPromise]))[0]

        this.$forceUpdate()
      } catch (e) {
        this.message = 'fail'
      }
    },

    methods: {
      async fetchFeedbacks () {
        this.feedbacks = await api.feedback.fetchFeedbacks()
      },

      formatFeedbackDate (timestamp) {
        // moment library might not loaded yet
        if (!moment) {
          return ''
        }

        return moment(timestamp.toString(), 'x')
          .utcOffset(parseInt(this.timezone.substr(3)))
          .format('YYYY-MM-DD HH:mm:ss')
      }
    },

    filters: {
      formatFeedbackType (type) {
        switch (type) {
          case 'QUESTION': return this.$t('feedback_manage.t_question')
          case 'THANKS': return this.$t('feedback_manage.t_thanks')
          case 'COMPLAIN': return this.$t('feedback_manage.t_complain')
          case 'ERROR': return this.$t('feedback_manage.t_error')
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
