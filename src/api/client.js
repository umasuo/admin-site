import axios from 'axios'
import storejs from 'store'
import router from 'src/router'
import api from 'src/api'
import NProgress from 'nprogress'

export const http = axios.create({
  // baseURL: 'http://api.evacloud.cn/v1',
  baseURL: 'http://120.78.24.67/v1/admin',
  // baseURL: 'http://localhost:3000/v1/',
  timeout: 30000
})

http.interceptors.request.use(config => {
  // add HTTP Basic Credentials
  if (!config.auth) {
    config.auth = client._session
  }

  // start NProgress and increase a little bit
  !NProgress.isStarted() && NProgress.start()
  NProgress.inc()

  // increase NProgress according to request progress
  config.onDownloadProgress = progressEvent => {
    NProgress.inc()
  }
  return config
})

http.interceptors.response.use(response => {
  NProgress.isStarted() && NProgress.done()

  return response
}, error => {
  NProgress.isStarted() && NProgress.done()

  if (error.response) {
    switch (error.response.status) {
      case 401:
        // Unauthorized, redirect to login page
        api.developer.signout()
        router.replace({name: 'Signin'})
        break
    }
  }
  throw error
})

const client = {
  // session consist of token and current logged user
  _session: undefined,

  setSession (session) {
    if (!session || !session.username || !session.password) {
      storejs.remove('session')
    } else {
      this._session = session
      storejs.set('session', session)
    }
  },

  get isAuthorized () {
    return this._session && this._session.username && this._session.password
  }
}

// resume session from localstorage
client.setSession(storejs.get('session'))

export default client
