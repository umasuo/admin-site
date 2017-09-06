import { http } from 'src/api/client'

export default {
  async getProduct (productId, developerId) {
    return (await http.get(`/products/${productId}`, {
      params: {
        developerId
      }
    })).data
  },

  async getApplications () {
    return (await http.get('/products/applications')).data
  },

  async updateApplication (application, agreed) {
    var status = agreed ? 'AGREE' : 'DISAGREE'

    await http.put('/products/applications/' + application.id, {
      'recordStatus': 'FINISHED',
      'applicationStatus': status,
      'version': application.version
    })

    application.recordStatus = 'FINISHED'
    application.applicationStatus = status
  }
}
