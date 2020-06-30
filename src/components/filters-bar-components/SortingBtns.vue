<template>
    <div class="sorting-btns" @click="onChooseFirstColumn($event)">
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
</template>

<script>
    import {mapActions, mapState} from "vuex"

    export default {
        computed: {
            ...mapState([
                'activeProductProp',
                'productProps',
                'excludedProductProps',
            ])
        },
        methods: {
            ...mapActions([
                'chooseFirstColumn',
            ]),
            onChooseFirstColumn(e) {
                const target = e.target.closest('button')
                if (!target) return

                this.chooseFirstColumn(target.dataset.propName)
            },
        }
    }
</script>

<style scoped>
    .sorting-btns{
        display: flex;
        align-items: center;
    }

    .text {
        display: inline-block;
        /*???????????*/
        margin-right: .5rem;
    }

    button {
        /*height: 100%;*/
        align-self: stretch;
        border-radius: 2px;
    }

    button.active {
        /*padding: 3px 6px;*/
        background-color: #00A11E;
        color: #FFFFFF;
        cursor: default;
    }

    :disabled {
        opacity: .3;
        cursor: default;
    }
</style>