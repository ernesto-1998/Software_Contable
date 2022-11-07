<template>
  <div>
    <q-dialog v-model="showDialog" full-width persistent>
      <q-table
        class="my-sticky-header-table"
        :rows="rows"
        :columns="columns"
        :pagination="initialPagination"
        hide-pagination
        row-key="name"
        dense
        bordered
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
                v-if="props.row.isMontoEditable"
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
              <q-popup-edit
                v-if="props.row.isTotalEditable"
                @hide="closePopUp"
                @save="getDataAcount(props.row.type, props.row.cuenta)"
                @update:model-value="getNewAmount"
                :validate="validarInput"
                v-model="props.row.total"
                v-slot="scope"
                buttons
                label-set="Guardar"
                label-cancel="Cancelar"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  :error="errorCalories"
                  :error-message="errorMessageCalories"
                  @keyup.enter="scope.set"
                  autofocus
                />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useCounterStore } from "../stores/estados";
import useEventsBus from "../eventBus";

const props = defineProps({
  estado: Object,
});

const store = useCounterStore();
const { bus } = useEventsBus();
const { emit } = useEventsBus();
const showDialog = ref(true);
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
let rowTotalImpuestos = 0;
let rowTotalResultadosIntegrales = 0;
let rowTotalResultadosIntegralesDelAño = 0;
let rowUXD = 0;
let rowUAR = 0;

let UAR = 0;
let UXD = 0;
let UOP = 0;
let UB = 0;
let totalResultadosIntegralesDelAño = 0;
let totalResultadosIntegralesAtribuibles = 0;
let totalProductosOperacion = 0;
let totalResultadosIntegrales = 0;
let totalUtilidadAtribuible = 0;
let totalCostosEnergia = 0;
let totalCostosGastosOperacion = 0;
let totalGastosFinancieros = 0;
let totalProductosFinancieros = 0;
let totalRows = 0;

// Totales de cuentas del estado y utilidades
let totalImpuestos = 0;

function closePopUp() {
  errorCalories.value = false;
  errorMessageCalories.value = "";
}

function validarInput(value) {
  console.log("validando");
  value = value.trim();
  console.log(value);

  if (value.includes("$")) {
    value = value.slice(1, value.length).trim();
    console.log("quitamos el dolar:", value);
  }
  value = value.split(",").join("").trim();
  console.log("quitando comas:", value);
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
      value = "$ " + value;
      return true;
    }
  }
}

function close() {
  showDialog.value = !showDialog.value;
  emit("closeEstado");
}

function setTotalProductosOperacion(cuentas) {
  totalProductosOperacion = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalProductosOperacion += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalProductosOperacion += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalProductoOperacion].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalProductosOperacion.toFixed(2));

  setUOP();
}

/*
function setTotalCostoEnergia(cuentas) {
  totalCostosEnergia = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalCostosEnergia += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalCostosEnergia += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalCostosEnergia].total =
    "$ " + new Intl.NumberFormat("en-US").format(totalCostosEnergia.toFixed(2));

  setUOP();
} */

function setTotalGastosOperacion(cuentas) {
  totalCostosGastosOperacion = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalCostosGastosOperacion += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalCostosGastosOperacion += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalCostosGastosOperacion].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(
      totalCostosGastosOperacion.toFixed(2)
    );

  setUOP();
}

function setTotalGastosFinancieros(cuentas) {
  totalGastosFinancieros = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalGastosFinancieros += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalGastosFinancieros += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalGastosFinancieros].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalGastosFinancieros.toFixed(2));

  setUAR();
}

function setTotalProductosFinancieros(cuentas) {
  totalProductosFinancieros = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalProductosFinancieros += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalProductosFinancieros += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalProductosFinancieros].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalProductosFinancieros.toFixed(2));

  setUAR();
}

function setTotalResultadosIntegrales(cuentas) {
  totalResultadosIntegrales = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalResultadosIntegrales += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalResultadosIntegrales += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalResultadosIntegrales].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalResultadosIntegrales.toFixed(2));
  rows.value[rowTotalResultadosIntegralesDelAño].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(UXD + totalResultadosIntegrales);
}

