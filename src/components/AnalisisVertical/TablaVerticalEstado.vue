<template>
    <div class="vertical-table_container">
        <div class="title-container">
            <span>Estado de Resultados</span>
        </div>
        <div class="subtitle-container">
            <span>DEL SUR S.A de C.V</span>
        </div>   
        <div class="table-container">
            <table class="table-content">
                <tr class="table-head bg-secondary">
                    <th class="table-head_titles table-ceil" align="center" v-for="(item, index) in props.columnsTitulo" :key="index">
                        <span>{{ item }}</span>
                    </th>
                </tr>
                <tr class="table-row" v-for="(item, index) in props.rowsAnalisisEstado" :key="index">
                    <td class="table-ceil bg-accent" align="center" v-for="(childItem, index) in item" :key="index">
                        <span class="conditionalBinding" v-if="(childItem === 'PRODUCTOS DE OPERACIÓN') || (childItem === 'MARGEN COMPRA VENTA DE ENERGIA') || (childItem === 'UTILIDAD DE OPERACIÓN') || (childItem === 'UTILIDAD ANTES DE IMPUESTOS Y RESERVAS') || (childItem === 'UTILIDAD POR DISTRIBUIR')">{{ childItem }} </span>
                        <span v-else>{{ childItem }} </span>
                    </td>
                </tr>
            </table>
        </div>     
    </div>
</template>
<script setup>

const props = defineProps({
    columnsTitulo: Array,
    rowsAnalisisEstado: Array,
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
  overflow: auto;
  height: 25.5rem;
}

.table-content {
  max-width: 100%;
}

.table-head_titles {
  color: var(--table-color);
}

/* .table-row {
} */

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