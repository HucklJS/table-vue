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

                        :selected-products-per-page="selectedProductsPerPage"
                        @on-change-selected-products-per-page="onChangeSelectedProductsPerPage"

                        :products-amount="products.length"
                        :products-start-from="productsStartFrom"
                        :products-end-to="productsEndTo"

                        @change-current-page="changeCurrentPage"
                />
                <Table
                        :product-props="productProps"
                        :filtered-products="productsOnPage"
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
                    {name: 'product', value: 'Product (100g serving)', isActive: true, id: 1},
                    {name: 'calories', value: 'Calories', isActive: false, id: 2},
                    {name: 'fat', value: 'Fat (g)', isActive: false, id: 3},
                    {name: 'carbs', value: 'Carbs (g)', isActive: false, id: 4},
                    {name: 'protein', value: 'Protein (g)', isActive: false, id: 5},
                    {name: 'iron', value: 'Iron (%)', isActive: false, id: 6}
                ],
                columns: ['product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
                isError: false,
                isLoading: true,
                selectedProductsPerPage: '10',
                currentPage: 0
            }
        },
        computed: {
            productsOnPage() {
                const correction = this.currentPage * this.selectedProductsPerPage
                return this.products.slice(
                    correction,
                    Number(this.selectedProductsPerPage) + correction
                )
            },
            productsStartFrom() {
                return this.currentPage * this.selectedProductsPerPage + 1
            },
            productsEndTo() {
                const productsAmount = this.products.length
                const possibleValue = (this.currentPage  + 1) * this.selectedProductsPerPage

                return (productsAmount > possibleValue)
                    ? possibleValue
                    : productsAmount
            }
        },
        methods: {
            chooseFirstColumn(e) {
                const target = e.target.closest('button')
                if (!target) return

                const productProps = this.productProps
                // sort to save order
                productProps.sort((a, b) => a.id - b.id)
                // find index of choosen prop
                const propIndex = productProps.findIndex(
                    prop => prop.name === target.dataset.propName
                )
                // change active condition
                productProps.forEach((prop, i) => {
                    prop.isActive = i === propIndex
                })
                // make new array with new first prop
                this.productProps = [
                    productProps[propIndex],
                    ...productProps.slice(0, propIndex),
                    ...productProps.slice(propIndex + 1)
                ]
            },
            onChangeSelectedProductsPerPage(value) {
                this._changeSelectedProductsPerPage(value)
                this.changeCurrentPage('reset')
            },
            _changeSelectedProductsPerPage(value) {
                this.selectedProductsPerPage = value
            },
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

    .container .title {
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
        color: #00A11E;
    }
</style>
