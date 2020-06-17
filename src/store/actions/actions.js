import {getProducts} from "../../api/request"
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
} from '../mutations/mutation-types'


export default {
    getProductsFromApi(context) {
        getProducts()
            .then(products => {
                context.commit(FINISH_LOADING)
                context.commit(SAVE_PRODUCTS, products)
            })
            .catch(e => {
                console.error(e.error)
                context.commit(FINISH_LOADING)
                context.commit(GENERATE_ERROR)
            })
    },

    // select product per page
    changeProductsPerPage(context, value) {
        context.commit(SET_PRODUCTS_PER_PAGE, value)
        context.commit(CHANGE_CURRENT_PAGE, 'reset')
    },
    // end select product per page,

    // // navigation
    changeCurrentPage({commit} ,direction) {
        commit(CHANGE_CURRENT_PAGE, direction)
    },
    // // end navigation

    // products sort order change
    toggleSortOrder({commit}) {
        commit(TOGGLE_SORT_ORDER)
        // watch???
        commit(CHANGE_CURRENT_PAGE, 'reset')
    },
    // end products sort order change

    // click on sorting-btns
    chooseFirstColumn({commit}, newActiveProductProp) {
        commit(SET_ACTIVE_PRODUCT_PROP, newActiveProductProp)
        // watch???
        commit(CHANGE_CURRENT_PAGE, 'reset')
    },
    // end click on sorting-btns

    toggleExcludedProductProp({commit, state, getters}, propName) {
        // delete from excluded props
        if (state.excludedProductProps.includes(propName)) {
            if (getters.isAllProductPropsExcluded) {
                // make first enabled prop active
                commit(SET_ACTIVE_PRODUCT_PROP, propName)
                // watch???
                commit(CHANGE_CURRENT_PAGE, 'reset')

            }

            commit(DELETE_FROM_EXCLUDED_PRODUCT_PROPS, propName)
        // add to excluded props
        } else {
            // if this prop was active
            if (propName === state.activeProductProp) {
                // find first inactive prop
                const inactiveProp = state.productProps.find(
                    prop => !state.excludedProductProps.includes(prop.name)
                        && prop.name !== propName
                )
                // if find inactive prop
                if (inactiveProp !== undefined) {
                    commit(SET_ACTIVE_PRODUCT_PROP, inactiveProp.name)
                    // watch???
                    commit(CHANGE_CURRENT_PAGE, 'reset')
                }
            }

            commit(ADD_TO_EXCLUDED_PRODUCT_PROPS, propName)
        }
    },

    toggleAllProductPropsSelected({commit, state, getters}) {
        if (getters.isAllProductPropsSelected) {
            commit(SET_EXCLUDED_PRODUCT_PROPS, state.productProps.map(prop => prop.name))
        } else {
            commit(SET_EXCLUDED_PRODUCT_PROPS, [])

            commit(SET_ACTIVE_PRODUCT_PROP, 'product')
            // watch???
            commit(CHANGE_CURRENT_PAGE, 'reset')
        }
    },

    toggleSelectExpandedVisible({commit}) {
        commit(TOGGLE_SELECT_EXPANDED_VISIBLE)
    },

    prepareToRemoveOneProduct({commit}, {productId, coordFromTop}) {
        commit(SET_PRODUCTS_IDS_FOR_DELETE, [productId])
        commit(SET_DELETE_CONFIRM_COORDS, coordFromTop)
        commit(SHOW_DELETE_CONFIRM)
    },

    toggleIdsProductsForDelete({commit, state}, {productId, coordFromTop}) {
        if (state.idsProductsForDelete.includes(productId)) {
            const newIdsProductsForDelete = state.idsProductsForDelete.filter(
                id => id !== productId
            )
            commit(SET_PRODUCTS_IDS_FOR_DELETE, newIdsProductsForDelete)
        } else {
            commit(SET_PRODUCTS_IDS_FOR_DELETE, [...state.idsProductsForDelete, productId])
            commit(SET_DELETE_CONFIRM_COORDS, coordFromTop)
        }
    },

    showDeleteConfirm({commit}) {
        commit(SHOW_DELETE_CONFIRM)
    },

    hideDeleteConfirm({commit}) {
        commit(HIDE_DELETE_CONFIRM)
    },

    removeProductsById({commit, state}) {
        const newProducts = state.products.filter(
            product => !state.idsProductsForDelete.includes(product.id)
        )
        commit(SAVE_PRODUCTS, newProducts)
        commit(HIDE_DELETE_CONFIRM)
    }

}