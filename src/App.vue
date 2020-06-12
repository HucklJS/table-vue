<template>
    <div id="app">
        <div class="container">
            <h1 class="title">Table UI</h1>
            <Loader v-if="isLoading"/>
            <Error v-else-if="isError"/>
            <template v-else>
                <FiltersBar
                        :product-props="productProps"
                        @choose-first-column="chooseFirstColumn"
                        :active-product-prop="activeProductProp"

                        :selected-products-per-page="productsPerPage"
                        @on-change-selected-products-per-page="onChangeProductsPerPage"

                        :products-amount="products.length"
                        :products-start-from="productsStartFrom"
                        :products-end-to="productsEndTo"

                        @change-current-page="changeCurrentPage"

                        :is-select-expanded-visible="isSelectExpandedVisible"
                        @toggle-select-expanded-visible="toggleSelectExpandedVisible"
                        :excluded-product-props="excludedProductProps"
                        :is-all-product-props-selected="isAllProductPropsSelected"
                        @toggle-all-product-props-selected="toogleAllProductPropsSelected"
                        @toggle-exclude-product-props="toggleExcludedProductProps"


                        :is-delete-confirm-visible="isDeleteConfirmVisible"
                        :delete-confirm-coords="deleteConfirmCoords"
                        @hide-delete-confirm="hideDeleteConfirm"
                        @remove-products-by-id="removeProductsById"
                        :id-products-for-delete="idProductsForDelete"
                        @show-delete-confirm="showDeleteConfirm"
                />
                <p v-if="allProductPropsExcluded" class="no-table">You should on at least one product prop</p>
<!--                Поправить ошибку при выключении сразу всех props-ов-->
                <Table  v-else
                        @change-sort-order="changeSortOrder"
                        :sort-order="sortOrder"
                        :active-product-prop="activeProductProp"
                        :filtered-products="productsOnPage"

                        :id-products-for-delete="idProductsForDelete"

                        :filtered-and-sorted-product-props="filteredAndSortedProductProps"
                        @on-t-body-row-click="onTBodyRowClick"
                />
            </template>
        </div>
    </div>
</template>

