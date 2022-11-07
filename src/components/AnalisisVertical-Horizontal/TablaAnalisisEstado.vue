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
          <th
            class="table-head_titles table-ceil"
            align="center"
            v-for="(item, index) in props.columnsTitulo"
            :key="index"
          >
            <span>{{ item }}</span>
          </th>
        </tr>
        <tr
          class="table-row"
          v-for="(item, index) in props.rowsAnalisisEstado"
          :key="index"
        >
          <td
            class="table-ceil bg-accent"
            align="center"
            v-for="(childItem, index) in item"
            :key="index"
          >
            <span
              class="conditionalBinding"
              v-if="
                childItem === 'Ingresos' ||
                childItem === 'UTILIDAD DE OPERACIÓN' ||
                childItem === 'UTILIDAD ANTES DE IMPUESTOS Y RESERVAS' ||
                childItem === 'UTILIDAD NETA' ||
                childItem === 'RESULTADOS INTEGRALES DEL AÑO'
              "
              >{{ childItem }}
            </span>

            <span
              class="conditionalBinding2"
              v-else-if="
                childItem === 'Costos Y Gastos de Operacion' ||
                childItem ===
                  'Otros resultados integrales, netos de impuesto sobre la renta' ||
                childItem === 'Utilidad por acción, compañía subsidiaria' ||
                childItem === 'Utilidad por acción, compañía controladora' ||
                childItem === 'Total Costos y Gastos de Operación'
              "
              >{{ childItem }}
            </span>

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
