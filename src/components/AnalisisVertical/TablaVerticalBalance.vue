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
          <th
            class="table-head_titles table-ceil"
            align="center"
            v-for="(item, index) in props.columnsActivo"
            :key="index"
          >
            <span>{{ item }}</span>
          </th>
        </tr>
        <tr
          class="table-row"
          v-for="(item, index) in props.rowsActivo"
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
                childItem === 'Total Activo Corriente' ||
                childItem === 'Total Activo No Corriente' ||
                childItem === 'Total Activo'
              "
              >{{ childItem }}
            </span>
            <span v-else>{{ childItem }} </span>
          </td>
        </tr>
        <tr class="table-head bg-secondary">
          <th
            class="table-head_titles table-ceil"
            align="center"
            v-for="(item, index) in props.columnsPasivo"
            :key="index"
          >
            <span>{{ item }}</span>
          </th>
        </tr>
        <tr
          class="table-row"
          v-for="(item, index) in props.rowsPasivo"
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
                childItem === 'Total Pasivo Corriente' ||
                childItem === 'Total Pasivo No Corriente' ||
                childItem === 'Total Pasivo'
              "
              >{{ childItem }}
            </span>
            <span v-else>{{ childItem }} </span>
          </td>
        </tr>
        <tr class="table-head bg-secondary">
          <th
            class="table-head_titles table-ceil"
            align="center"
            v-for="(item, index) in props.columnsPatrimonio"
            :key="index"
          >
            <span>{{ item }}</span>
          </th>
        </tr>
        <tr
          class="table-row"
          v-for="(item, index) in props.rowsPatrimonio"
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
                childItem === 'Total Patrimonio Neto' ||
                childItem === 'Total Pasivo + Patrimonio Neto' ||
                childItem === 'sub_capital_social'
              "
              >{{
                childItem === "sub_capital_social"
                  ? "Sub Capital Social"
                  : childItem
              }}
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
  title: String,
  columnsActivo: Array,
  columnsPasivo: Array,
  columnsPatrimonio: Array,
  rowsActivo: Array,
  rowsPasivo: Array,
  rowsPatrimonio: Array,
  generador: Boolean,
});
</script>

<style scoped>
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
