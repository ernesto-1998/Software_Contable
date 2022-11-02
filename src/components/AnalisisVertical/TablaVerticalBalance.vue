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
                        <span class="conditionalBinding" v-if="(childItem === 'Total Activo Corriente') || (childItem === 'Total Activo No Corriente') || (childItem === 'Total Activo')">{{ childItem }} </span>
                        <span v-else>{{ childItem }} </span>
                    </td>
                </tr>
                <tr class="table-head bg-secondary">
                    <th class="table-head_titles table-ceil">
                        <span>PASIVO</span>
                    </th>
                </tr>
                <tr class="table-row" v-for="(item, index) in props.rowsPasivo" :key="index">
                    <td class="table-ceil bg-accent" align="center" v-for="(childItem, index) in item" :key="index">
                        <span class="conditionalBinding" v-if="(childItem === 'Total Pasivo Corriente') || (childItem === 'Total Pasivo No Corriente') || (childItem === 'Total Pasivo')">{{ childItem }} </span>
                        <span v-else>{{ childItem }} </span>
                    </td>
                </tr> 
                <!--<tr class="table-head">
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
        display: grid;
        justify-content: center;
        /* width: 98%; */
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
        text-transform: uppercase;
        font-weight: bold;
    }
</style>