<template>
  <div>
    <q-dialog
      v-model="showDialog"
      style="height: 90vh; width: 97vw"
      class="bg-red"
    >
      <q-table
        class="my-sticky-header-table"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
        hide-pagination
        dense
        fullscreen
      >
        <template v-slot:top>
          <div class="column items-center" style="width: 50%">
            <div class="col text-white text-h5">Activo</div>
          </div>
          <div class="column items-center" style="width: 45%">
            <div class="col text-white text-h5">Pasivo + Capital</div>
          </div>
          <q-btn
            color="white"
            flat
            round
            dense
            icon="far fa-times-circle"
            @click="close"
            class="q-ml-md"
          />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props" style="background-color: #0b032d">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-white"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="cuentaActivo"
              :props="props"
              :class="{
                'bg-teal-3': props.row.isAC,
                'bg-teal-5 text-white text-overline text-center':
                  props.row.isHeaderAC,
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-light-green-14 text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              {{ props.row.cuentaActivo }}
            </q-td>
            <q-td
              key="activo"
              :props="props"
              :class="{
                'bg-teal-3': props.row.isAC,
                'bg-teal-5': props.row.isHeaderAC,
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-light-green-14': props.row.isTotalBalance,
              }"
            >
              {{ props.row.sub_activo }}
              <q-popup-edit
                @save="verificarTipo(props.row.isAC ? 'AC' : 'ANC')"
                v-model="props.row.sub_activo"
                v-slot="scope"
                buttons
              >
                <q-input type="number" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td
              key="activoTotal"
              :props="props"
              :class="{
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-light-green-14 text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              {{ props.row.total_activo }}
            </q-td>
            <q-td
              key="cuentaPasivo"
              :props="props"
              :class="{
                'bg-orange-3': props.row.isPV,
                'bg-purple-13 text-white text-overline text-center':
                  props.row.isSubTotalPV || props.row.isHeaderPV,
                'bg-purple-9 text-white text-overline text-center':
                  props.row.isTotalPV,
                'bg-lime-8': props.row.isCS,
                'bg-lime-10': props.row.isPT,
                'bg-lime-10 text-white text-overline text-center':
                  props.row.isTotalCS,
                'bg-brown text-white text-overline text-center':
                  props.row.isTotalPT || props.row.isHeaderPT,
                'bg-light-green-14 text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              <div class="text-pre-wrap">{{ props.row.cuentaPasivo }}</div>
            </q-td>
            <q-td
              key="pasivo"
              :props="props"
              :class="{
                'bg-orange-3': props.row.isPV,
                'bg-purple-13': props.row.isHeaderPV || props.row.isSubTotalPV,
                'bg-purple-9': props.row.isTotalPV,
                'bg-lime-8': props.row.isCS,
                'bg-lime-10': props.row.isTotalCS || props.row.isPT,
                'bg-brown': props.row.isTotalPT || props.row.isHeaderPT,
                'bg-light-green-14': props.row.isTotalBalance,
              }"
            >
              {{ props.row.sub_pasivo }}
              <q-popup-edit
                v-model="props.row.sub_pasivo"
                v-slot="scope"
                buttons
                @save="
                  verificarTipo(
                    props.row.isPC
                      ? 'PC'
                      : props.row.isPNC
                      ? 'PNC'
                      : props.row.isCS
                      ? 'CS'
                      : 'PT'
                  )
                "
              >
                <q-input type="number" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td
              key="pasivoTotal"
              :props="props"
              :class="{
                'bg-purple-13 text-white text-overline text-center':
                  props.row.isSubTotalPV,
                'bg-purple-9 text-white text-overline text-center':
                  props.row.isTotalPV,
                'bg-lime-10 text-white text-overline text-center':
                  props.row.isTotalCS || props.row.isPT,
                'bg-brown text-white text-overline text-center':
                  props.row.isTotalPT,
                'bg-light-green-14 text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              {{ props.row.total_pasivo }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useEventsBus from "../eventBus";

