<template>
    <div class="vertical-table_container">
        <div class="title-container">
            <span>Balance General</span>
        </div>
        <div class="subtitle-container">
            <span>DEL SUR S.A de C.V</span>
        </div>
        <div class="table-container">
            <table class="table-content">
                <tr class="table-head bg-secondary">
                    <th class="table-head_titles table-ceil" align="center" v-for="(item, index) in props.columns" :key="index">
                        <span>{{ item }}</span>
                    </th>
                </tr>
                <tr class="table-row" v-for="(item, index) in props.rowsActivo" :key="index">
                    <td class="table-ceil bg-accent" align="center" v-for="(childItem, index) in item" :key="index">
                        <span>{{ ((childItem === "Total Activo Corriente") || (childItem === "Total No Activo Corriente")) ? childItem.toUpperCase() : childItem }} </span>
                    </td>
                </tr>
                <tr class="table-head bg-secondary">
                    <th class="table-head_titles table-ceil">
                        <span>PASIVO</span>
                    </th>
                </tr>
                <!-- <tr class="table-row">
                    <td class="table-ceil" v-for="(item, index) in props.rowsPasivo" :key="index">
                        <span>{{ item }}</span>
                    </td>
                </tr>  
                <tr class="table-head">
                    <th class="table-head-titles">
                        <span>Patrimonio</span>
                    </th>
                </tr> 
                <tr class="table-row">
                    <td class="table-ceil" v-for="(item, index) in props.rowsPatrimonio" :key="index">
                        <span>{{ item }}</span>
                    </td>
                </tr>                               -->
            </table>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: String,
    columns: Array,
    rowsActivo: Array,
    rowsPasivo: Array,
    rowsPatrimonio: Array,
});

</script>

<style>
    .vertical-table_container {
        width: 98%;
        margin: auto;
    }

    .table-container {
        overflow-x: auto;
        height: 25.5rem;
    }

    .table-head_titles {
        color: var(--table-color);
    }

    .table-row {
    }

    .table-ceil {
        padding: 0.5rem;
    }

    .table-ceil:nth-child(1) {
        min-width: 15rem;
    }

    .conditionalBinding {
        color: var(--table-color);
        text-transform: uppercase;
    }
</style>