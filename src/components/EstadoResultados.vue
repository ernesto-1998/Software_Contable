<template>
  <div>
    <q-dialog v-model="showDialog">
      <q-table
        class="my-sticky-header-table"
        :rows="rows"
        :columns="columns"
        :pagination="initialPagination"
        hide-pagination
        row-key="name"
        dense
        separator="none"
      >
        <template v-slot:top>
          <div class="column items-center" style="width: 85%">
            <div class="col text-white text-subtitle1">
              DISTRIBUIDORA DE ELECTRICIDAD DEL SUR, S.A DE C.V.
            </div>
            <div class="col text-white text-caption">
              ESTADO DE RESULTADOS DEL 1 DE ENERO AL 30 DE JUNIO DE {{ year }}
            </div>
            <div class="col text-white text-caption text-weight-light">
              (Cifras Expresadas en US Dólares)
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              auto-width
              key="cuenta"
              :props="props"
              :class="{
                'text-subtitle2': props.row.isHeader,
                'text-caption': props.row.isOperador,
                'text-subtitle2 bg-green-3': props.row.isUtilidad,
              }"
            >
              {{ props.row.cuenta }}
            </q-td>
            <q-td
              auto-width
              key="monto"
              :props="props"
              :class="{
                'text-sub': props.row.isUltimaSubCuenta,
                'text-subtitle2 bg-green-3': props.row.isUtilidad,
              }"
            >
              {{ props.row.monto }}
              <q-popup-edit
                @hide="closePopUp"
                @save="getDataAcount(props.row.type, props.row.cuenta)"
                @update:model-value="getNewAmount"
                :validate="validarInput"
                v-model="props.row.monto"
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
              key="total"
              :props="props"
              :class="{
                'text-sub': props.row.isUltimaTotal,
                'text-subtitle2': props.row.isHeader,
                'text-subtitle2 bg-green-3': props.row.isUtilidad,
              }"
            >
              {{ props.row.total }}
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
const initialPagination = ref({
  rowsNumber: 10,
});

const columns = [
  {
    name: "cuenta",
    label: "",
    align: "left",
  },
  {
    name: "monto",
    label: "",
    align: "center",
  },
  {
    name: "total",
    label: "",
    align: "center",
  },
];
let typeChanged = "";
let acount = "";
let estado = null;
let rows = ref([]);
const year = ref("");

// Indice de fila donde se encuentran las cantidades calculadas
let rowTotalProductoOperacion = 0;
let rowTotalCostosEnergia = 0;
let rowTotalCostosGastosOperacion = 0;
let rowUtilidadBruta = 0;
let rowTotalGastosFinancieros = 0;
let rowTotalProductosFinancieros = 0;
let rowUtilidadOperacion = 0;
let rowUXD = 0;
let rowUAR = 0;

// Totales de cuentas del estado y utilidades
let totalImpuestos = 0;

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
  totalImpuestos = 0;
}

function setTotalProductosOperacion(cuentas) {
  console.log(cuentas);
  let newTotalProductosOperacion = 0;
  for (const index in cuentas) {
    newTotalProductosOperacion += parseFloat(cuentas[index].monto);
  }
  rows.value[rowTotalProductoOperacion].total =
    newTotalProductosOperacion.toFixed(2);

  // ACTUALIZANDO LAS UTILIDADES
  updateUtilidades();
}

function setTotalCostoEnergia(cuentas) {
  let newTotalCostoEnergia = 0;
  for (const index in cuentas) {
    newTotalCostoEnergia += parseFloat(cuentas[index].monto);
  }
  rows.value[rowTotalCostosEnergia].total = newTotalCostoEnergia.toFixed(2);
  // ACTUALIZANDO LAS UTILIDADES
  updateUtilidades();
}

function setTotalGastosOperacion(cuentas) {
  let newTotalGastosOperacion = 0;
  for (const index in cuentas) {
    newTotalGastosOperacion += parseFloat(cuentas[index].monto);
  }
  rows.value[rowTotalCostosGastosOperacion].total =
    newTotalGastosOperacion.toFixed(2);
  // ACTUALIZANDO LAS UTILIDADES
  updateUtilidades();
}

function setTotalGastosFinancieros(cuentas) {
  let newTotalGastosFinancieros = 0;
  for (const index in cuentas) {
    newTotalGastosFinancieros += parseFloat(cuentas[index].monto);
  }
  rows.value[rowTotalGastosFinancieros].total =
    newTotalGastosFinancieros.toFixed(2);
  // ACTUALIZANDO LAS UTILIDADES
  updateUtilidades();
}

