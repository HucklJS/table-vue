import {
    SAVE_PRODUCTS,
    FINISH_LOADING,
    GENERATE_ERROR,
    CHANGE_CURRENT_PAGE,
    SET_PRODUCTS_PER_PAGE,
    TOGGLE_SORT_ORDER,
    SET_ACTIVE_PRODUCT_PROP,
    DELETE_FROM_EXCLUDED_PRODUCT_PROPS,
    ADD_TO_EXCLUDED_PRODUCT_PROPS,
    SET_EXCLUDED_PRODUCT_PROPS,
    TOGGLE_SELECT_EXPANDED_VISIBLE,
    SET_PRODUCTS_IDS_FOR_DELETE,
    SET_DELETE_CONFIRM_COORDS,
    SHOW_DELETE_CONFIRM,
    HIDE_DELETE_CONFIRM
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
                throw new Error('current page didn\'t changed')
        }
    },
    [SET_PRODUCTS_PER_PAGE](state, value) {
        state.productsPerPage = value
    },
    [TOGGLE_SORT_ORDER](state) {
        state.sortOrder = state.sortOrder === 'high-low' ? 'low-high' : 'high-low'
    },
    [SET_ACTIVE_PRODUCT_PROP](state, newActiveProductProp) {
        state.activeProductProp = newActiveProductProp
    },
    [DELETE_FROM_EXCLUDED_PRODUCT_PROPS](state, propName) {
        const i = state.excludedProductProps.findIndex(pName => pName === propName)
        state.excludedProductProps.splice(i, 1)
    },
    [ADD_TO_EXCLUDED_PRODUCT_PROPS](state, propName) {
        state.excludedProductProps.push(propName)
    },
    [SET_EXCLUDED_PRODUCT_PROPS](state, newExcludedProductProps) {
        state.excludedProductProps = newExcludedProductProps
    },
    [TOGGLE_SELECT_EXPANDED_VISIBLE](state) {
        state.isSelectExpandedVisible = !state.isSelectExpandedVisible
    },
    [SET_PRODUCTS_IDS_FOR_DELETE](state, productsIds) {
        state.idsProductsForDelete = productsIds
    },
    [SET_DELETE_CONFIRM_COORDS](state, coordFromTop) {
        state.deleteConfirmCoords = {
            top: coordFromTop + 'px'
        }
    },
    [SHOW_DELETE_CONFIRM](state) {
        state.isDeleteConfirmVisible = true
    },
    [HIDE_DELETE_CONFIRM](state) {
        state.isDeleteConfirmVisible = false
        state.idsProductsForDelete = []
    }

}