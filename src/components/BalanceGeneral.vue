<template>
  <div>
    <q-dialog v-model="showDialog">
      <q-table
        class="my-sticky-header-table"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="initialPagination"
        hide-pagination
        dense
        fullscreen
        scroll-target="body"
      >
        <template v-slot:top>
          <div
            class="column items-center text-white text-subtitle1"
            style="width: 100%"
          >
            DISTRIBUIDORA DE ELECTRICIDAD DEL SUR, S.A DE C.V.
          </div>
          <div
            class="column items-center text-white text-caption"
            style="width: 100%"
          >
            BALANCE GENERAL DEL 1 DE ENERO AL 30 DE JUNIO DE {{ year }}
          </div>
          <div
            class="column items-center text-white text-caption text-weight-light"
            style="width: 100%"
          >
            (Cifras Expresadas en US Dólares)
          </div>
          <div class="column items-center" style="width: 50%">
            <div class="col text-white text-subtitle1 text-weight-medium">
              Activo
            </div>
          </div>
          <div class="column items-center" style="width: 45%">
            <div class="col text-white text-subtitle1 text-weight-medium">
              Pasivo y Patrimonio
            </div>
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
              auto-width
              key="cuentaActivo"
              :props="props"
              :class="{
                'bg-teal-3': props.row.isAC,
                'bg-teal-5 text-white text-overline text-center':
                  props.row.isHeaderAC,
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-brand text-white text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              {{ props.row.cuentaActivo }}
            </q-td>
            <q-td
              auto-width
              key="activo"
              :props="props"
              :class="{
                'bg-teal-3': props.row.isAC,
                'bg-teal-5': props.row.isHeaderAC,
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-brand': props.row.isTotalBalance,
              }"
            >
              {{ props.row.sub_activo }}
              <q-popup-edit
                @save="getDataAcount(props.row.typeIzq, props.row.cuentaActivo)"
                @hide="closePopUp"
                @update:model-value="getNewAmount"
                :validate="validarInput"
                v-model="props.row.sub_activo"
                v-slot="scope"
                buttons
                label-set="Guardar"
                label-cancel="Cancelar"
              >
                <q-input
                  prefix="$"
                  v-model="scope.value"
                  dense
                  :error="errorCalories"
                  :error-message="errorMessageCalories"
                  @keyup.enter="scope.set"
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td
              auto-width
              key="activoTotal"
              :props="props"
              :class="{
                'bg-teal-3': props.row.isAC,
                'bg-teal-5': props.row.isHeaderAC,
                'bg-teal-6 text-white text-overline text-center':
                  props.row.isSubTotalAC,
                'bg-brand text-white text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              {{ props.row.total_activo }}
            </q-td>
            <q-td
              auto-width
              key="cuentaPasivo"
              :props="props"
              :class="{
                'bg-orange-3': props.row.isPV,
                'bg-purple-13 text-white text-overline text-center':
                  props.row.isSubTotalPV || props.row.isHeaderPV,
                'bg-purple-9 text-white text-overline text-center':
                  props.row.isTotalPV,
                'bg-deep-orange-2': props.row.isPT || props.row.isCS,
                'bg-deep-orange-2 text-overline text-center':
                  props.row.isTotalCS,
                'bg-yellow-10 text-white text-overline text-center':
                  props.row.isTotalPT || props.row.isHeaderPT,
                'bg-brand text-white text-overline text-center':
                  props.row.isTotalBalance,
              }"
            >
              <div class="text-pre-wrap">{{ props.row.cuentaPasivo }}</div>
            </q-td>
            <q-td
              auto-width
              key="pasivo"
              :props="props"
              :class="{
                'bg-orange-3': props.row.isPV,
                'bg-purple-13': props.row.isHeaderPV || props.row.isSubTotalPV,
                'bg-purple-9': props.row.isTotalPV,
                'bg-deep-orange-2':
                  props.row.isTotalCS || props.row.isPT || props.row.isCS,
                'bg-yellow-10': props.row.isTotalPT || props.row.isHeaderPT,
                'bg-brand': props.row.isTotalBalance,
              }"
            >
              {{ props.row.sub_pasivo }}
              <q-popup-edit
                v-model="props.row.sub_pasivo"
                v-slot="scope"
                buttons
                :validate="validarInput"
                label-set="Guardar"
                label-cancel="Cancelar"
                @update:model-value="getNewAmount"
                @hide="closePopUp"
                @save="
                  getDataAcount(
                    props.row.isPC
                      ? 'PC'
                      : props.row.isPNC
                      ? 'PNC'
                      : props.row.isCS
                      ? 'CS'
                      : 'PT',
                    props.row.cuentaPasivo
                  )
                "
              >
                <q-input
                  prefix="$"
                  v-model="scope.value"
                  dense
                  :error="errorCalories"
                  :error-message="errorMessageCalories"
                  @keyup.enter="scope.set"
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td
              auto-width
              key="pasivoTotal"
              :props="props"
              :class="{
                'bg-yellow-10': props.row.isHeaderPT,
                'bg-purple-13': props.row.isHeaderPV,
                'bg-orange-3': props.row.isPV,
                'bg-purple-13 text-white text-overline text-center':
                  props.row.isSubTotalPV,
                'bg-purple-9 text-white text-overline text-center':
                  props.row.isTotalPV,
                'bg-deep-orange-2 text-overline text-center':
                  props.row.isTotalCS || props.row.isPT || props.row.isCS,
                'bg-yellow-10 text-white text-overline text-center':
                  props.row.isTotalPT,
                'bg-brand text-white text-overline text-center':
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
import { useCounterStore } from "../stores/estados";
import useEventsBus from "../eventBus";