function setTotalProductosFinancieros(cuentas) {
  let newTotalProductosFinancieros = 0;
  for (const index in cuentas) {
    newTotalProductosFinancieros += parseFloat(cuentas[index].monto);
  }
  rows.value[rowTotalProductosFinancieros].total =
    newTotalProductosFinancieros.toFixed(2); // ACTUALIZANDO LAS UTILIDADES
  updateUtilidades();
}
function updateUtilidades() {
  setUB();
  setUOP();
  setUAR();
  setUXD();
}
function setUB() {
  rows.value[rowUtilidadBruta].total = (
    rows.value[rowTotalProductoOperacion].total -
    rows.value[rowTotalCostosEnergia].total
  ).toFixed(2);
}

function setUOP() {
  rows.value[rowUtilidadOperacion].total = (
    rows.value[rowUtilidadBruta].total -
    rows.value[rowTotalCostosGastosOperacion].total
  ).toFixed(2);
}

function setUAR() {
  rows.value[rowUAR].total = (
    rows.value[rowUtilidadOperacion].total -
    (rows.value[rowTotalGastosFinancieros].total -
      rows.value[rowTotalProductosFinancieros].total)
  ).toFixed(2);
}

function setUXD() {
  rows.value[rowUXD].total = (
    rows.value[rowUAR].total - totalImpuestos
  ).toFixed(2);
}