function setTotalImpuestos(cuentas) {
  totalImpuestos = 0;
  for (const index in cuentas) {
    if (cuentas[index].monto.includes("$")) {
      totalImpuestos += parseFloat(
        cuentas[index].monto.split("$")[1].split(",").join("").trim()
      );
    } else {
      totalImpuestos += parseFloat(cuentas[index].monto.trim());
      cuentas[index].monto = "$ " + cuentas[index].monto;
    }
  }
  rows.value[rowTotalImpuestos].total =
    "$ " + new Intl.NumberFormat("en-US").format(totalImpuestos.toFixed(2));
  setUXD();
}

/*
function setUB() {
  UB = (totalProductosOperacion - totalCostosEnergia).toFixed(2);
  rows.value[rowUtilidadBruta].total =
    "$ " + new Intl.NumberFormat("en-US").format(UB);
  setUOP();
} */

function setUOP() {
  UOP = (totalProductosOperacion - totalCostosGastosOperacion).toFixed(2);
  rows.value[rowUtilidadOperacion].total =
    "$ " + new Intl.NumberFormat("en-US").format(UOP);
  setUAR();
}

function setUAR() {
  UAR = (UOP - (totalGastosFinancieros - totalProductosFinancieros)).toFixed(2);
  rows.value[rowUAR].total = "$ " + new Intl.NumberFormat("en-US").format(UAR);
  setUXD();
}

function setUXD() {
  UXD = parseFloat((UAR - totalImpuestos).toFixed(2));
  rows.value[rowUXD].total = "$ " + new Intl.NumberFormat("en-US").format(UXD);
  console.log(typeof UXD + " + " + typeof totalResultadosIntegrales);
  rows.value[rowTotalResultadosIntegralesDelAño].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(UXD + totalResultadosIntegrales);
}

