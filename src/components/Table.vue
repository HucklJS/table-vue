<template>
    <table>
        <thead>
            <tr>
                <th><input type="checkbox" hidden></th>
                <th>Product (100g serving)</th>
                <th>Calories</th>
                <th>Fat (g)</th>
                <th>Carbs (g)</th>
                <th>Protein (g)</th>
                <th>Iron (%)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input type="checkbox"></td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
            </tr>
            <tr>
                <td><input type="checkbox"></td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
            </tr>
            <tr>
                <td><input type="checkbox"></td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        // name: FiltersBar
    }
</script>


<style scoped>
    table {
        width: 100%;
        background-color: #FFFFFF;
        border-collapse: collapse;
    }
    tr {
        height: 50px;
        text-align: left;
    }

    tbody tr:nth-child(even) {
        background-color: #F8F9FA;
    }

    tbody tr:hover {
        background-color: rgba(0, 161, 30, 0.07);;
    }

    th {
        /*width: 140px;*/
        text-align: left;
        border-bottom: 1px solid #EDEDED;
    }
    th, td {
        font-size: 14px;
        line-height: 24px;
    }
    input {
        margin-left: 2rem;
        vertical-align: middle;
    }
    /*table, th, td {*/
    /*    border: 1px solid black;*/
    /*}*/
</style>