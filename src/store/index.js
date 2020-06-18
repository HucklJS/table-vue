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
    // change to activeProductPropName
    activeProductProp: 'product',
    productProps: [
      {name: 'product', value: 'Product (100g serving)'},
      {name: 'calories', value: 'Calories'},
      {name: 'fat', value: 'Fat (g)'},
      {name: 'carbs', value: 'Carbs (g)'},
      {name: 'protein', value: 'Protein (g)'},
      {name: 'iron', value: 'Iron (%)'}
    ],
    excludedProductProps: [],
    isSelectExpandedVisible: false,
    idsProductsForDelete: [],
    deleteConfirmCoords: {},
    isDeleteConfirmVisible: false,
  },
  getters: {
    productsAmount: state => {
      return state.products.length
    },
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
    },
    filteredAndSortedProductProps: state => {
      return state.productProps
          .filter(p => !state.excludedProductProps.includes(p.name))
          // made active prop first by sorting
          // (if second prop active then swap otherwise don't touch)
          .sort(second => second.name === state.activeProductProp ? -1 : 0)
    },
    isAllProductPropsExcluded: state => {
      return state.productProps.length === state.excludedProductProps.length
    },
    isAllProductPropsSelected: state => {
      return !state.excludedProductProps.length
    },
    productsStartFrom: state => {
      return state.currentPage * state.productsPerPage + 1
    },
    productsEndTo: state => {
      const productsAmount = state.products.length
      const possibleValue = (state.currentPage  + 1) * state.productsPerPage

      return (productsAmount > possibleValue)
          ? possibleValue
          : productsAmount
    }
  },
  mutations: mutations,
  actions: actions
})
