<template>
    <table>
        <thead>
            <tr @click="$emit('change-sort-order', $event)">
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
        <tbody>
            <tr
                v-for="product in filteredProducts"
                :key="product.id"
            >
                <td>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox">
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
                    <div class="delete">
                        <button>
                            <img src="../assets/svg/Group.svg" alt="cart">delete
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: {
            activeProductProp: {
                type: String
            },
            sortOrder: String,
            filteredProducts: {
                type: Array,
                required: true
            },
            filteredAndSortedProductProps: {
                type: Array
            }
        }
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

    .delete {
        display: flex;
        justify-content: flex-end;
        margin-right: 2rem;
    }
    .delete button {
        visibility: hidden;
        display: flex;
        align-items: center;
        color: #5B5E77;
    }
    tbody tr:hover .delete button {
        visibility: visible;
    }

    label {
        margin-left: 2rem;
    }
</style>