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
                      <option value="id1" >{{$t('device_manage.p_band')}}</option>
                      <option value="id2" >{{$t('device_manage.p_weight')}}</option>
                    </select>
                  </label>
                </div>

                <div class="form-group">
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> {{$t('device_manage.is_active')}}
                  </label>
                </div>
              </div>

              <div>
                <div class="form-group">
                  <label>{{$t('device_manage.is_active')}}:
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

    <div class="row">
      <div class="col-sm-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>{{$t('device_manage.device_list')}}</h2>

            <div class="clearfix"></div>
          </div>
          <div class="x_content">

            <table class="table">
              <thead>
                <tr>
                  <th>{{$t('device_manage.device_icon')}}</th>
                  <th>{{$t('device_manage.device_id')}}</th>
                  <th>{{$t('device_manage.union_id')}}</th>
                  <th>{{$t('device_manage.belong_product')}}</th>
                  <th>{{$t('device_manage.belong_user')}}</th>
                  <th>{{$t('device_manage.binding_state')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="device in devices" :key="device.deviceId">
                  <td>
                    <!-- TODO: 换个默认icon -->
                    <img :src="device.icon || 'http://icons.iconarchive.com/icons/pixelresort/wall-e/32/EVE-icon.png'"/>
                  </td>

                  <td>{{ device.deviceId }}</td>

                  <td>{{ device.unionId }}</td>

                  <td>{{ device.productName }}</td>

                  <td>{{ device.userPhone }}</td>

                  <td>{{ formatStatus(device) }}</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div><!-- end of device list row -->
  </div>
</template>

<script>
  import api from 'src/api'
  import { mapState } from 'vuex'

  let moment = null

  export default {
    name: 'DeviceInfo',

    data () {
      return {
        message: '',
        devices: []
      }
    },

    computed: {
      ...mapState(['timezone'])
    },

    async created () {
      this.fetchDevices()

      try {
        moment = await import(/* webpackChunkName: "moment" */ 'moment')
        this.$forceUpdate()
      } catch (e) {
        console.dir(e)
        this.message = 'fail'
      }
    },

    methods: {
      async fetchDevices () {
        try {
          this.devices = await api.device.fetchDevices()
        } catch (e) {
          this.message = 'fail'
        }
      },

      formatStatus (device) {
        // moment library might not loaded yet
        if (!moment) {
          return ''
        }

        if (device.status === 'BIND') {
          return this.$t('device_manage.binding_state_1') + ' ' +
            moment(device.bindTime.toString(), 'x')
              .utcOffset(parseInt(this.timezone.substr(3)))
              .format('YYYY/MM/DD') +
            ' ' + this.$t('device_manage.binding_state_2')
        } else {
          return this.$t('device_manage.binding_state_1') + ' ' +
            moment(device.unbindTime.toString(), 'x')
              .utcOffset(parseInt(this.timezone.substr(3)))
              .format('YYYY/MM/DD') +
            ' ' + this.$t('device_manage.binding_state_3')
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
