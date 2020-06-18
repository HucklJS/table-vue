<template>
    <table>
        <thead>
            <tr @click="onToggleSortOrder($event)">
                <th><input type="checkbox" hidden></th>
                <th
                        v-for="productProp in filteredAndSortedProductProps"
                        :key="productProp.id"
                >
                    <span
                            :class="[{'active': productProp.name === activeProductProp}, sortOrder]"
                    >
                        {{productProp.value}}
                    </span>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody @click.prevent="onTBodyRowClick($event)">
            <tr
                v-for="product in productsOnPage"
                :key="product.id"
                :data-id="product.id"
                class="tbody-row"
            >
                <td>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" :checked="idsProductsForDelete.includes(product.id)">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </td>
                <td
                        v-for="productProp in filteredAndSortedProductProps"
                        :key="productProp.id"
                >
                    {{product[productProp.name]}}
                </td>
                <td>
                    <div class="delete-wrap">
                        <button class="delete-one">
                            <img src="../assets/svg/Group.svg" alt="cart">delete
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex"

    export default {
        computed: {
            ...mapState([
                'activeProductProp',
                'sortOrder',
                'idsProductsForDelete',
            ]),
            ...mapGetters([
                'productsOnPage',
                'filteredAndSortedProductProps'
            ]),
        },
        methods: {
            ...mapActions([
                'toggleSortOrder',
                'prepareToRemoveOneProduct',
                'toggleIdsProductsForDelete',
            ]),

            onToggleSortOrder(e) {
                const target = e.target.closest('.active')
                if (!target) return

                this.toggleSortOrder()
            },

            onTBodyRowClick(e) {
                const btn = e.target.closest('.delete-one')
                const tr = e.target.closest('.tbody-row')

                if (!btn && !tr) return
                const productId = Number(tr.dataset.id)
                const coordFromTop = tr.getBoundingClientRect().bottom + window.pageYOffset - 180

                if (btn) {
                    this.prepareToRemoveOneProduct({
                        productId,
                        coordFromTop
                    })
                } else {
                    this.toggleIdsProductsForDelete({
                        productId,
                        coordFromTop
                    })
                }
            },

        },
    }
</script>


<style scoped>
    table {
        width: 100%;
        background-color: #FFFFFF;
        border-collapse: collapse;
    }


    tr {
        height: 50px;
        text-align: left;
    }
    thead tr {
        border-bottom: 1px solid #EDEDED;
    }

    tbody tr:nth-child(even) {
        background-color: #F8F9FA;
    }

    tbody tr:hover {
        background-color: rgba(0, 161, 30, 0.07);
        cursor: pointer;
    }


    th {
        /*width: 140px;*/
        text-align: left;
    }
    .active {
        cursor: pointer;
    }
    .active.high-low:after, .active.low-high:after{
        content: '';
        display: inline-block;
        vertical-align: bottom;
        width: 24px;
        height: 24px;
    }
    .active.high-low:after {
        background: transparent url("../assets/svg/down-arrow.svg") no-repeat right;
    }
    .active.low-high:after {
        background: transparent url("../assets/svg/up-arrow.svg") no-repeat right;
    }
    th, td {

    }

    td:first-child {
        width: 70px;
    }

    td:last-child {
        width: 180px;
    }

    .delete-wrap {
        display: flex;
        justify-content: flex-end;
    }
    .delete-wrap button {
        visibility: hidden;
        display: flex;
        margin-right: 2rem;
        align-items: center;
        color: #5B5E77;
    }
    tbody tr:hover .delete-wrap button {
        visibility: visible;
    }

    label {
        margin-left: 2rem;
    }

    .delete-one:hover {
        opacity: .7;
    }
</style>