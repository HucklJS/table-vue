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
                <td>
                    <div class="checkbox">
                        <input id="checkbox1" type="checkbox">
                        <label for="checkbox1"></label>
                    </div>
                </td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
                <td><div class="delete"><button><img src="../assets/svg/Group.svg" alt="cart">delete</button></div></td>
            </tr>
            <tr>
                <td>
                    <div class="checkbox">
                        <input id="checkbox2" type="checkbox">
                        <label for="checkbox2"></label>
                    </div>
                </td>
                <td>Frozen Yogurt</td>
                <td>125</td>
                <td>342</td>
                <td>651</td>
                <td>987</td>
                <td>437</td>
                <td><div class="delete"><button><img src="../assets/svg/Group.svg" alt="cart">delete</button></div></td>
            </tr>
            <tr>
                <td>
                    <div class="checkbox">
                         <input id="checkbox3" type="checkbox">
                        <label for="checkbox3"></label>
                    </div>
                </td>
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

    .checkbox {
        /*padding-right: 5px;*/
    }
    input[type="checkbox"] {
        position:absolute;
        left:-9999px;
    }
    label {
        display: block;
        margin-left: 2rem;
        cursor: pointer;
    }
    input[type="checkbox"] + label:before {
        content: "\00a0";
        display: inline-block;
        height: 1rem;
        width: 1rem;
        margin: 0 .25em 4px 0;
        padding: 0;
        border: 1px solid #C6CBD4;
        border-radius: 1px;
        line-height: 1.1rem;
        vertical-align: middle;
    }
    input[type="checkbox"]:checked + label:before {
        background: #00A11E;
        border: 1px solid #00A11E;
        color: #fff;
        content: "\2713";
        text-align: center;
    }
</style>