import {getProducts} from "../../api/request"
import {
    SAVE_PRODUCTS,
    FINISH_LOADING,
    GENERATE_ERROR,
    CHANGE_CURRENT_PAGE,
    SET_PRODUCTS_PER_PAGE
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
    onChangeProductsPerPage(context, value) {
        context.commit(SET_PRODUCTS_PER_PAGE, value)
        context.commit(CHANGE_CURRENT_PAGE, 'reset')
    },
    // end select product per page,

    // // navigation
    // changeCurrentPage(direction) {
    //
    // },
    // // end navigation
}