const props = defineProps({
  show: Boolean,
});

const store = useCounterStore();
const { bus } = useEventsBus();
const showDialog = ref(props.show);
let errorCalories = ref(false);
let errorMessageCalories = ref("");
const year = ref("");
const initialPagination = ref({
  rowsNumber: 10,
});

const columns = [
  {
    name: "cuentaActivo",
    label: "Cuenta",
    align: "left",
  },
  {
    name: "activo",
    label: "Monto",
    align: "center",
  },
  {
    name: "activoTotal",
    label: "Total",
    align: "center",
  },
  {
    name: "cuentaPasivo",
    label: "Cuenta",
    align: "left",
  },
  {
    name: "pasivo",
    label: "Monto",
    align: "center",
  },
  {
    name: "pasivoTotal",
    label: "Total",
    align: "center",
  },
];
let typeChanged = "";
let acount = "";
let balance = null;
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

function closePopUp() {
  errorCalories.value = false;
  errorMessageCalories.value = "";
}

function validarInput(value) {
  if (isNaN(value)) {
    errorCalories.value = true;
    errorMessageCalories.value =
      "No se permiten el ingreso de valores no numéricos";
    return false;
  } else {
    if (value.length >= 2) {
      if (value[0] === "0" && value[1] !== ".") {
        errorCalories.value = true;
        errorMessageCalories.value =
          "No se permiten valores de 0 a la izquierda";
        return false;
      }
    } else if (value.length === 0) {
      errorCalories.value = true;
      errorMessageCalories.value = "Ingrese valores para poder modificar";
      return false;
    } else {
      errorCalories.value = false;
      errorMessageCalories.value = "";
      return true;
    }
  }
}

function close() {
  showDialog.value = !showDialog.value;
  rows.value = [];
}

function setTotalActivoCorriente(cuentas) {
  let newTotalActivoCorriente = 0;
  for (const index in cuentas) {
    newTotalActivoCorriente += parseFloat(cuentas[index].sub_activo);
  }
  rows.value[rowTotaclActivoCorriente].total_activo =
    newTotalActivoCorriente.toFixed(2);

  setTotalActivos();
}

