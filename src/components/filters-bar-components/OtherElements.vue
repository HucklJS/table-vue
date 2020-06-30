<template>
    <div class="other-elements">
        <button :class="['delete', idsProductsForDelete.length && !isDeleteConfirmVisible && 'active']"
                :disabled="!idsProductsForDelete.length || isDeleteConfirmVisible"
                @click="showDeleteConfirm()"
        >
            Delete {{idsProductsForDelete.length > 1 && !isDeleteConfirmVisible
            ? `(${idsProductsForDelete.length})`
            : null
            }}
        </button>
        <select
                name="per-page"
                id="per-page"
                :value="productsPerPage"
                @input="changeProductsPerPage($event.target.value)"
        >
            <option value="10">10 Per Page</option>
            <option value="15">15 Per Page</option>
            <option value="20">20 Per Page</option>
        </select>
        <button
                class="nav-arrow left-arrow"
                :disabled="productsStartFrom === 1"
                @click="changeCurrentPage('back')"
        />
        <span>{{productsStartFrom}}-{{productsEndTo}} of {{productsAmount}}</span>
        <button
                class="nav-arrow right-arrow"
                :disabled="productsEndTo === productsAmount"
                @click="changeCurrentPage('forward')"
        />
        <ChooseColumnsWrap>
            <DeleteModal/>
        </ChooseColumnsWrap>
    </div>
</template>

<script>
    import ChooseColumnsWrap from "./other-elements-components/ChooseColumnsWrap"
    import DeleteModal from "./other-elements-components/DeleteModal"
    import {mapActions, mapGetters, mapState} from "vuex"

    export default {
        components: {
            ChooseColumnsWrap,
            DeleteModal
        },
        computed: {
            ...mapState([
                'productsPerPage',
                // currentPage??
                'currentPage',
                'idsProductsForDelete',
                'isDeleteConfirmVisible'
            ]),
            ...mapGetters([
                'productsAmount',
                'productsStartFrom',
                'productsEndTo',
            ]),
        },
        methods: {
            ...mapActions([
                'changeProductsPerPage',
                'changeCurrentPage',
                'showDeleteConfirm'
            ])
        },
    }
</script>

<style scoped>
    .other-elements{
        display: flex;
        align-items: center;
    }

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

    .other-elements select {
        padding: 4px 27px 4.5px 10px;
        background: transparent url("../../assets/svg/Select-arrow.svg") no-repeat right;
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
        background: transparent url("../../assets/svg/Left.svg") no-repeat center;
    }

    .other-elements button.right-arrow {
        margin-right: 16px;
        background: transparent url("../../assets/svg/Right.svg") no-repeat center;
    }

</style>