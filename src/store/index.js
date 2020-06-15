import Vue from 'vue'
import Vuex from 'vuex'
import {getProducts} from "../from-server/request"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isError: false,
    isLoading: true,
  },
  mutations: {
    saveProducts(state, products) {
      state.products = products
    },
    finishLoading(state) {
      state.isLoading = false
    },
    generateError(state) {
      state.isError = true
    }
  },
  actions: {
    getProductsFromApi(context) {
      getProducts()
          .then(products => {
            context.commit('finishLoading')
            context.commit('saveProducts', products)
          })
          .catch(e => {
            console.error(e.error)
            context.commit('finishLoading')
            context.commit('generateError')
          })
    }
  },
  modules: {
  }
})
