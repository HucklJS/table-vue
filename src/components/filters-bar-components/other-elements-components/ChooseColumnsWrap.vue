<template>
    <div class="choose-columns-wrap">
        <button
                class="choose-columns"
                @click="onToggleSelectExpandedVisible()"
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
                                @change="onToggleAllProductPropsSelected()"
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
                               @change="onToggleExcludedProductProp($event)"
                        >
                        <span class="checkmark"></span>
                        {{productProp.name}}
                    </label>
                </div>
            </div>
            <slot>DeleteModal</slot>
        </div>
        <!--  .wrapper-->
    </div>
    <!--    .choose-columns-wrap            -->
</template>


<script>
    import {mapActions, mapGetters, mapState} from "vuex"

    export default {
        computed: {
            ...mapState([
                'productProps',
                'excludedProductProps',
                'isSelectExpandedVisible'
            ]),
            ...mapGetters([
                'isAllProductPropsSelected',
            ]),
        },
        methods: {
            ...mapActions([
                'toggleExcludedProductProp',
                'toggleAllProductPropsSelected',
                'toggleSelectExpandedVisible',
            ]),

            // change checkboxes with product props
            onToggleExcludedProductProp(e) {
                if (!e.target.closest('input')) return
                const propName = e.target.value

                this.toggleExcludedProductProp(propName)
            },
            //end change checkboxes with product props

            onToggleAllProductPropsSelected() {
                this.toggleAllProductPropsSelected()
            },

            onToggleSelectExpandedVisible() {
                this.toggleSelectExpandedVisible()
            },
        },
    }
</script>

<style scoped>
    button {
        height: 100%;
        border: 1px solid #D5DAE0;
        border-radius: 2px;
    }

    button.choose-columns {
        padding: 4px 27px 4.5px 10px;
        background: transparent url("../../../assets/svg/Select-arrow.svg") no-repeat right;
        background-position-x: calc(100% - 10px);
        background-position-y: calc(100% - 11.3px);
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
</style>