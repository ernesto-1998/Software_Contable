<template>
  <div class="">
    <div class="info-container bg-secondary">
      <div class="title">
        <label> Análisis <span class="text-weight-bold">Vertical</span> </label>
      </div>
      <div class="estado-financiero_container q-mb-xl">
        <label>Periodos: </label>
        <q-select
          label-color="purple-13"
          bg-color="white"
          color="purple-13"
          clearable
          transition-show="flip-up"
          transition-hide="scale"
          rounded
          outlined
          v-model="año"
          multiple
          :options="periods"
          label="Periodos"
          popup-content-style="border-top-left-radius: 15px 50px;
  border-top-right-radius: 15px 50px;
  border-bottom-left-radius: 80px 19px;
  border-bottom-right-radius: 80px 19px;
  border: solid 3px #6e7491;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;"
          style="
            width: 320px;
            border-radius: 30px;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
          "
        />
      </div>
      <div class="periodo-container">
        <label>Estado: </label>
        <q-select
          label-color="purple-13"
          bg-color="white"
          color="purple-13"
          clearable
          transition-show="flip-up"
          transition-hide="scale"
          rounded
          outlined
          popup-content-style="border-top-left-radius: 15px 50px;
  border-top-right-radius: 15px 50px;
  border-bottom-left-radius: 80px 19px;
  border-bottom-right-radius: 80px 19px;
  border: solid 3px #6e7491;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;"
          style="
            width: 320px;
            border-radius: 30px;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
          "
          v-model="estado"
          :options="options"
          label="Estado"
        />
      </div>
      <div class="row justify-end q-py-md">
        <div v-if="generadorBalance === true || generadorEstado === true">
          <q-btn
            icon="picture_as_pdf"
            color="primary"
            label="Generar Reporte"
            no-caps
            @click="generarPDF"
            class="q-mr-xl buttom"
          />
        </div>
        <q-btn
          color="primary"
          label="Generar Análisis"
          no-caps
          @click="activarAnalisis(año, estado)"
          class="q-mr-xl buttom"
        />
      </div>
    </div>

    <div
      ref="body"
      v-if="generadorBalance === true"
      class="vertical-seccion-container bg-positive"
    >
      <TablaAnalisisBalance
        :columnsActivo="columnsActivo"
        :columnsPasivo="columnsPasivo"
        :columnsPatrimonio="columnsPatrimonio"
        :rowsActivo="rowsActivo"
        :rowsPasivo="rowsPasivo"
        :rowsPatrimonio="rowsPatrimonio"
      />
    </div>
    <div
      ref="body"
      v-if="generadorEstado === true"
      class="vertical-seccion-container bg-positive"
    >
      <TablaAnalisisEstado
        :columnsTitulo="columnsTitulo"
        :rowsAnalisisEstado="rowsAnalisisEstado"
      />
    </div>

    <div
      v-if="showGraphicsBalance || showGraphicsER"
      class="graphics-container bg-secondary"
    >
      <q-tabs
        active-color="purple-13"
        active-bg-color="indigo-1"
        v-model="tab"
        no-caps
        class="bg-secondary text-white"
      >
        <q-tab
          v-for="periodo in año"
          :key="periodo"
          :name="periodo"
          :label="'Periodo ' + periodo"
        />
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        vertical
        transition-prev="fade "
        transition-next="fade"
        transition-duration="500"
        class="bg-secondary"
      >
        <q-tab-panel v-for="periodo in año" :key="periodo" :name="periodo">
          <div v-if="showGraphicsBalance" class="q-pa-none">
            <div>
              <AbsolutosBalance
                :periodo="periodo"
                :ids="[periodo + 'aB1', periodo + 'aB2']"
              />
            </div>
          </div>
          <div v-if="showGraphicsER" class="q-pa-none">
            <AbsolutosER
              :periodo="parseInt(periodo)"
              :ids="[periodo + 'aeR1']"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { pdfHandler } from "../../utils/generatePDF.js";