<script>
    import FiltersBar from './components/FiltersBar.vue'
    import Table from './components/Table'
    import Error from "./components/Error"
    import Loader from "./components/Loader"
    import {getProducts} from './from-server/request'

    export default {
        name: 'App',
        components: {
            FiltersBar,
            Table,
            Error,
            Loader
        },
        data() {
            return {
                products: [],
                productProps: [
                    {name: 'product', value: 'Product (100g serving)'},
                    {name: 'calories', value: 'Calories'},
                    {name: 'fat', value: 'Fat (g)'},
                    {name: 'carbs', value: 'Carbs (g)'},
                    {name: 'protein', value: 'Protein (g)'},
                    {name: 'iron', value: 'Iron (%)'}
                ],
                excludedProductProps: [],
                allProductPropsExcluded: false,
                activeProductProp: 'product',
                isError: false,
                isLoading: true,
                productsPerPage: '10',
                currentPage: 0,
                sortOrder: 'high-low',
                isSelectExpandedVisible: false,
                isDeleteConfirmVisible: false,
                deleteConfirmCoords: {},
                idProductsForDelete: []
            }
        },
        computed: {
            productsOnPage() {
                const correction = this.currentPage * this.productsPerPage
                return this.products
                    .filter(() => true)
                    .sort((a, b) => {
                        return this.sortOrder === 'high-low' ?
                            (a[this.activeProductProp] <= b[this.activeProductProp] ? 1 : -1) :
                            (a[this.activeProductProp] >= b[this.activeProductProp] ? 1 : -1)
                    })
                    .slice(
                        correction,
                        Number(this.productsPerPage) + correction
                    )
            },
            filteredAndSortedProductProps() {
                return this.productProps
                    .filter(p => !this.excludedProductProps.includes(p.name))
                    // made active prop first by sorting
                    // (if second prop active then swap otherwise don't touch)
                    .sort(second => second.name === this.activeProductProp ? -1 : 0)
            },
            isAllProductPropsSelected() {
                return this.excludedProductProps.length ? false : true
            },
            productsStartFrom() {
                return this.currentPage * this.productsPerPage + 1
            },
            productsEndTo() {
                const productsAmount = this.products.length
                const possibleValue = (this.currentPage  + 1) * this.productsPerPage

                return (productsAmount > possibleValue)
                    ? possibleValue
                    : productsAmount
            }
        },
        methods: {
            // click on sorting-btn
            chooseFirstColumn(e) {
                const target = e.target.closest('button')
                if (!target) return

                this.activeProductProp = target.dataset.propName
                this.changeCurrentPage('reset')
            },
            // end click on sorting-btn

            // select product per page
            onChangeProductsPerPage(value) {
                this.productsPerPage = value
                this.changeCurrentPage('reset')
            },
            // end select product per page

            // navigation
            changeCurrentPage(direction) {
                switch (direction) {
                    case 'forward':
                        this.currentPage++
                        break
                    case 'back':
                        this.currentPage--
                        break
                    case 'reset':
                        this.currentPage = 0
                        break
                }
            },
            // end navigation

            // change checkboxes with product props
            toggleExcludedProductProps(e) {
                if (!e.target.closest('input')) return
                const propName = e.target.value
                console.log(e.target.checked)

                // delete from excluded props
                if (this.excludedProductProps.includes(propName)) {
                    const i = this.excludedProductProps.findIndex(pName => pName === propName)
                    this.excludedProductProps.splice(i, 1)

                    // make first enabled prop active
                    if (this.allProductPropsExcluded) {
                        this.activeProductProp = propName
                        this.allProductPropsExcluded = false
                        this.changeCurrentPage('reset')
                    }
                // add to excluded props
                } else {
                    this.excludedProductProps.push(propName)

                    const productProps = this.productProps

                    const prop = productProps.find( p => p.name === propName)
                    // if this prop was active
                    if (prop.name === this.activeProductProp) {
                        // find first inactive prop
                        const inactiveProp = productProps.find(
                            p => !this.excludedProductProps.includes(p.name)
                        )
                        if (inactiveProp !== undefined) {
                            this.activeProductProp = inactiveProp.name
                            this.changeCurrentPage('reset')
                        } else {
                            this.allProductPropsExcluded = true
                        }
                    }
                }
            },
            //end change checkboxes with product props
            toggleSelectExpandedVisible() {
                this.isSelectExpandedVisible = !this.isSelectExpandedVisible
            },
            toogleAllProductPropsSelected() {
                if (this.isAllProductPropsSelected) {
                    this.excludedProductProps = this.productProps.map(prop => prop.name)
                } else {
                    this.excludedProductProps = []
                }
            },

            // products sort order change
            changeSortOrder(e) {
                const target = e.target.closest('.active')
                if (!target) return

                this.sortOrder = this.sortOrder === 'high-low' ? 'low-high' : 'high-low'
                this.changeCurrentPage('reset')
            },
            // end products sort order change

            onTBodyRowClick(e) {
                const btn = e.target.closest('.delete-one')
                const tr = e.target.closest('.tbody-row')

                if (!btn && !tr) return
                const productId = Number(tr.dataset.id)
                const coordFromTop = tr.getBoundingClientRect().bottom + window.pageYOffset - 180

                if (btn) {
                    // const index = this.products.findIndex(product => product.id === productId)
                    // this.products.splice(index, 1)
                    // removeOneById(productId)
                    this.idProductsForDelete = [productId]
                    this.setDeleteConfirmCoords(coordFromTop)
                    this.showDeleteConfirm()
                } else {
                    if (this.idProductsForDelete.includes(productId)) {
                        this.idProductsForDelete = this.idProductsForDelete.filter(
                            id => id !== productId
                        )
                    } else {
                        this.idProductsForDelete.push(productId)
                        this.setDeleteConfirmCoords(coordFromTop)
                    }
                    console.log('memory leak (2 times click on checkbox)')
                }
            },
            showDeleteConfirm() {
                this.isDeleteConfirmVisible = true
            },
            hideDeleteConfirm() {
                this.isDeleteConfirmVisible = false
                this.idProductsForDelete = []
            },
            setDeleteConfirmCoords(coordFromTop) {
                this.deleteConfirmCoords = {
                    top: coordFromTop + 'px'
                }
            },
            removeProductsById() {
                this.products = this.products.filter(
                    product => !this.idProductsForDelete.includes(product.id)
                )
                this.hideDeleteConfirm()
            }
        },

        // watch: {
        //     selectedProductsPerPage() {
        //         console.log(this.selectedProductsPerPage)
        //     }
        // },
        mounted() {
            getProducts()
                .then(products => {
                    this.isLoading = false
                    this.products = products
                })
                .catch(e => {
                    console.error(e.error)
                    this.isLoading = false
                    this.isError = true
                })
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
        url('assets/fonts/SourceSansPro-Regular.woff2') format('woff2'),
        url('assets/fonts/SourceSansPro-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'),
        url('assets/fonts/SourceSansPro-SemiBold.woff2') format('woff2'),
        url('assets/fonts/SourceSansPro-SemiBold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }


    body {
        background-color: #F2F2F2;

    }

    * {
        box-sizing: border-box;
        font-size: 14px;
        line-height: 24px;
    }

    #app {
        font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    .container {
        max-width: 1140px;
        margin: auto;
    }

    .title {
        padding: 1rem 0;
        margin-bottom: 1rem;
        border-bottom: 2px solid #EDEDED;
        font-size: 2rem;
        line-height: 2.5rem;
    }

    button, select {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }

    input[type="checkbox"] {
        position:absolute;
        left:-9999px;
    }
    label {
        display: inline-block;
        cursor: pointer;
    }
    input[type="checkbox"] + .checkmark:before {
        content: "\00a0";
        display: inline-block;
        height: 1rem;
        width: 1rem;
        margin: 0 .25em 4px 0;
        padding: 0;
        border: 1px solid #C6CBD4;
        border-radius: 1px;
        line-height: 1.1rem;
        vertical-align: bottom;
    }
    input[type="checkbox"]:checked + .checkmark:before {
        background: #00A11E;
        border: 1px solid #00A11E;
        color: #fff;
        content: "\2713";
        text-align: center;
    }
</style>
