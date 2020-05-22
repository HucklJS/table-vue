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
            <button class="nav-arrow left-arrow">&lt;</button>
            <span>1-10 of 25</span>
            <button class="nav-arrow right-arrow">&gt;</button>
            <select name="columns" id="columns">
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
        margin-bottom: 1rem;
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
        margin-right: .75rem;
        border: 1px solid #C6CBD4;
        border-radius: 2px;
        color: #5B5E77;
    }
    .other-elements button.nav-arrow {
        padding: 2px 12px;
        border: 1px solid #D5DAE0;
        border-radius: 2px;
    }
</style>