const props = defineProps({
  show: Boolean,
});
const { bus } = useEventsBus();
const showDialog = ref(props.show);

const initialPagination = ref({
  rowsNumber: 10,
});

const columns = [
  {
    name: "cuentaActivo",
    label: "Cuenta",
    align: "left",
    field: (row) => row.cuentaActivo,
  },
  {
    name: "activo",
    label: "Monto",
    align: "center",
    field: (row) => row.sub_activo,
    format: (val) => `$${val}`,
  },
  {
    name: "activoTotal",
    label: "Total",
    align: "center",
    field: (row) => row.total_activo,
    format: (val) => `$${val}`,
  },
  {
    name: "cuentaPasivo",
    label: "Cuenta",
    align: "left",
    field: (row) => row.cuentaPasivo,
  },
  {
    name: "pasivo",
    label: "Monto",
    align: "center",
    field: (row) => row.sub_pasivo,
    format: (val) => `$${val}`,
  },
  {
    name: "pasivoTotal",
    label: "Total",
    align: "center",
    field: (row) => row.total_pasivo,
    format: (val) => `$${val}`,
  },
];
const typeChanged = ref("");
let rows = ref([]);

// Indice de fila donde se encuentran las cantidades calculadas
let rowTotaclActivoCorriente = 0;
let rowTotalActivoNoCorriente = 0;
let rowTotalActivos = 0;
let rowTotalPasivoCorriente = 0;
let rowTotalPasivoNoCorriente = 0;
let rowTotalPasivos = 0;
let rowTotalCapitalSocial = 0;
let rowTotalPatrimonio = 0;
let rowTotalPasivoPatrimonio = 0;

let totalActivoCorriente = 0;
let totalActivoNoCorriente = 0;
let totalActivos = 0;
let totalPasivosCorrientes = 0;
let totalPasivosNoCorrientes = 0;
let totalPasivos = 0;
let totalPatrimonio = 0;
let totalPasivosPatrimonio = 0;
let totalCapitalSocial = 0;

function close() {
  showDialog.value = !showDialog.value;
  rows.value = [];
}

function setTotalActivoCorriente(cuentas) {
  let newTotalActivoCorriente = 0;
  console.log("cuentas");
  console.log(cuentas);
  for (const index in cuentas) {
    newTotalActivoCorriente += parseFloat(cuentas[index].sub_activo);
  }
  console.log("nuevo total:  ", newTotalActivoCorriente);
  console.log(rowTotaclActivoCorriente);
  rows.value[rowTotaclActivoCorriente].total_activo =
    newTotalActivoCorriente.toFixed(2);

  setTotalActivos();
  typeChanged.value = "";
}

function setTotalActivoNoCorriente(cuentas) {
  let newTotalActivoNoCorriente = 0;
  for (const index in cuentas) {
    newTotalActivoNoCorriente += parseFloat(cuentas[index].sub_activo);
  }
  rows.value[rowTotalActivoNoCorriente].total_activo =
    newTotalActivoNoCorriente.toFixed(2);

  setTotalActivos();
  typeChanged.value = "";
}

function setTotalActivos() {
  rows.value[rowTotalActivos].total_activo =
    parseFloat(rows.value[rowTotalActivoNoCorriente].total_activo) +
    parseFloat(rows.value[rowTotaclActivoCorriente].total_activo);
}

function setTotalPasivoCorriente(cuentas) {
  let newTotalPasivoCorriente = 0;
  for (const index in cuentas) {
    newTotalPasivoCorriente += parseFloat(cuentas[index].sub_pasivo);
  }
  rows.value[rowTotalPasivoCorriente].total_pasivo =
    newTotalPasivoCorriente.toFixed(2);
  setTotalPasivos();
}

function setTotalPasivoNoCorriente(cuentas) {
  let newTotalPasivoNoCorriente = 0;
  for (const index in cuentas) {
    newTotalPasivoNoCorriente += parseFloat(cuentas[index].sub_pasivo);
  }
  rows.value[rowTotalPasivoNoCorriente].total_pasivo =
    newTotalPasivoNoCorriente.toFixed(2);
  setTotalPasivos();
}

