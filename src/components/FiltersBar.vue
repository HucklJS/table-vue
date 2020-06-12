<template>
    <div class="filters">
        <div class="sorting-btns" @click="$emit('choose-first-column', $event)">
            <span class="text">Sorting by:</span>
            <button
                    v-for="productProp in productProps"
                    :key="productProp.id"
                    :class="{active: productProp.name === activeProductProp}"
                    :data-prop-name="productProp.name"
                    :disabled="excludedProductProps.includes(productProp.name)"
            >
                {{productProp.value}}
            </button>
        </div>

        <div class="other-elements">
            <button :class="['delete', idProductsForDelete.length && !isDeleteConfirmVisible && 'active']"
                    :disabled="!idProductsForDelete.length || isDeleteConfirmVisible"
                    @click="$emit('show-delete-confirm')"
            >
                Delete {{idProductsForDelete.length > 1 && !isDeleteConfirmVisible
                            ? `(${idProductsForDelete.length})`
                            : null
                }}
            </button>
            <select
                    name="per-page"
                    id="per-page"
                    :value="selectedProductsPerPage"
                    @input="$emit('on-change-selected-products-per-page', $event.target.value)"
            >
                <option value="10">10 Per Page</option>
                <option value="15">15 Per Page</option>
                <option value="20">20 Per Page</option>
            </select>
            <button
                    class="nav-arrow left-arrow"
                    :disabled="productsStartFrom === 1"
                    @click="$emit('change-current-page', 'back')"
            />
            <span>{{productsStartFrom}}-{{productsEndTo}} of {{productsAmount}}</span>
            <button
                    class="nav-arrow right-arrow"
                    :disabled="productsEndTo === productsAmount"
                    @click="$emit('change-current-page', 'forward')"
            />
            <div class="choose-columns-wrap">
                <button
                        class="choose-columns"
                        @click="$emit('toggle-select-expanded-visible')"
                >
                    6 columns selected
                </button>

                <div class="wrapper">
                    <div class="select-expanded" v-show="isSelectExpandedVisible">
                        <div class="checkbox" >
                            <label>
                                <input
                                        type="checkbox"
                                        :checked="isAllProductPropsSelected"
                                        @change="$emit('toggle-all-product-props-selected')"
                                >
                                <span class="checkmark"></span>
                                Select All
                            </label>
                        </div>
                        <div
                                v-for="productProp in productProps"
                                :key="productProp.id"
                                class="checkbox"
                        >
                            <label>
                                <input type="checkbox"
                                       :checked="!excludedProductProps.includes(productProp.name)"
                                       :value="productProp.name"
                                       @change="$emit('toggle-exclude-product-props' , $event)"
                                >
                                <span class="checkmark"></span>
                                {{productProp.name}}
                            </label>
                        </div>
                    </div>
                    <!--    .select-expanded            -->
                    <div class="delete-confirm-popup"
                         v-show="isDeleteConfirmVisible"
                    />
                    <!--  .delete-confirm-popup       -->
                    <div
                            class="delete-confirm"
                            v-show="isDeleteConfirmVisible"
                            :style="deleteConfirmCoords"
                    >
                        <p class="question">
                            Are you sure you want to delete item{{idProductsForDelete.length > 1 ? 's' : ''}}?
                        </p>
                        <div class="delete-confirm-btns">
                            <button class="cancel" @click="$emit('hide-delete-confirm')">
                                Cancel
                            </button>
                            <button class="confirm active" @click="$emit('remove-products-by-id')">
                                Confirm
                            </button>
                        </div>
                    </div>
                    <!--  .delete-confirm      -->
                </div>
                <!--  .wrapper-->
            </div>
            <!--    .choose-columns-wrap            -->

        </div>

    </div>
</template>

<script>
    export default {
        props: {
            productProps: {
              type: Array,
              required: true
            },
            activeProductProp: {
                type: String
            },
            selectedProductsPerPage: {
                type: String,
                required: true
            },
            productsAmount: {
                type: Number
            },
            productsStartFrom: {
                type: Number
            },
            productsEndTo: {
                type: Number
            },
            isSelectExpandedVisible: {
                type: Boolean
            },
            excludedProductProps: {
                type: Array
            },
            isAllProductPropsSelected: {
                type: Boolean
            },



            isDeleteConfirmVisible: {
                type: Boolean
            },
            deleteConfirmCoords: {
                type: Object
            },
            idProductsForDelete: {
                type: Array
            }
        },
        methods: {

        }
    }
</script>


<style scoped>
    .filters {
        display: flex;
        justify-content: space-between;
        height: 32px;
        margin-bottom: 1rem;
    }

    .sorting-btns,
    .other-elements{
        display: flex;
        align-items: center;
    }

    .sorting-btns button,
    .other-elements button,
    .other-elements select {
        height: 100%;
        border-radius: 2px;
    }

    button.active {
        /*padding: 3px 6px;*/
        background-color: #00A11E;
        color: #FFFFFF;
        cursor: pointer;
    }

    .sorting-btns .text {
        display: inline-block;
        /*???????????*/
        margin-right: .5rem;
    }

    .sorting-btns button.active {
        cursor: default;
    }

    .other-elements button {
        border: 1px solid #D5DAE0;
    }

    .other-elements button.delete {
        padding: 2px 12px;
        margin-right: 16px;
        border: 1px solid #C6CBD4;
        color: #5B5E77;
    }

    :disabled {
        opacity: .3;
        cursor: default;
    }

    .other-elements select,
    .other-elements button.choose-columns {
        padding: 4px 27px 4.5px 10px;
        background: transparent url("../assets/svg/Select-arrow.svg") no-repeat right;
        background-position-x: calc(100% - 10px);
        background-position-y: calc(100% - 11.3px);
    }


    .other-elements select {
        appearance: none;
        margin-right: 16px;
        border: 1px solid #C6CBD4;
        color: #5B5E77;
    }

    .other-elements select::-ms-expand{
        display: none;
    }

    .other-elements button.nav-arrow {
        width: 32px;
        padding: 2px 12px;
        margin: 0 8px;
    }

    .other-elements button.left-arrow {
        margin-left: 0;
        background: transparent url("../assets/svg/Left.svg") no-repeat center;
    }

    .other-elements button.right-arrow {
        margin-right: 16px;
        background: transparent url("../assets/svg/Right.svg") no-repeat center;
    }


    /*6 columns selected*/
    .choose-columns-wrap {
        position: relative;
        height: 100%;
    }

    .wrapper {
        position: absolute;
        width: 207px;
    }

    .select-expanded {
        position: absolute;
        top: 10px;
        left: 1px;
        z-index: 22;
        height: 243px;
        width: 100%;
        padding: 0 20px;
        overflow: auto;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
    }

    .checkbox {
        margin: 12px 0;
    }
    .checkmark {
        margin-top: 2px;
    }

    .delete-confirm-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 33;
        background-color: rgba(0, 0, 0, .13);
    }
    .delete-confirm {
        position: absolute;
        z-index: 44;
        width: 275px;
        right: 0;
        padding: 16px;
        text-align: center;
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
    }
    .delete-confirm .question {
        margin-top: 0;
        margin-bottom: 8px;
    }
    .delete-confirm-btns {
        display: inline-block;
        height: 32px;
    }
    .delete-confirm-btns .confirm {
        margin-left: 16px;
        border: none;
    }
</style>