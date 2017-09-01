<template>
  <div>
    <div class="row">
      <div class="col-sm-12">

        <div class="alert alert-danger" role="alert" v-if="message === 'fail'">{{$t('misc.fetch_data_fail')}}</div>

        <div class="x_panel">
          <div class="x_title">
            <h2>应用上架请求</h2>

            <div class="clearfix"></div>

          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>产品 ID</th>
                  <th>开发者 ID</th>
                  <th>创建时间</th>
                  <th>处理时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="application in applications">
                  <td>{{ application.id }}</td>
                  <td>{{ application.productId }}</td>
                  <td>{{ application.developerId }}</td>
                  <td>{{ application.createdAt | timestampToString }}</td>
                  <td>{{ application.lastModifiedAt | timestampToString }}</td>
                  <td>{{ statusToString(application.applicationStatus) }}</td>
                  <td>
                    <template v-if="application.applicationStatus === 'CREATED'">
                      <a href="javascript:;" @click="agree(application)">同意</a>
                      <a href="javascript:;" @click="disagree(application)">拒绝</a>
                    </template>

                    <template v-else>已处理</template>
                  </td>
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
    name: 'ApplicationsManager',

    data () {
      return {
        applications: null,

        message: ''
      }
    },

    async created () {
      try {
        this.applications = await api.products.getApplications()
      } catch (e) {
        this.message = 'fail'
      }
    },

    filters: {
      timestampToString (timestamp) {
        var date = new Date(timestamp)
        if (!date) return ''
        return date.toLocaleDateString()
      }
    },

    methods: {
      async agree (application) {
        try {
          await api.products.updateApplication(application, true)
        } catch (e) {
          this.message = 'fail'
        }
      },

      async disagree (application) {
        try {
          await api.products.updateApplication(application, false)
        } catch (e) {
          this.message = 'fail'
        }
      },

      statusToString (status) {
        switch (status) {
          case 'CREATED':
            return '未处理'
          case 'AGREE':
            return '已同意'
          case 'DISAGREE':
            return '已拒绝'
          default:
            return '未知状态'
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