function setTotalPasivos() {
  rows.value[rowTotalPasivos].total_pasivo =
    parseFloat(rows.value[rowTotalPasivoCorriente].total_pasivo) +
    parseFloat(rows.value[rowTotalPasivoNoCorriente].total_pasivo);
  setTotalPasivoPatrimonio();
}

function setTotalCapitalSocial(cuentas) {
  let newTotalCapitalSocial = 0;
  for (const index in cuentas) {
    newTotalCapitalSocial += parseFloat(cuentas[index].sub_pasivo);
  }
  rows.value[rowTotalCapitalSocial].total_pasivo =
    newTotalCapitalSocial.toFixed(2);
  setTotalPatrimonio();
}

function setTotalPatrimonio() {
  let newTotalPatrimonio = 0;
  for (let i = rowTotalCapitalSocial; i < rowTotalPatrimonio; i++) {
    newTotalPatrimonio += parseFloat(rows.value[i].total_pasivo);
  }
  rows.value[rowTotalPatrimonio].total_pasivo = newTotalPatrimonio;
  setTotalPasivoPatrimonio();
}

function setTotalPasivoPatrimonio() {
  rows.value[rowTotalPasivoPatrimonio].total_pasivo =
    parseFloat(rows.value[rowTotalPasivos].total_pasivo) +
    parseFloat(rows.value[rowTotalPatrimonio].total_pasivo);
}

