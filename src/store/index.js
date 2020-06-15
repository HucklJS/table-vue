import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations/mutations"
import actions from "./actions/actions"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    isError: false,
    isLoading: true,
    productsPerPage: '10',
    currentPage: 0,
    sortOrder: 'high-low',
    activeProductProp: 'product',
  },
  getters: {
    productsOnPage: state => {
      const correction = state.currentPage * state.productsPerPage
      return [...state.products]
          .sort((a, b) => {
            return state.sortOrder === 'high-low' ?
                (a[state.activeProductProp] <= b[state.activeProductProp] ? 1 : -1) :
                (a[state.activeProductProp] >= b[state.activeProductProp] ? 1 : -1)
          })
          .slice(
              correction,
              Number(state.productsPerPage) + correction
          )
    }
  },
  mutations: mutations,
  actions: actions
})
