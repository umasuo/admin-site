<template>
  <div class="row tile_count">
    <div class="col-md-3 col-sm-6 tile_stats_count">
      <span class="count_top"><i class="fa fa-plus"></i> {{$t('dashboard.devices')}}</span>
      <div class="count">{{ report.devicesCount }}</div>
    </div>
    <div class="col-md-3 col-sm-6 tile_stats_count">
      <span class="count_top"><i class="fa fa-clock-o"></i> {{$t('dashboard.developers')}}</span>
      <div class="count green">{{ report.developersCount }}</div>
    </div>
    <div class="col-md-3 col-sm-6 tile_stats_count">
      <span class="count_top"><i class="fa fa-user"></i> {{$t('dashboard.products')}}</span>
      <div class="count">{{ report.productsCount }}</div>
    </div>
    <div class="col-md-3 col-sm-6 tile_stats_count">
      <span class="count_top"><i class="fa fa-users"></i> {{$t('dashboard.users')}}</span>
      <div class="count">{{ report.usersCount }}</div>
    </div>
  </div>
</template>

<script>
import api from 'src/api'

export default {
  name: 'Dashboard',

  data () {
    return {
      report: {}
    }
  },

  async created () {
    this.report = await api.report.getReport()
  }
}
</script>

<style>
</style>