function setTotalActivoNoCorriente(cuentas) {
  let newTotalActivoNoCorriente = 0;
  for (const index in cuentas) {
    newTotalActivoNoCorriente += parseFloat(cuentas[index].sub_activo);
  }
  rows.value[rowTotalActivoNoCorriente].total_activo =
    newTotalActivoNoCorriente.toFixed(2);

  setTotalActivos();
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
    balance = val[0];
    year.value = balance.año;
    let totalActivoCorriente = 0;
    let totalActivoNoCorriente = 0;
    let totalPasivosCorrientes = 0;
    let totalPasivosNoCorrientes = 0;
    let totalPatrimonio = 0;
    let totalCapitalSocial = 0;

    // numero total de cuentas para el lado izquierdo (ACTIVOS)
    const rowsIzq =
      val[0].activo.activo_corriente.size +
      val[0].activo.activo_no_corriente.size +
      3;
    // numero total de cuentas para el lado derecho (PASIVO + CAPITAL)
    const rowsDer =
      val[0].pasivo.pasivo_corriente.size +
      val[0].pasivo.pasivo_no_corriente.size +
      val[0].patrimonio.get("sub_capital_social").size +
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
      rows.value[index].typeIzq = "AC";
      totalActivoCorriente += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rowTotaclActivoCorriente = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVO CORRIENTE";
    rows.value[index].isSubTotalAC = true;
    rows.value[index].total_activo = parseFloat(
      totalActivoCorriente.toFixed(2)
    );
    index += 2;
    rows.value[index].cuentaActivo = "ACTIVOS NO CORRIENTES";
    rows.value[index].isHeaderAC = true;
    index += 1;
    for (const [cuenta, monto] of val[0].activo.activo_no_corriente) {
      rows.value[index].cuentaActivo = cuenta;
      rows.value[index].sub_activo = monto;
      rows.value[index].isAC = true;
      rows.value[index].typeIzq = "ANC";
      totalActivoNoCorriente += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rowTotalActivoNoCorriente = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVO NO CORRIENTE";
    rows.value[index].isSubTotalAC = true;
    rows.value[index].total_activo = parseFloat(
      totalActivoNoCorriente.toFixed(2)
    );
    index += 1;

    // LLENANDO EL LADO DERECHO DEL BALANCE
    index = 1;
    for (const [cuenta, monto] of val[0].pasivo.pasivo_corriente) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = monto;
      rows.value[index].isPC = true;
      rows.value[index].isPV = true;
      rows.value[index].typeDer = "PC";
      index += 1;
      totalPasivosCorrientes += parseFloat(monto.toFixed(2));
    }
    rowTotalPasivoCorriente = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS CORRIENTES";
    rows.value[index].isSubTotalPV = true;
    rows.value[index].total_pasivo = parseFloat(
      totalPasivosCorrientes.toFixed(2)
    );
    index += 2;
    rows.value[index].cuentaPasivo = "PASIVOS NO CORRIENTES";
    rows.value[index].isHeaderPV = true;
    index += 1;
    for (const [cuenta, monto] of val[0].pasivo.pasivo_no_corriente) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = parseFloat(monto.toFixed(2));
      rows.value[index].isPNC = true;
      rows.value[index].isPV = true;
      rows.value[index].typeDer = "PNC";
      index += 1;
      totalPasivosNoCorrientes += monto;
    }
    rowTotalPasivoNoCorriente = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS NO CORRIENTES";
    rows.value[index].total_pasivo = parseFloat(
      totalPasivosNoCorrientes.toFixed(2)
    );
    rows.value[index].isSubTotalPV = true;
    index += 1;
    rowTotalPasivos = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS";
    console.log(
      totalPasivosCorrientes + " + " + totalPasivosNoCorrientes + " = ",
      totalPasivosCorrientes + totalPasivosNoCorrientes
    );
    rows.value[index].total_pasivo =
      parseFloat(rows.value[rowTotalPasivoCorriente].total_pasivo) +
      parseFloat(rows.value[rowTotalPasivoNoCorriente].total_pasivo);
    rows.value[index].isTotalPV = true;
    index += 2;

    rows.value[index].cuentaPasivo = "PATRIMONIO Y RESERVAS";
    rows.value[index].isHeaderPT = true;
    index += 1;
    for (const [cuenta, monto] of val[0].patrimonio.get("sub_capital_social")) {
      rows.value[index].cuentaPasivo = cuenta;
      rows.value[index].sub_pasivo = monto;
      rows.value[index].isCS = true;
      rows.value[index].typeDer = "CS";
      index += 1;
      totalCapitalSocial += parseFloat(monto.toFixed(2));
    }
    rowTotalCapitalSocial = index;
    rows.value[index].cuentaPasivo = "Total Capital Social";
    rows.value[index].isTotalCS = true;
    rows.value[index].total_pasivo = totalCapitalSocial;
    index += 1;
    for (const [cuenta, monto] of val[0].patrimonio) {
      if (cuenta !== "sub_capital_social") {
        rows.value[index].cuentaPasivo = cuenta;
        rows.value[index].total_pasivo = monto;
        rows.value[index].isPT = true;
        rows.value[index].typeDer = "PT";
        index += 1;
        totalPatrimonio += monto;
      }
    }
    totalPatrimonio += totalCapitalSocial;
    totalPatrimonio.toFixed(2);
    rowTotalPatrimonio = index;
    rows.value[index].cuentaPasivo = "TOTAL PATRIMONIO";
    rows.value[index].isTotalPT = true;
    rows.value[index].total_pasivo = totalPatrimonio;
    index += 2;
    rowTotalActivos = index;
    rows.value[index].cuentaActivo = "TOTAL ACTIVOS";
    rows.value[index].isTotalBalance = true;
    rows.value[index].total_activo =
      parseFloat(totalActivoCorriente.toFixed(2)) +
      parseFloat(totalActivoNoCorriente.toFixed(2));
    rowTotalPasivoPatrimonio = index;
    rows.value[index].cuentaPasivo = "TOTAL PASIVOS Y PATRIMONIO";
    rows.value[index].isTotalBalance = true;
    rows.value[index].total_pasivo =
      totalPatrimonio + totalPasivosCorrientes + totalPasivosNoCorrientes;
  }
);

