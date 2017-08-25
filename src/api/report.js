import { http } from 'src/api/client'

export default {
  async getReport () {
    const [productsCount, devicesCount, usersCount, developersCount] = await Promise.all([
      http.get('/products/count'),
      http.get('/devices/count'),
      http.get('/users/count'),
      http.get('/developers/count')
    ])

    return {
      productsCount: productsCount.data,
      devicesCount: devicesCount.data,
      usersCount: usersCount.data,
      developersCount: developersCount.data
    }
  }
}
