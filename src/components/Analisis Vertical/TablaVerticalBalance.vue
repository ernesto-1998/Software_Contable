<template>
    <div class="vertical-container">
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
                <tr class="table-row">
                    <td class="table-ceil" v-for="(item, index) in props.rowsActivoCorriente" :key="index">
                        <span>{{ item }}</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    title: String,
    columns: Array,
    rowsActivoCorriente: Array,
    rowsActivoNoCorriente: Array,
    rowsPasivoCorriente: Array,
    rowsPasivoNoCorriente: Array,
    rowsPatrimonio: Array,
});

</script>

<style>
    
</style>