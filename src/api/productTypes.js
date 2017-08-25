import { http } from 'src/api/client'

export default {
  async getTypes () {
    return (await http.get('/products/types')).data
  }
}
