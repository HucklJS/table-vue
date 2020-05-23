<template>
    <div class="filters">
        <div class="sorting-btns">
            <span>Sorting by:</span>
            <button class="active">Product (100g serving)</button>
            <button >Calories</button>
            <button >Fat (g)</button>
            <button >Carbs (g)</button>
            <button >Protein (g)</button>
            <button >Iron (%)</button>
        </div>
        <div class="other-elements">
            <button class="delete">Delete</button>
            <select name="per-page" id="per-page">
                <option value="5">5 Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="15">15 Per Page</option>
            </select>
<!--            не получилость вставить картину вместо знаков больше и меньше-->
            <button class="nav-arrow left-arrow"></button>
            <span>1-10 of 25</span>
            <button class="nav-arrow right-arrow"></button>
            <select name="columns" id="choose-columns">
                <option value="6">6 columns selected</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        // name: FiltersBar
    }
</script>


<style scoped>
    .filters {
        display: flex;
        justify-content: space-between;
        height: 32px;
        margin-bottom: 1rem;
    }


    .sorting-btns, .other-elements{
        display: flex;
        align-items: center;
    }

    .sorting-btns button, .other-elements button, .other-elements select {
        height: 100%;
    }

    .sorting-btns button.active {
        padding: 3px 6px;
        margin-left: .5rem;
        border-radius: 2px;
        background-color: #00A11E;
        color: #FFFFFF;
    }

    .other-elements button.delete {
        padding: 2px 12px;
        margin-right: 16px;
        border: 1px solid #C6CBD4;
        border-radius: 2px;
        color: #5B5E77;
    }
    .other-elements select {
        appearance: none;
        padding: 4px 25px 4.5px 10px;
        margin-right: 16px;
        border: 1px solid #C6CBD4;
        border-radius: 2px;
        color: #5B5E77;
        background: transparent url("../assets/svg/Down-arrow.svg") no-repeat right;
        background-position-x: calc(100% - 10px);
    }

    .other-elements select::-ms-expand{
        display: none;
    }

    .other-elements select#choose-columns {
        margin-right: 0;
    }

    .other-elements button.nav-arrow {
        padding: 2px 12px;
        margin: 0 8px;
        border: 1px solid #D5DAE0;
        border-radius: 2px;
    }
    .other-elements button.left-arrow {
        width: 32px;
        background: transparent url("../assets/svg/Left.svg") no-repeat center;
        background-size: cover;
    }
    .other-elements button.right-arrow {
        width: 32px;
        margin-right: 16px;
        background: transparent url("../assets/svg/Right.svg") no-repeat center;
        background-size: cover;
    }
</style>