import { ref, onBeforeMount, watch } from "vue";
import { useCounterStore } from "stores/estados";
import TablaAnalisisBalance from "../../components/AnalisisVertical-Horizontal/TablaAnalisisBalance.vue";
import TablaAnalisisEstado from "../../components/AnalisisVertical-Horizontal/TablaAnalisisEstado.vue";
import {
  obtenerTotalesBalance,
  obtenerTotalesEstado,
} from "../../utils/totales.js";
import { getKeysBalance, getKeysEstado } from "../../utils/getKeys.js";
import { alertas } from "../../utils/sweetAlerts2.js";
import EspecificosBalance from "src/components/graphics/vertical/especificosBalance.vue";
import AbsolutosBalance from "src/components/graphics/vertical/absolutosBalance.vue";
import EspecificosER from "src/components/graphics/vertical/especificosER.vue";
import AbsolutosER from "src/components/graphics/vertical/absolutosER.vue";

onBeforeMount(() => {
  setTimeout(() => {
    document.body.classList.remove("body");
    document.body.classList.add("bg-accent");
  }, 1000);
  // console.log(obtenerTotalesEstado(2017).ProductosOperacion)
  const tamanio = input.balance_general.length;
  for (let i = 0; i < tamanio; i++) {
    periods.push(input.balance_general[i].año);
  }

  let años = [2017, 2018, 2019, 2020, 2021];
  let temporalKeysBalance = getKeysBalance(años);
  let temporalKeysEstado = getKeysEstado(años);

  keysBalance = {
    activo_corriente: Array.from(new Set(temporalKeysBalance.ActivoCorriente)),
    activo_no_corriente: Array.from(
      new Set(temporalKeysBalance.ActivoNoCorriente)
    ),
    pasivo_corriente: Array.from(new Set(temporalKeysBalance.PasivoCorriente)),
    pasivo_no_corriente: Array.from(
      new Set(temporalKeysBalance.PasivoNoCorriente)
    ),
    patrimonio: Array.from(new Set(temporalKeysBalance.Patrimonio)),
  };

  keysEstado = {
    sub_productos_de_operacion: Array.from(
      new Set(temporalKeysEstado.sub_productos_de_operacion)
    ),
    sub_costos_y_gastos_de_operacion: Array.from(
      new Set(temporalKeysEstado.sub_costos_y_gastos_de_operacion)
    ),
    sub_ingresos_financieros: Array.from(
      new Set(temporalKeysEstado.sub_ingresos_financieros)
    ),
    sub_gastos_financieros: Array.from(
      new Set(temporalKeysEstado.sub_gastos_financieros)
    ),
    sub_impuestos_y_reservas: Array.from(
      new Set(temporalKeysEstado.sub_impuestos_y_reservas)
    ),
    sub_resultados_integrales: Array.from(
      new Set(temporalKeysEstado.sub_resultados_integrales)
    ),
    sub_utilidad_atribuible: Array.from(
      new Set(temporalKeysEstado.sub_utilidad_atribuible)
    ),
    sub_resultados_integrales_atribuible: Array.from(
      new Set(temporalKeysEstado.sub_resultados_integrales_atribuible)
    ),
    sub_utilidades_por_accion: Array.from(
      new Set(temporalKeysEstado.sub_utilidades_por_accion)
    ),
  };
});

const body = ref(null);
const input = useCounterStore();
let nivelPorcentaje = 2;
let tab = ref(null);
let generadorBalance = ref(false);
let generadorEstado = ref(false);
let showGraphicsBalance = ref(false);
let showGraphicsER = ref(false);
let año = ref([]);
let options = ["Balance General", "Estado de Resultados"];
let estado = ref(null);
let periods = [];
let keysBalance = {};
let keysEstado = {};
// let temporalVals = {};

// Variables que controlan la tabla del balance

let columnsActivo = ref([]);
let columnsPasivo = ref([]);
let columnsPatrimonio = ref([]);

let rowsActivo = ref([]);
let rowsPasivo = ref([]);
let rowsPatrimonio = ref([]);

// Variables que controlan la tabla del estado

let columnsTitulo = ref([]);
let rowsAnalisisEstado = ref([]);

function generarPDF() {
  pdfHandler.createRFReport(
    body.value,
    año.value + estado.value,
    "landscape",
    "Analisis vertical"
  );
}

