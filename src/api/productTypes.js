import { http } from 'src/api/client'

export default {
  async getTypes () {
    return (await http.get('/products/types')).data
  },

  async getTypeById (id) {
    return (await http.get('/products/types/' + id)).data
  },

  async createType (name, groupName) {
    return (await http.post('/products/types', {
      icon: 'http://evacloud-20170725.oss-cn-shenzhen.aliyuncs.com/89df80b7-e75d-4eff-83b5-ca5877712021', // default icon
      name,
      groupName
    })).data
  },

  async deleteType (id, version) {
    return (await http.delete('/products/types/' + id, {
      params: {
        version
      }
    })).data
  },

  async updateType (id, request) {
    return (await http.put('/products/types/' + id, request)).data
  }
}