watch(rows.value, () => {
  if (typeChanged === "AC") {
    setTotalActivoCorriente(
      rows.value.filter((cuenta) => cuenta.typeIzq === "AC")
    );
  } else if (typeChanged === "ANC") {
    setTotalActivoNoCorriente(
      rows.value.filter((cuenta) => cuenta.typeIzq === "ANC")
    );
  } else if (typeChanged === "PC") {
    setTotalPasivoCorriente(
      rows.value.filter((cuenta) => cuenta.typeDer === "PC")
    );
  } else if (typeChanged === "PNC") {
    setTotalPasivoNoCorriente(
      rows.value.filter((cuenta) => cuenta.typeDer === "PNC")
    );
  } else if (typeChanged === "CS") {
    setTotalCapitalSocial(
      rows.value.filter((cuenta) => cuenta.typeDer === "CS")
    );
  } else if (typeChanged === "PT") {
    set;
  }
});

// Obtenemos la cuenta y el tipo de cuenta modificada desde el popup edit
function getDataAcount(typeAcount, acountChanged) {
  typeChanged = typeAcount;
  acount = acountChanged;
}

// Obtenemos el nuevo monto ingresado en el popup edit
function getNewAmount(value) {
  store.updateBalance(balance, acount, parseFloat(value));
}
</script>

<style lang="sass">
button
  cursor: pointer
  border: 0
  border-radius: 6px
  font-weight: 600
  margin: 10px 10px
  width: 200px
  padding: 10px 0
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2)
  transition: 0.4s

button:hover
  color: white
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6)
  background-color: rgba(104, 85, 224, 1)

.bg-brand
    background: #0b032d !important

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
