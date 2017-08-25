import client, { http } from 'src/api/client'

export default {
  async signin (username, password) {
    const auth = {
      username,
      password
    }
    // HTTP Basic Auth, access any protected resource to verify credentials
    await http.get('/users/count', { auth })
    client.setSession(auth)
  },

  signout () {
    client.setSession()
  }
}
