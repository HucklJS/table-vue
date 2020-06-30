<template>
    <div class="delete-modal">
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
                Are you sure you want to delete item{{idsProductsForDelete.length > 1 ? 's' : ''}}?
            </p>
            <div class="delete-confirm-btns">
                <button class="cancel" @click="hideDeleteConfirm()">
                    Cancel
                </button>
                <button class="confirm active" @click="removeProductsById()">
                    Confirm
                </button>
            </div>
        </div>
        <!--  .delete-confirm      -->
    </div>
</template>


<script>
    import {mapActions, mapState} from "vuex"

    export default {
        computed: {
            ...mapState([
                'idsProductsForDelete',
                'deleteConfirmCoords',
                'isDeleteConfirmVisible'
            ])
        },
        methods: {
            ...mapActions([
                'hideDeleteConfirm',
                'removeProductsById'
            ])
        },
    }
</script>

<style scoped>
    button {
        height: 100%;
        border: 1px solid #D5DAE0;
        border-radius: 2px;
    }

    button.active {
        /*padding: 3px 6px;*/
        background-color: #00A11E;
        color: #FFFFFF;
        cursor: pointer;
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
        /*from wrapper - ChooseColumnsWrap*/
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