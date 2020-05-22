<template>
    <div id="app">
        <div class="container">
            <h1>Table UI</h1>
            <FiltersBar></FiltersBar>
            <Table></Table>
        </div>
    </div>
</template>

<script>
    import FiltersBar from './components/FiltersBar.vue'
    import Table from './components/Table'

    export default {
        name: 'App',
        components: {
            FiltersBar,
            Table
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    .container {
      max-width: 1140px;
      margin: auto;
    }
</style>