watch(
  () => bus.value.get("sendEstado"),
  (val) => {
    estado = val[0];
    let totalProductosOperacion = 0;
    let totalCostosEnergia = 0;
    let totalCostosGastosOperacion = 0;
    let totalGastosFinancieros = 0;
    let totalProductosFinancieros = 0;
    let totalRows = 0;
    year.value = val[0].año;

    // determinando el número necesario de filas para la tabla
    for (const [typeCuenta, value] of Object.entries(val[0])) {
      if (typeCuenta === "año") {
        continue;
      }
      totalRows += value.size;
    }
    totalRows += 18;

    // inicializando el array de filas
    for (let i = 0; i < totalRows; i++) {
      rows.value.push({});
    }
    let index = 0;
    rowTotalProductoOperacion = index;
    rows.value[index].cuenta = "PRODUCTOS DE OPERACIÓN";
    rows.value[index].isHeader = true;
    index += 1;
    // llenando las filas de productos de operación
    for (const [cuenta, monto] of val[0].sub_productos_de_operacion) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].monto = monto;
      rows.value[index].type = "PO";
      totalProductosOperacion += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[index - 1].isUltimaSubCuenta = true;

    // añadiendo el total de productos de operación
    rows.value[rowTotalProductoOperacion].total =
      totalProductosOperacion.toFixed(2);
    index += 1;
    rows.value[index].cuenta = "MENOS";
    rows.value[index].isOperador = true;
    index += 1;
    rowTotalCostosEnergia = index;
    rows.value[index].cuenta = "COSTOS DE ENERGIA";
    rows.value[index].isUltimaTotal = true;
    rows.value[index].isHeader = true;
    index += 1;
    for (const [cuenta, monto] of val[0].sub_costos_de_energia) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].monto = monto;
      rows.value[index].type = "CE";
      totalCostosEnergia += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[rowTotalCostosEnergia].total = totalCostosEnergia.toFixed(2);

    rowUtilidadBruta = index;
    rows.value[rowUtilidadBruta].total = (
      rows.value[rowTotalProductoOperacion].total -
      rows.value[rowTotalCostosEnergia].total
    ).toFixed(2);
    rows.value[index].isHeader = true;
    rows.value[index].cuenta = "MARGEN COMPRA VENTA DE ENERGIA";
    rows.value[index].isUtilidad = true;
    index += 1;

    for (const [cuenta, monto] of val[0].sub_costos_y_gastos_de_operacion) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].monto = monto;
      rows.value[index].type = "GO";
      totalCostosGastosOperacion += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[index - 1].isUltimaSubCuenta = true;

    index += 1;
    rowTotalCostosGastosOperacion = index;
    rows.value[index].isHeader = true;
    rows.value[index].cuenta = "COSTOS Y GASTOS DE OPERACION";
    rows.value[index].isUltimaTotal = true;
    rows.value[rowTotalCostosGastosOperacion].total =
      totalCostosGastosOperacion.toFixed(2);

    index += 1;
    rowUtilidadOperacion = index;
    rows.value[index].isHeader = true;
    rows.value[index].cuenta = "UTILIDAD DE OPERACIÓN";
    rows.value[index].isUtilidad = true;
    rows.value[index].total = (
      rows.value[rowUtilidadBruta].total -
      rows.value[rowTotalCostosGastosOperacion].total
    ).toFixed(2);
    index += 2;

    rows.value[index].cuenta = "MENOS";
    rows.value[index].isOperador = true;
    index += 1;

    rowTotalGastosFinancieros = index;
    rows.value[index].cuenta = "GASTOS FINANCIEROS";
    rows.value[index].isHeader = true;
    index += 1;
    for (const [cuenta, monto] of val[0].sub_gastos_financieros) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].monto = monto;
      rows.value[index].type = "GF";
      totalGastosFinancieros += parseFloat(monto.toFixed(2));
      index += 1;
    }

    rows.value[rowTotalGastosFinancieros].total =
      totalGastosFinancieros.toFixed(2);

    rows.value[index].cuenta = "MAS";
    rows.value[index].isOperador = true;

    index += 1;
    rowTotalProductosFinancieros = index;
    rows.value[index].cuenta = "PRODUCTOS FINANCIEROS";
    rows.value[index].isUltimaTotal = true;
    rows.value[index].isHeader = true;
    index += 1;
    for (const [cuenta, monto] of val[0].sub_productos_financieros) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].monto = monto;
      rows.value[index].type = "PF";
      totalProductosFinancieros += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[index - 1].isUltimaSubCuenta = true;
    rows.value[rowTotalProductosFinancieros].total = totalProductosFinancieros;

    index += 1;
    rowUAR = index;
    rows.value[rowUAR].total = (
      rows.value[rowUtilidadOperacion].total -
      (parseFloat(rows.value[rowTotalGastosFinancieros].total) -
        rows.value[rowTotalProductosFinancieros].total)
    ).toFixed(2);
    rows.value[index].cuenta = "UTILIDAD ANTES DE IMPUESTOS Y RESERVAS";
    rows.value[index].isUtilidad = true;
    rows.value[index].isHeader = true;
    index += 1;

    rows.value[index].cuenta = "MENOS";
    rows.value[index].isHeader = true;

    index += 1;
    for (const [cuenta, monto] of val[0].sub_impuestos_y_reservas) {
      rows.value[index].cuenta = cuenta;
      rows.value[index].total = monto;
      rows.value[index].type = "IR";
      totalImpuestos += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[index - 1].isUltimaTotal = true;

    rowUXD = index;
    rows.value[index].cuenta = "UTILIDAD POR DISTRIBUIR";
    rows.value[index].isUtilidad = true;
    rows.value[index].total = (
      rows.value[rowUAR].total - totalImpuestos
    ).toFixed(2);
    rows.value[index].isHeader = true;
  }
);

watch(rows.value, () => {
  if (typeChanged === "PO") {
    setTotalProductosOperacion(
      rows.value.filter((cuenta) => cuenta.type === "PO")
    );
  } else if (typeChanged === "CE") {
    setTotalCostoEnergia(rows.value.filter((cuenta) => cuenta.type === "CE"));
  } else if (typeChanged === "GO") {
    setTotalGastosOperacion(
      rows.value.filter((cuenta) => cuenta.type === "GO")
    );
  } else if (typeChanged === "GF") {
    setTotalGastosFinancieros(
      rows.value.filter((cuenta) => cuenta.type === "GF")
    );
  } else if (typeChanged === "PF") {
    setTotalProductosFinancieros(
      rows.value.filter((cuenta) => cuenta.type === "PF")
    );
  }
});

// Obtenemos la cuenta y el tipo de cuenta modificada desde el popup edit
function getDataAcount(typeAcount, acountChanged) {
  typeChanged = typeAcount;
  acount = acountChanged;
}

// Obtenemos el nuevo monto ingresado en el popup edit
function getNewAmount(value) {
  store.updateEstado(estado, acount, parseFloat(value));
}
</script>

<style lang="sass" scoped>

.text-sub
  box-shadow: 0 1px 0px  rgb(0 0 0) !important

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
