<template>
  <tbody>
    <tr v-for="(application, index) in applications"
      :key="application.id"
      :style="{
        'background-color': (index !== 0) ? '#eee' : '#fff',
        'display': ((index !== 0 && expended) || index === 0) ? 'table-row' : 'none'
      }">
      <td>{{ application.id }}</td>
      <td>
        <router-link :to="{ name: 'Product', params: { pid: application.productId }, query: { developerid: application.developerId } }">
          {{ application.productId }}
        </router-link>
      </td>
      <td>{{ application.developerId }}</td>
      <td>{{ application.requestType | requestTypeToString }}</td>
      <td>{{ application.createdAt | timestampToString }}</td>
      <td>{{ application.lastModifiedAt | timestampToString }}</td>
      <td>{{ statusToString(application.applicationStatus) }}</td>
      <td>
        <template v-if="application.applicationStatus === 'CREATED'">
          <a href="javascript:;" @click="agree(application)">同意</a>
          <a href="javascript:;" @click="disagree(application)">拒绝</a>
        </template>

        <template v-else>已处理</template>

        <a href="javascript:;"
          @click="expended = !expended"
          v-if="index === 0 && applications.length > 1">{{ expended ? '收起历史请求' : '查看历史请求' }}</a>
      </td>
    </tr>
  </tbody>
</template>

<script>
  import api from 'src/api'

  export default {
    props: {
      applications: Array
    },

    data () {
      return {
        expended: false
      }
    },

    filters: {
      timestampToString (timestamp) {
        var date = new Date(timestamp)
        if (!date) return ''
        return date.toLocaleDateString()
      },

      requestTypeToString (type) {
        /*
          PUBLISH,
          CANCEL,
          REVOKE
        */
        switch (type) {
          case 'PUBLISH': return '发布'
          case 'CANCEL': return '取消发布'
          case 'REVOKE': return '下架'
          default: return '未知类型'
        }
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

<style>

</style>