const activarAnalisis = (año, estado) => {
  limpiarVariables();
  if (año === null || estado === null) {
    generadorBalance.value = false;
    generadorEstado.value = false;

    showGraphicsBalance.value = false;
    showGraphicsER.value = false;
    return alertas.alertaNegativa(
      "HA OCURRIDO UN ERROR",
      "Debes llenar los 2 campos"
    );
  }
  if (año.length === 0) {
    generadorBalance.value = false;
    generadorEstado.value = false;

    showGraphicsBalance.value = false;
    showGraphicsER.value = false;
    return alertas.alertaNegativa(
      "Ha Ocurrido un error",
      "Debes llenar los 2 campos"
    );
  }
  tab.value = año[0];
  if (estado === "Balance General") {
    showGraphicsBalance.value = true;
    showGraphicsER.value = false;
    generadorEstado.value = false;
    generadorBalance.value = true;
    columnsActivo.value.push("ACTIVO");
    columnsPasivo.value.push("PASIVO");
    columnsPatrimonio.value.push("PATRIMONIO");
    for (let a of año) {
      columnsActivo.value.push(a, "(%)");
      columnsPasivo.value.push(a, "(%)");
      columnsPatrimonio.value.push(a, "(%)");
    }
    activarAnalisisBalance(año);
  } else if (estado === "Estado de Resultados") {
    showGraphicsBalance.value = false;
    showGraphicsER.value = true;
    generadorBalance.value = false;
    generadorEstado.value = true;
    columnsTitulo.value.push("CUENTAS");
    for (let a of año) {
      columnsTitulo.value.push(a, "(%)");
    }
    activarAnalisisEstado(año);
  } else {
    showGraphicsBalance.value = false;
    showGraphicsBalance.value = true;
  }
};

