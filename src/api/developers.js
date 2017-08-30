import { http } from 'src/api/client'

export default {
  async getDevelopers () {
    return (await http.get('/developers')).data
  }
}