watch(
  () => bus.value.get("sendBalance"),
  (val) => {
    console.log("valores de las filas   ");
    console.log(rows.value);
    // numero total de cuentas para el lado izquierdo (ACTIVOS)
    const rowsIzq =
      val[0].activo.activo_corriente.size +
      val[0].activo.activo_no_corriente.size +
      3;
    // numero total de cuentas para el lado derecho (PASIVO + CAPITAL)
    const rowsDer =
      val[0].pasivo.pasivo_corriente.size +
      val[0].pasivo.pasivo_no_corriente.size +
      Object.keys(val[0].patrimonio.get("sub_capital_social")[0]).length +
      (val[0].patrimonio.size - 1) +
      12;

    // DETERMINANDO CUAL LADO TIENE MAS CUENTAS
    const mayor = rowsDer > rowsIzq ? rowsDer : rowsIzq;
    // DIMENSIONANDO EL ARRAY DE ROWS CON EL NUMERO MAYOR DE CUENTAS
    for (let i = 0; i < mayor; i++) {
      rows.value.push({});
    }

    // LLENANDO EL LADO IZQUIERDO DEL BALANCE
    let index = 0;
    rows.value[index].cuentaPasivo = "PASIVOS CORRIENTES";
    rows.value[index].isHeaderPV = true;
    rows.value[index].cuentaActivo = "ACTIVOS CORRIENTES";
    rows.value[index].isHeaderAC = true;
    index += 1;
    for (const [cuenta, monto] of val[0].activo.activo_corriente) {
      rows.value[index].cuentaActivo = cuenta;
      rows.value[index].sub_activo = monto;
      rows.value[index].isAC = true;
      totalActivoCorriente += monto;
      index += 1;
    }
    rowTotaclActivoCorriente = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVO CORRIENTE";
    rows.value[index].isSubTotalAC = true;
    rows.value[index].total_activo = totalActivoCorriente;
    index += 2;
    rows.value[index].cuentaActivo = "ACTIVOS NO CORRIENTES";
    rows.value[index].isHeaderAC = true;
    index += 1;
    for (const [cuenta, monto] of val[0].activo.activo_no_corriente) {
      rows.value[index].cuentaActivo = cuenta;
      rows.value[index].sub_activo = monto;
      rows.value[index].isAC = true;
      totalActivoNoCorriente += monto;
      index += 1;
    }
    rowTotalActivoNoCorriente = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVO NO CORRIENTE";
    rows.value[index].isSubTotalAC = true;
    rows.value[index].total_activo = totalActivoNoCorriente;
    index += 1;

    // LLENANDO EL LADO DERECHO DEL BALANCE
    index = 1;
    for (const [cuenta, monto] of val[0].pasivo.pasivo_corriente) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = monto;
      rows.value[index].isPC = true;
      rows.value[index].isPV = true;
      index += 1;
      totalPasivosCorrientes += monto;
    }
    rowTotalPasivoCorriente = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS CORRIENTES";
    rows.value[index].isSubTotalPV = true;
    rows.value[index].total_pasivo = totalPasivosCorrientes;
    index += 2;
    rows.value[index].cuentaPasivo = "PASIVOS NO CORRIENTES";
    rows.value[index].isHeaderPV = true;
    index += 1;
    for (const [cuenta, monto] of val[0].pasivo.pasivo_no_corriente) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = monto;
      rows.value[index].isPNC = true;
      rows.value[index].isPV = true;
      index += 1;
      totalPasivosNoCorrientes += monto;
    }
    rowTotalPasivoNoCorriente = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS NO CORRIENTES";
    rows.value[index].total_pasivo = totalPasivosNoCorrientes;
    rows.value[index].isSubTotalPV = true;
    index += 1;
    rowTotalPasivos = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS";
    rows.value[index].total_pasivo =
      totalPasivosCorrientes + totalPasivosNoCorrientes;
    rows.value[index].isTotalPV = true;
    index += 2;

    rows.value[index].cuentaPasivo = "PATRIMONIO Y RESERVAS";
    rows.value[index].isHeaderPT = true;
    index += 1;
    for (const [cuenta, monto] of val[0].patrimonio.get("sub_capital_social")) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = monto;
      rows.value[index].isCS = true;
      index += 1;
      totalCapitalSocial += monto;
    }
    val[0].patrimonio.delete("sub_capital_social");
    rowTotalCapitalSocial = index;
    rows.value[index].cuentaPasivo = "Total Capital Social";
    rows.value[index].isTotalCS = true;
    rows.value[index].total_pasivo = totalCapitalSocial;
    index += 1;
    for (const [cuenta, monto] of val[0].patrimonio) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].total_pasivo = monto;
      rows.value[index].isPT = true;
      index += 1;
      totalPatrimonio += monto;
    }
    totalPatrimonio += totalCapitalSocial;
    rowTotalPatrimonio = index;
    rows.value[index].cuentaPasivo = "TOTAL PATRIMONIO";
    rows.value[index].isTotalPT = true;
    rows.value[index].total_pasivo = totalPatrimonio;
    index += 2;
    rowTotalActivos = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVOS";
    rows.value[index].isTotalBalance = true;
    rows.value[index].total_activo =
      totalActivoCorriente + totalActivoNoCorriente;
    rowTotalPasivoPatrimonio = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS Y PATRIMONIO";
    rows.value[index].isTotalBalance = true;
    rows.value[index].total_pasivo =
      totalPatrimonio + totalPasivosCorrientes + totalPasivosNoCorrientes;
  }
);
watch(rows.value, () => {
  console.log("Ha cambiado el balance");
  if (typeChanged.value === "AC") {
    console.log("es AC");
    setTotalActivoCorriente(rows.value.filter((cuenta) => cuenta.isAC));
  } else if (typeChanged.value === "ANC") {
    setTotalActivoNoCorriente(rows.value.filter((cuenta) => cuenta.isANC));
  } else if (typeChanged.value === "PC") {
    setTotalPasivoCorriente(rows.value.filter((cuenta) => cuenta.isPC));
  } else if (typeChanged.value === "PNC") {
    setTotalPasivoNoCorriente(rows.value.filter((cuenta) => cuenta.isPNC));
  } else if (typeChanged.value === "CS") {
    setTotalCapitalSocial(rows.value.filter((cuenta) => cuenta.isCS));
  } else if (typeChanged.value === "PT") {
    set;
  }
});
function verificarTipo(cuenta) {
  console.log("verificando.....");
  typeChanged.value = cuenta;
  console.log(cuenta);
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 100%

  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #0b032d

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0
</style>
