import { http } from 'src/api/client'

export default {
  async getTypes () {
    return (await http.get('/products/types')).data
  },

  async createType (name, groupName) {
    return (await http.post('/products/types', {
      name,
      groupName
    })).data
  }
}