const activarAnalisisBalance = (años) => {
  let contador = 0;
  for (let val of keysBalance.activo_corriente) {
    rowsActivo.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesBalance(año);
      let activoCorriente =
        totales.balance.activo.activo_corriente.get(val) || 0;
      rowsActivo.value[contador].push(
        activoCorriente,
        calcularPorcentaje(activoCorriente, totales.totalActivo).toFixed(
          nivelPorcentaje
        ) + "%"
      );
    }
    contador++;
  }

  // Esta parte es para crear la fila del total activo corriente

  rowsActivo.value.push(["Total Activo Corriente"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsActivo.value[contador].push(
      totales.totalActivoCorriente,
      calcularPorcentaje(
        totales.totalActivoCorriente,
        totales.totalActivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  for (let val of keysBalance.activo_no_corriente) {
    rowsActivo.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesBalance(año);
      let activoNoCorriente =
        totales.balance.activo.activo_no_corriente.get(val) || 0;
      rowsActivo.value[contador].push(
        activoNoCorriente,
        calcularPorcentaje(activoNoCorriente, totales.totalActivo).toFixed(
          nivelPorcentaje
        ) + "%"
      );
    }
    contador++;
  }

  // Esta parte es para crear el total del activo no corriente

  rowsActivo.value.push(["Total Activo No Corriente"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsActivo.value[contador].push(
      totales.totalActivoNoCorriente,
      calcularPorcentaje(
        totales.totalActivoNoCorriente,
        totales.totalActivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Finalmente la fila que crea el total del Activo

  rowsActivo.value.push(["Total Activo"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsActivo.value[contador].push(
      totales.totalActivo,
      calcularPorcentaje(totales.totalActivo, totales.totalActivo).toFixed(
        nivelPorcentaje
      ) + "%"
    );
  }

  contador++;

  // COMIENZA LA SECCION QUE LLENA LAS FILAS DEL PASIVO

  let contador2 = 0;

  for (let val of keysBalance.pasivo_corriente) {
    rowsPasivo.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesBalance(año);
      let pasivoCorriente =
        totales.balance.pasivo.pasivo_corriente.get(val) || 0;
      rowsPasivo.value[contador2].push(
        pasivoCorriente,
        calcularPorcentaje(pasivoCorriente, totales.totalPasivo).toFixed(
          nivelPorcentaje
        ) + "%"
      );
    }
    contador2++;
  }

  // Esta parte es para crear la fila del total del pasivo corriente

  rowsPasivo.value.push(["Total Pasivo Corriente"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsPasivo.value[contador2].push(
      totales.totalPasivoCorriente,
      calcularPorcentaje(
        totales.totalPasivoCorriente,
        totales.totalPasivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador2++;

  for (let val of keysBalance.pasivo_no_corriente) {
    rowsPasivo.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesBalance(año);
      let pasivoNoCorriente =
        totales.balance.pasivo.pasivo_no_corriente.get(val) || 0;
      rowsPasivo.value[contador2].push(
        pasivoNoCorriente,
        calcularPorcentaje(pasivoNoCorriente, totales.totalPasivo).toFixed(
          nivelPorcentaje
        ) + "%"
      );
    }
    contador2++;
  }

  // Esta parte es para crear la fila del total del pasivo no corriente

  rowsPasivo.value.push(["Total Pasivo No Corriente"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsPasivo.value[contador2].push(
      totales.totalPasivoNoCorriente,
      calcularPorcentaje(
        totales.totalPasivoNoCorriente,
        totales.totalPasivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador2++;

  // Finalmente la fila que crea el total del Pasivo

  rowsPasivo.value.push(["Total Pasivo"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsPasivo.value[contador2].push(
      totales.totalPasivo,
      calcularPorcentaje(totales.totalPasivo, totales.totalPasivo).toFixed(
        nivelPorcentaje
      ) + "%"
    );
  }

  // COMIENZA LA SECCION DEL PATRIMONIO

  let contador3 = 0;

  for (let val of keysBalance.patrimonio) {
    if (val === "Capital social") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        let patrimonio =
          totales.balance.patrimonio
            .get("sub_patrimonio_propietarios")
            .get("Capital social") || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    } else if (val === "Otros componentes del patrimonio") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0);
        let patrimonio =
          totales.balance.patrimonio
            .get("sub_patrimonio_propietarios")
            .get("Otros componentes del patrimonio") || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    } else if (val === "Reserval legal") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        let patrimonio =
          totales.balance.patrimonio
            .get("sub_patrimonio_propietarios")
            .get("Reserval legal") || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    } else if (val === "Utilidades retenidas") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        let patrimonio =
          totales.balance.patrimonio
            .get("sub_patrimonio_propietarios")
            .get("Utilidades retenidas") || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    } else if (val === "sub_patrimonio_propietarios") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        let patrimonio = totales.patrimonioAtribuible || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    } else {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        let patrimonio = totales.balance.patrimonio.get(val) || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(
            nivelPorcentaje
          ) + "%"
        );
      }
      contador3++;
    }
  }

  // Esta parte es para crear la fila del total patrimonio neto

  rowsPatrimonio.value.push(["Total Patrimonio Neto"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    let patrimonioPasivo = totales.totalPasivo + totales.totalPatrimonio || 0;
    rowsPatrimonio.value[contador3].push(
      totales.totalPatrimonio,
      calcularPorcentaje(totales.totalPatrimonio, patrimonioPasivo).toFixed(
        nivelPorcentaje
      ) + "%"
    );
  }

  contador3++;

  rowsPatrimonio.value.push(["Total Pasivo + Patrimonio Neto"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    let patrimonioPasivo = totales.totalPasivo + totales.totalPatrimonio || 0;
    rowsPatrimonio.value[contador3].push(
      patrimonioPasivo,
      calcularPorcentaje(patrimonioPasivo, patrimonioPasivo).toFixed(
        nivelPorcentaje
      ) + "%"
    );
  }
};

const activarAnalisisEstado = (años) => {
  let contador = 0;

  // Productos de Operacion (Que viene a ser las Ventas)

  rowsAnalisisEstado.value.push(["Ingresos"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.ProductosOperacion,
      calcularPorcentaje(
        totales.ProductosOperacion,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas de Productos de Operacion

  for (let val of keysEstado.sub_productos_de_operacion) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let productosOperacion =
        totales.estado.sub_productos_de_operacion.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        productosOperacion,
        calcularPorcentaje(
          productosOperacion,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  rowsAnalisisEstado.value.push(["Costos Y Gastos de Operacion"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push("-", "-");
  }

  contador++;

  // Cuentas de Costos y Gastos de Operacion

  for (let val of keysEstado.sub_costos_y_gastos_de_operacion) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let cuentaUtilidadOperacion =
        totales.estado.sub_costos_y_gastos_de_operacion.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        cuentaUtilidadOperacion,
        calcularPorcentaje(
          cuentaUtilidadOperacion,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Costos de Energia

  // rowsAnalisisEstado.value.push(["Costos de Energía"]);
  // for(let año of años){
  //     let totales = obtenerTotalesEstado(año);
  //     rowsAnalisisEstado.value[contador].push(totales.CostosEnergia, calcularPorcentaje(totales.CostosEnergia, totales.ProductosOperacion).toFixed(nivelPorcentaje) + "%");
  // }

  // contador++;

  // Utilidad Bruta

  // rowsAnalisisEstado.value.push(["MARGEN COMPRA VENTA DE ENERGIA"]);
  // for(let año of años){
  //     let totales = obtenerTotalesEstado(año);
  //     rowsAnalisisEstado.value[contador].push(totales.utilidadBruta, calcularPorcentaje(totales.utilidadBruta, totales.ProductosOperacion).toFixed(nivelPorcentaje) + "%");
  // }

  // contador++;

  rowsAnalisisEstado.value.push(["Total Costos y Gastos de Operación"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.costosYGastosOperacion,
      calcularPorcentaje(
        totales.costosYGastosOperacion,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // let contador2 = 0;

  // Cuentas de Utilidad Operativa

  // for(let val of keysEstado.sub_costos_y_gastos_de_operacion){
  //   rowsAnalisisEstado.value.push([val]);
  //   for (let año of años) {
  //     let totales = obtenerTotalesEstado(año);
  //     let cuentaUtilidadOperativa =
  //       totales.estado.sub_costos_y_gastos_de_operacion.get(val) || 0;
  //     rowsAnalisisEstado.value[contador].push(
  //       cuentaUtilidadOperativa,
  //       calcularPorcentaje(cuentaUtilidadOperativa, totales.ProductosOperacion).toFixed(nivelPorcentaje) +
  //         "%"
  //     );
  //   }
  //   contador++;
  // }

  // Utilidad Operativa

  rowsAnalisisEstado.value.push(["UTILIDAD DE OPERACIÓN"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.utilidadOperacion,
      calcularPorcentaje(
        totales.utilidadOperacion,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas de Gastos e Ingresos Financieros

  rowsAnalisisEstado.value.push(["Gastos Financieros"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.gastosFinancieros,
      calcularPorcentaje(
        totales.gastosFinancieros,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  rowsAnalisisEstado.value.push(["Ingresos Financieros"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.productosFinancieros,
      calcularPorcentaje(
        totales.productosFinancieros,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // for(let val of keysEstado.sub_productos_financieros){
  //   rowsAnalisisEstado.value.push([val]);
  //   for (let año of años) {
  //     let totales = obtenerTotalesEstado(año);
  //     let cuentaUtilidadAntesImpuestos =
  //       totales.estado.sub_productos_financieros.get(val) || 0;
  //     rowsAnalisisEstado.value[contador].push(
  //       cuentaUtilidadAntesImpuestos,
  //       calcularPorcentaje(cuentaUtilidadAntesImpuestos, totales.ProductosOperacion).toFixed(nivelPorcentaje) +
  //         "%"
  //     );
  //   }
  //   contador++;
  // }

  // Utilidad Antes de Impuestos

  rowsAnalisisEstado.value.push(["UTILIDAD ANTES DE IMPUESTOS Y RESERVAS"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.utilidadAntesImpuestos,
      calcularPorcentaje(
        totales.utilidadAntesImpuestos,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas Impuestos y Reservas

  for (let val of keysEstado.sub_impuestos_y_reservas) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let cuentaUtilidadNeta =
        totales.estado.sub_impuestos_y_reservas.get(val) || 0;
      // console.log(val, cuentaUtilidadNeta)
      rowsAnalisisEstado.value[contador].push(
        cuentaUtilidadNeta,
        calcularPorcentaje(
          cuentaUtilidadNeta,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Utilidad Neta

  rowsAnalisisEstado.value.push(["UTILIDAD NETA"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.utilidadNeta,
      calcularPorcentaje(
        totales.utilidadNeta,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas resultados integrales

  for (let val of keysEstado.sub_resultados_integrales) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let cuentaResultadoIntegral =
        totales.estado.sub_resultados_integrales.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        cuentaResultadoIntegral,
        calcularPorcentaje(
          cuentaResultadoIntegral,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Total cuentas resultados integrales

  rowsAnalisisEstado.value.push([
    "Otros resultados integrales, netos de impuesto sobre la renta",
  ]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.sub_resultados_integrales,
      calcularPorcentaje(
        totales.sub_resultados_integrales,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Resultados Integrales del Año

  rowsAnalisisEstado.value.push(["RESULTADOS INTEGRALES DEL AÑO"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    rowsAnalisisEstado.value[contador].push(
      totales.resultadosIntegralesAño,
      calcularPorcentaje(
        totales.resultadosIntegralesAño,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Sub Utilidad Atribuible

  for (let val of keysEstado.sub_utilidad_atribuible) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let utilidadAtribuible =
        totales.estado.sub_utilidad_atribuible.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        utilidadAtribuible,
        calcularPorcentaje(
          utilidadAtribuible,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Sub Integrales Atribuible

  for (let val of keysEstado.sub_resultados_integrales_atribuible) {
    rowsAnalisisEstado.value.push([val]);
    for (let año of años) {
      let totales = obtenerTotalesEstado(año);
      let integralAtribuible = 0;
      if (totales.estado.sub_resultados_integrales_atribuible) {
        integralAtribuible =
          totales.estado.sub_resultados_integrales_atribuible.get(val);
      }
      rowsAnalisisEstado.value[contador].push(
        integralAtribuible,
        calcularPorcentaje(
          integralAtribuible,
          totales.ProductosOperacion
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Sub Utilidades Por Accion Controladora

  rowsAnalisisEstado.value.push(["Utilidad por acción, compañía controladora"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    let utilidadAccionControladora =
      totales.estado.sub_utilidades_por_accion.get(
        "Utilidad por acción, compañía controladora"
      ) || 0;
    rowsAnalisisEstado.value[contador].push(
      utilidadAccionControladora,
      calcularPorcentaje(
        utilidadAccionControladora,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Sub Utilidades Por Accion Subsidiaria

  rowsAnalisisEstado.value.push(["Utilidad por acción, compañía subsidiaria"]);
  for (let año of años) {
    let totales = obtenerTotalesEstado(año);
    let utilidadAccionSubsidiaria =
      totales.estado.sub_utilidades_por_accion.get(
        "Utilidad por acción, compañía subsidiaria"
      ) || 0;
    rowsAnalisisEstado.value[contador].push(
      utilidadAccionSubsidiaria,
      calcularPorcentaje(
        utilidadAccionSubsidiaria,
        totales.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }
};

const calcularPorcentaje = (numerador, denominador) => {
  return (numerador / denominador) * 100;
};

const obtenerDatosRazones = (año) => {
  const totalesBalance = obtenerTotalesBalance(año);
  const totalesEstado = obtenerTotalesEstado(año);

  const balance = totalesBalance.balance;
  const activo = totalesBalance.totalActivo;
  const pasivo = totalesBalance.totalPasivo;
  const activo_corriente = totalesBalance.totalActivoCorriente;
  const pasivo_corriente = totalesBalance.totalPasivoCorriente;
  const activo_no_corriente = totalesBalance.totalActivoNoCorriente;
  const pasivo_no_corriente = totalesBalance.totalPasivoNoCorriente;

  return {
    balance,
    activo,
    pasivo,
    activo_corriente,
    activo_no_corriente,
    pasivo_corriente,
    pasivo_no_corriente,
  };
};

const limpiarVariables = () => {
  columnsActivo.value = [];
  columnsPasivo.value = [];
  columnsPatrimonio.value = [];
  rowsActivo.value = [];
  rowsPasivo.value = [];
  rowsPatrimonio.value = [];

  columnsTitulo.value = [];
  rowsAnalisisEstado.value = [];
};
</script>

<style scoped>
.info-container {
  margin: 1.5rem 2.5rem;
  padding: 1.5rem;
  border-radius: 16px;
}

.graphics-container {
  margin: 1.5rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
.title label {
  color: #fff;
  font-size: 1.5rem;
}

.estado-financiero_container,
.periodo-container {
  display: grid;
  grid-template-columns: 150px 250px;
  align-items: center;
  margin-top: 1.5rem;
}

.estado-financiero_container label {
  color: #fff;
  font-size: 1rem;
}
/* CSS */
.buttom {
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  height: 48px;
  letter-spacing: 0.25px;
  padding: 2px 24px;
}

.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.vertical-seccion-container {
  margin: 1.7rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
</style>
