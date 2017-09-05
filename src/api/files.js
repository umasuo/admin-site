import { http } from 'src/api/client'

export default {
  async uploadFile (file) {
    const data = new FormData()
    data.append('file', file)
    return (await http.post('/files', data)).data
  }
}
