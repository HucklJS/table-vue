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
                <th></th>
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
                <td><div class="delete"><button><img src="../assets/svg/Group.svg" alt="cart">delete</button></div></td>
            </tr>
            <tr>
                <td><input type="checkbox"></td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
                <td><div class="delete"><button><img src="../assets/svg/Group.svg" alt="cart">delete</button></div></td>
            </tr>
            <tr>
                <td><input type="checkbox"></td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
                <td><div class="delete"><button><img src="../assets/svg/Group.svg" alt="cart">delete</button></div></td>
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
    thead tr {
        border-bottom: 1px solid #EDEDED;
    }

    /*tbody tr:first-child {*/

    /*}*/

    tbody tr:nth-child(even) {
        background-color: #F8F9FA;
    }

    tbody tr:hover {
        background-color: rgba(0, 161, 30, 0.07);
    }


    th {
        /*width: 140px;*/
        text-align: left;
    }
    th, td {

    }

    td:first-child {
        width: 70px;
    }

    td:last-child {
        width: 180px;
    }

    .delete {
        display: flex;
        justify-content: flex-end;
        margin-right: 2rem;
    }
    .delete button {
        visibility: hidden;
        display: flex;
        align-items: center;
        color: #5B5E77;
    }
    tbody tr:hover .delete button {
        visibility: visible;
    }

    input {
        margin-left: 2rem;
        margin-bottom: 5px;
        vertical-align: middle;
    }
    /*table, th, td {*/
    /*    border: 1px solid black;*/
    /*}*/
</style>