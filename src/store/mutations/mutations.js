import {
    SAVE_PRODUCTS,
    FINISH_LOADING,
    GENERATE_ERROR,
    CHANGE_CURRENT_PAGE,
    SET_PRODUCTS_PER_PAGE
} from './mutation-types'

export default {
    [SAVE_PRODUCTS](state, products) {
        state.products = products
    },
    [FINISH_LOADING](state) {
        state.isLoading = false
    },
    [GENERATE_ERROR](state) {
        state.isError = true
    },
    [CHANGE_CURRENT_PAGE](state, direction) {
        switch (direction) {
            case 'forward':
                state.currentPage++
                break
            case 'back':
                state.currentPage--
                break
            case 'reset':
                state.currentPage = 0
                break
            default:
                console.error('current page didn\'t change')
        }
    },
    [SET_PRODUCTS_PER_PAGE](state, value) {
        state.productsPerPage = value
    }
}