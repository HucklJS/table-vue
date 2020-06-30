<template>
    <div class="filters">
        <SortingBtns/>
        <OtherElements/>
    </div>
</template>

<script>
    import SortingBtns from "./filters-bar-components/SortingBtns"
    import OtherElements from "./filters-bar-components/OtherElements"

    export default {
        components: {
            SortingBtns,
            OtherElements
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
</style>