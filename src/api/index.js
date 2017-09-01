import client from 'src/api/client'
// import developer from 'src/api/developer'
// import product from 'src/api/product'
// import userReport from 'src/api/userReport'
// import deviceReport from 'src/api/deviceReport'
// import user from 'src/api/user'
// import device from 'src/api/device'
// import feedback from 'src/api/feedback'
// import files from 'src/api/files'

import auth from 'src/api/auth'
import report from 'src/api/report'
import productTypes from 'src/api/productTypes'
import developers from 'src/api/developers'
import products from 'src/api/products'

export default {
  client, // config the axios http library & store api state and persist them in localstorage
  buildRequest (version) {
    class RequestBuilder {
      _request = {
        version: undefined,
        actions: []
      }

      constructor (version) {
        this._request.version = version
      }

      addAction (data) {
        this._request.actions.push(data)
        return this
      }

      get request () {
        return this._request
      }
    }

    return new RequestBuilder(version)
  },

  // api endpoints import http (axios instance) from Client, set and get state to Client,
  // developer,
  // product,
  // userReport,
  // deviceReport,
  // user,
  // device,
  // feedback,
  // files,

  auth,
  report,
  productTypes,
  developers,
  products
}
