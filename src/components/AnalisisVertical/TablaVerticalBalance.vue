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
                <tr class="table-head">
                    <th class="table-head_titles" v-for="(item, index) in props.columns" :key="index">
                        <span>{{ item }}</span>
                    </th>
                </tr>
                <!-- <tr class="table-row">
                    <td class="table-ceil" v-for="(item, index) in props.rowsActivo" :key="index">
                        <span>{{ item }}</span>
                    </td>
                </tr>
                <tr class="table-head">
                    <th class="table-head-titles">
                        <span>Pasivo</span>
                    </th>
                </tr>
                <tr class="table-row">
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
        width: 90%;
        margin: auto;
    }

    .table-container {
        overflow-x: auto;
    }
</style>