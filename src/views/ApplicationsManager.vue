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
                  <th>请求ID</th>
                  <th>产品 ID</th>
                  <th>开发者 ID</th>
                  <th>请求类型</th>
                  <th>创建时间</th>
                  <th>处理时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <ApplicationRow v-for="(applications, pid) in applicationsByProduct" :applications="applications" :key="pid"/>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'
  import ApplicationRow from 'src/components/ApplicationRow'

  export default {
    name: 'ApplicationsManager',

    data () {
      return {
        applicationsByProduct: null,

        message: ''
      }
    },

    async created () {
      try {
        this.applicationsByProduct = await api.products.getApplications()
      } catch (e) {
        this.message = 'fail'
      }
    },

    components: {
      ApplicationRow
    }
  }
</script>

<style lang="scss">
</style>
