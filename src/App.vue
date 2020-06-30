<template>
    <div id="app">
        <div class="container">
            <h1 class="title">Table UI</h1>
            <Loader v-if="isLoading"/>
            <Error v-else-if="isError"/>
            <template v-else>
                <FiltersBar/>
                <p v-if="isAllProductPropsExcluded" class="no-table">You should on at least one product prop</p>
                <Table v-else/>
            </template>
        </div>
    </div>
</template>

<script>
    import FiltersBar from './components/FiltersBar.vue'
    import Table from './components/Table'
    import Error from "./components/Error"
    import Loader from "./components/Loader"
    import {mapActions, mapGetters, mapState} from "vuex"

    export default {
        name: 'App',
        components: {
            FiltersBar,
            Table,
            Error,
            Loader
        },
        computed: {
            ...mapState([
                'isError',
                'isLoading',
            ]),
            ...mapGetters([
                'isAllProductPropsExcluded',
            ]),
        },
        methods: {
            ...mapActions([
                'getProductsFromApi',
            ]),
        },
        created() {
            this.getProductsFromApi()
        }
    }
</script>

<style>
    @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
        url('assets/fonts/SourceSansPro-Regular.woff2') format('woff2'),
        url('assets/fonts/SourceSansPro-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro SemiBold'), local('SourceSansPro-SemiBold'),
        url('assets/fonts/SourceSansPro-SemiBold.woff2') format('woff2'),
        url('assets/fonts/SourceSansPro-SemiBold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }


    body {
        background-color: #F2F2F2;

    }

    * {
        box-sizing: border-box;
        font-size: 14px;
        line-height: 24px;
    }

    #app {
        font-family: Source Sans Pro, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding-top: 60px;
        padding-bottom: 100px;
    }

    .container {
        max-width: 1140px;
        margin: auto;
    }

    .title {
        padding: 1rem 0;
        margin-bottom: 1rem;
        border-bottom: 2px solid #EDEDED;
        font-size: 2rem;
        line-height: 2.5rem;
    }

    button, select {
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
    }

    input[type="checkbox"] {
        position:absolute;
        left:-9999px;
    }
    label {
        display: inline-block;
        cursor: pointer;
    }
    input[type="checkbox"] + .checkmark:before {
        content: "\00a0";
        display: inline-block;
        height: 1rem;
        width: 1rem;
        margin: 0 .25em 4px 0;
        padding: 0;
        border: 1px solid #C6CBD4;
        border-radius: 1px;
        line-height: 1.1rem;
        vertical-align: bottom;
    }
    input[type="checkbox"]:checked + .checkmark:before {
        background: #00A11E;
        border: 1px solid #00A11E;
        color: #fff;
        content: "\2713";
        text-align: center;
    }
</style>
