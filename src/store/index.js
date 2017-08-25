import Vue from 'vue'
import Vuex from 'vuex'
import storejs from 'store'
import api from 'src/api'

Vue.use(Vuex)

let userTimezone = (new Date().getTimezoneOffset() / -60)
userTimezone = userTimezone > 0 ? 'GMT+' + userTimezone.toString() : 'GMT' + userTimezone.toString()
const state = {
  timezone: storejs.get('timezone') || userTimezone,
  productTypes: undefined,
  products: undefined,

  // state in views
  productDetail: {
    isWizardStepsDisable: false
  }
}

const mutations = {
  setDeveloper (state, developer) {
    state.developer = developer
  },

  setProductTypes (state, productTypes) {
    state.productTypes = productTypes
  },

  setProducts (state, products) {
    state.products = products
  },

  addProduct (state, product) {
    state.products = state.products || []
    state.products.push(product)
  },

  updateProduct (state, {oldProduct, newProduct}) {
    const index = state.products.indexOf(oldProduct)

    // The next line is not going to work, state can't detect the change
    // state.products[index] = newProduct

    // next two line is fine, see https://vuejs.org/v2/guide/list.html#Mutation-Methods for more detail
    // Vue.set(state.products, index, newProduct)
    state.products.splice(index, 1, newProduct)
  },

  deleteProduct (state, product) {
    const index = state.products.indexOf(product)
    state.products.splice(index, 1)
  },

  updateTimezone (state, timezone) {
    state.timezone = timezone
    storejs.set('timezone', timezone)
  },

  setProductDetailWizardStep (state, isDisable) {
    state.productDetail.isWizardStepsDisable = isDisable
  }
}

const actions = {
  async fetchProductTypes ({state, commit}) {
    if (state.productTypes) return state.productTypes

    const productTypes = await api.product.fetchProdcutTypes()
    commit('setProductTypes', productTypes)
    return productTypes
  },

  async fetchProducts ({state, commit}) {
    if (state.products) return state.products

    const products = await api.product.fetchDeveloperProducts()
    commit('setProducts', products)
    return products
  },

  async createProduct ({state, commit}, productDraft) {
    const product = await api.product.createProduct(productDraft)
    commit('addProduct', product)
    return product
  },

  async updateProduct ({state, commit}, {product, request}) {
    const updatedProduct = await api.product.updateProduct(product.id, request)
    commit('updateProduct', {oldProduct: product, newProduct: updatedProduct})
    return updatedProduct
  },

  async deleteProduct ({state, commit}, product) {
    await api.product.deleteProduct(product.id, product.version)
    commit('deleteProduct', product)
  },

  async publishProduct ({state, commit}, product) {
    await api.product.publishProduct(product.id, product.version)
    const updatedProduct = {...product, ...{status: 'CHECKING', version: product.version + 1}}
    commit('updateProduct', {oldProduct: product, newProduct: updatedProduct})
    return updatedProduct
  },

  async cancelProduct ({state, commit}, product) {
    await api.product.cancelProduct(product.id, product.version)
    const updatedProduct = {...product, ...{status: 'DEVELOPING', version: product.version + 1}}
    commit('updateProduct', {oldProduct: product, newProduct: updatedProduct})
    return updatedProduct
  },

  async revokeProduct ({state, commit}, product) {
    await api.product.revokeProduct(product.id, product.version)
    const updatedProduct = {...product, ...{status: 'REVOKED', version: product.version + 1}}
    commit('updateProduct', {oldProduct: product, newProduct: updatedProduct})
    return updatedProduct
  }
}

const getters = {
  getProductTypeById: state => tid => {
    if (!Array.isArray(state.productTypes)) return

    const type = state.productTypes.find(type => {
      return type.id === tid
    })

    return type
  },

  getProductById: state => pid => {
    if (!Array.isArray(state.products)) return

    const product = state.products.find(product => {
      return product.id === pid
    })

    return product
  },

  categorizedProductTypes: (state, getters) => {
    if (!Array.isArray(state.productTypes)) return

    const categories = {}
    state.productTypes.forEach(type => {
      categories[type.groupName] = categories[type.groupName] || []
      categories[type.groupName].push(type)
    })

    return categories
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