onMounted(() => {
  console.log(props.estado);
  year.value = props.estado.año;

  // determinando el número necesario de filas para la tabla
  for (const [typeCuenta, value] of Object.entries(props.estado)) {
    if (typeCuenta === "año") {
      continue;
    }
    totalRows += value.size;
  }
  totalRows += 34;

  // inicializando el array de filas
  for (let i = 0; i < totalRows; i++) {
    rows.value.push({});
  }
  let index = 0;
  rows.value[index].cuenta = "Ingresos:";
  index += 1;
  // llenando las filas de productos de operación
  for (const [cuenta, monto] of props.estado.sub_productos_de_operacion) {
    rows.value[index].cuenta = cuenta;
    rows.value[index].isMontoEditable = true;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].type = "PO";
    totalProductosOperacion += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rowTotalProductoOperacion = index;
  // añadiendo el total de productos de operación
  rows.value[rowTotalProductoOperacion].cuenta = "Total ingresos";
  rows.value[rowTotalProductoOperacion].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalProductosOperacion.toFixed(2));
  rows.value[index].isHeader = true;
  index += 2;
  rows.value[index].cuenta = "Costos y gastos de operación:";
  index += 1;

  /*
  rowTotalCostosEnergia = index;
  rows.value[index].cuenta = "COSTOS DE ENERGIA";
  rows.value[index].isUltimaTotal = true;
  rows.value[index].isHeader = true;
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_costos_de_energia) {
    rows.value[index].cuenta = cuenta;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].type = "CE";
    totalCostosEnergia += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[rowTotalCostosEnergia].total =
    "$ " + new Intl.NumberFormat("en-US").format(totalCostosEnergia.toFixed(2));

  rowUtilidadBruta = index;
  UB = (totalProductosOperacion - totalCostosEnergia).toFixed(2);
  rows.value[rowUtilidadBruta].total =
    "$ " + new Intl.NumberFormat("en-US").format(UB);
  */

  for (const [cuenta, monto] of props.estado.sub_costos_y_gastos_de_operacion) {
    rows.value[index].cuenta = cuenta;

    rows.value[index].isMontoEditable = true;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].type = "GO";
    totalCostosGastosOperacion += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rowTotalCostosGastosOperacion = index;
  rows.value[index].isHeader = true;
  rows.value[index].cuenta = "Total costos y gastos de operación";
  rows.value[index].isUltimaTotal = true;
  rows.value[rowTotalCostosGastosOperacion].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(
      totalCostosGastosOperacion.toFixed(2)
    );

  index += 2;
  rowUtilidadOperacion = index;
  rows.value[index].isHeader = true;
  rows.value[index].cuenta = "UTILIDAD DE OPERACIÓN";
  rows.value[index].isUtilidad = true;
  UOP = (totalProductosOperacion - totalCostosGastosOperacion).toFixed(2);
  rows.value[index].total = "$ " + new Intl.NumberFormat("en-US").format(UOP);
  index += 2;
  /*
  rows.value[index].cuenta = "MENOS";
  rows.value[index].isOperador = true;
  index += 1;
  */ rows.value[index].cuenta = "MENOS";
  index += 1;
  rowTotalGastosFinancieros = index;
  rows.value[index].cuenta = "GASTOS FINANCIEROS";
  rows.value[index].isUltimaTotal = true;
  rows.value[index].isHeader = true;
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_gastos_financieros) {
    rows.value[index].cuenta = cuenta;
    rows.value[index].isMontoEditable = true;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].type = "GF";
    totalGastosFinancieros += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rows.value[rowTotalGastosFinancieros].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalGastosFinancieros.toFixed(2));

  rows.value[index].cuenta = "MAS";
  rows.value[index].isOperador = true;

  index += 1;
  rowTotalProductosFinancieros = index;
  rows.value[index].cuenta = "PRODUCTOS FINANCIEROS";
  rows.value[index].isUltimaTotal = true;
  rows.value[index].isHeader = true;
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_ingresos_financieros) {
    rows.value[index].cuenta = cuenta;
    rows.value[index].isMontoEditable = true;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].type = "PF";
    totalProductosFinancieros += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rows.value[rowTotalProductosFinancieros].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalProductosFinancieros.toFixed(2));

  index += 1;
  rowUAR = index;
  UAR = (UOP - (totalGastosFinancieros - totalProductosFinancieros)).toFixed(2);
  rows.value[rowUAR].total = "$ " + new Intl.NumberFormat("en-US").format(UAR);
  rows.value[index].cuenta = "UTILIDAD ANTES DE IMPUESTOS Y RESERVAS";
  rows.value[index].isUtilidad = true;
  rows.value[index].isHeader = true;
  index += 2;

  rows.value[index].cuenta = "MENOS";
  rows.value[index].isOperador = true;
  index += 1;
  rowTotalImpuestos = index;
  rows.value[index].cuenta = "Impuestos y Reservas";
  rows.value[index].isUltimaTotal = true;
  rows.value[index].isHeader = true;
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_impuestos_y_reservas) {
    rows.value[index].cuenta = cuenta;
    rows.value[index].isMontoEditable = true;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    rows.value[index].isTotalEditable = true;
    rows.value[index].type = "IR";
    totalImpuestos += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rows.value[rowTotalImpuestos].total =
    "$ " + new Intl.NumberFormat("en-US").format(totalImpuestos.toFixed(2));
  index += 1;

  rowUXD = index;
  rows.value[index].cuenta = "UTILIDAD NETA";
  rows.value[index].isUtilidad = true;
  UXD = parseFloat((UAR - totalImpuestos).toFixed(2));
  rows.value[index].total = "$ " + new Intl.NumberFormat("en-US").format(UXD);
  rows.value[index].isHeader = true;
  index += 2;
  rows.value[index].cuenta = "MAS";
  rows.value[index].isOperador = true;
  index += 1;
  rowTotalResultadosIntegrales = index;
  rows.value[index].cuenta =
    "Otros resultados integrales, netos de impuesto sobre la renta:";

  rows.value[index].isUltimaTotal = true;
  rows.value[index].isHeader = true;
  index += 1;

  rows.value[index].cuenta =
    "Partidas que no serán reclasificadas posteriormente a resultados";
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_resultados_integrales) {
    rows.value[index].cuenta = "- " + cuenta;
    rows.value[index].isMontoEditable = true;
    rows.value[index].type = "RI";
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    totalResultadosIntegrales += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rows.value[rowTotalResultadosIntegrales].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalResultadosIntegrales.toFixed(2));
  index += 1;
  rowTotalResultadosIntegralesDelAño = index;
  totalResultadosIntegralesDelAño = UXD + totalResultadosIntegrales;
  rows.value[index].cuenta = "RESULTADOS INTEGRALES DEL AÑO";

  rows.value[index].isUtilidad = true;
  rows.value[index].isHeader = true;
  console.log(totalResultadosIntegralesDelAño);
  rows.value[rowTotalResultadosIntegralesDelAño].total =
    "$ " +
    new Intl.NumberFormat("en-US").format(totalResultadosIntegralesDelAño);
  index += 2;
  rows.value[index].cuenta = "Utilidad del año atribuible a:";
  index += 1;
  for (const [cuenta, monto] of props.estado.sub_utilidad_atribuible) {
    rows.value[index].cuenta = "- " + cuenta;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    totalUtilidadAtribuible += parseFloat(monto.toFixed(2));
    index += 1;
  }
  rows.value[index - 1].isUltimaSubCuenta = true;
  rows.value[index].monto =
    "$ " + new Intl.NumberFormat("en-US").format(UXD.toFixed(2));

  if (props.estado.sub_resultados_integrales_atribuible) {
    index += 2;
    rows.value[index].cuenta =
      "Total resultados integrales del año atribuible a:";
    index += 1;
    for (const [cuenta, monto] of props.estado
      .sub_resultados_integrales_atribuible) {
      rows.value[index].cuenta = "- " + cuenta;
      rows.value[index].monto =
        "$ " + new Intl.NumberFormat("en-US").format(monto);
      totalResultadosIntegralesAtribuibles += parseFloat(monto.toFixed(2));
      index += 1;
    }
    rows.value[index - 1].isUltimaSubCuenta = true;
    rows.value[index].monto =
      "$ " +
      new Intl.NumberFormat("en-US").format(
        totalResultadosIntegralesAtribuibles.toFixed(2)
      );
  }
  index += 2;
  for (const [cuenta, monto] of props.estado.sub_utilidades_por_accion) {
    rows.value[index].isHeader = true;
    rows.value[index].isUtilidad = true;
    rows.value[index].isUltimaSubCuenta = true;
    rows.value[index].cuenta = "" + cuenta;
    rows.value[index].monto =
      "$ " + new Intl.NumberFormat("en-US").format(monto);
    totalResultadosIntegralesAtribuibles += parseFloat(monto.toFixed(2));
    index += 2;
  }
});

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
  } else if (typeChanged === "IR") {
    setTotalImpuestos(rows.value.filter((cuenta) => cuenta.type === "IR"));
  } else if (typeChanged === "RI") {
    setTotalResultadosIntegrales(
      rows.value.filter((cuenta) => cuenta.type === "RI")
    );
  }
});

// Obtenemos la cuenta y el tipo de cuenta modificada desde el popup edit
function getDataAcount(typeAcount, acountChanged) {
  console.log("tipo cambio", typeAcount);
  typeChanged = typeAcount;

  if (typeAcount === "RI") {
    acount = acountChanged.split(" ").splice(1).join(" ");
    console.log(acount);
  } else {
    acount = acountChanged;
  }
  console.log("cuenta", acount);
}

// Obtenemos el nuevo monto ingresado en el popup edit
function getNewAmount(value) {
  value = value.trim();
  if (value.includes("$")) {
    value = value.split("$")[1].split(",").join("").trim();
  }
  console.log(value);
  store.updateEstado(props.estado, acount, parseFloat(value));
}
</script>

<style lang="sass" scoped>

.text-sub
  box-shadow: 0 1px 0px  rgb(0 0 0) !important


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
