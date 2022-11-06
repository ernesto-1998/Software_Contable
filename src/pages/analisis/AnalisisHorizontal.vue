<template>
  <div class="vertical-container">
    <div class="info-container bg-secondary">
      <div class="title">
        <label>
          Análisis <span class="text-weight-bold">Horizontal</span>
        </label>
      </div>
      <div class="estado-financiero_container">
        <label>Estado Financiero: </label>
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
          label="Estado Financiero"
        />
      </div>
      <div class="periodo-container">
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
          v-model="periodo1"
          :options="periods"
          label="Comparar periodo"
        />

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
          v-model="periodo2"
          :options="periods"
          label="Con el periodo"
          class="periodo2"
        />
      </div>
      <div class="row justify-end q-py-md">
        <q-btn
          color="primary"
          label="Generar PDF"
          no-caps
          @click="generarPDF"
          class="q-mr-xl buttom"
        />
        <q-btn
          color="primary"
          label="Generar Análisis"
          no-caps
          @click="activarAnalisis(periodo1, periodo2, estado)"
          class="q-mr-xl buttom"
        />
      </div>
    </div>

    <div
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
      class="info-container bg-secondary"
    >
      <div class="row q-gutter-x-lg justify-evenly">
        <div class="col-md-auto">
          <GraficoRosquillaBalance
            v-if="showGraphicsBalance"
            :periodos="[periodo1, periodo2]"
          />
          <GraficoCuentasER
            v-if="showGraphicsER"
            :periodos="[periodo1, periodo2]"
          />
        </div>
        <div class="col-md-auto">
          <GraficoUtilidades
            v-if="showGraphicsER"
            :periodos="[periodo1, periodo2]"
          />
          <GraficoCuentasBalance
            v-if="showGraphicsBalance"
            :periodos="[periodo1, periodo2]"
          />
        </div>
      </div>
      <div class="q-mt-lg">
        <radarBalance
          v-if="showGraphicsBalance"
          :periodos="[periodo1, periodo2]"
        />
        <rosquillaER v-if="showGraphicsER" :periodos="[periodo1, periodo2]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watch, onUpdated } from "vue";
import { getKeysBalance, getKeysEstado } from "../../utils/getKeys.js";
import { useCounterStore } from "stores/estados";
import {
  obtenerTotalesBalance,
  obtenerTotalesEstado,
} from "../../utils/totales.js";
import { pdfHandler } from "../../utils/generatePDF.js";
import TablaAnalisisBalance from "../../components/AnalisisVertical-Horizontal/TablaAnalisisBalance.vue";
import TablaAnalisisEstado from "../../components/AnalisisVertical-Horizontal/TablaAnalisisEstado.vue";

import GraficoRosquillaBalance from "src/components/graphics/GraficoRosquillaBalance.vue";
import GraficoUtilidades from "src/components/graphics/GraficoUtilidades.vue";
import GraficoCuentasER from "src/components/graphics/GraficoCuentasER.vue";
import GraficoCuentasBalance from "src/components/graphics/GraficoCuentasBalance.vue";
import radarBalance from "src/components/graphics/radarBalance.vue";
import rosquillaER from "src/components/graphics/rosquillaER.vue";

onBeforeMount(() => {
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
    sub_productos_de_operacion: Array.from(new Set(temporalKeysEstado.sub_productos_de_operacion)),
    sub_costos_y_gastos_de_operacion: Array.from(new Set(temporalKeysEstado.sub_costos_y_gastos_de_operacion)),
    sub_ingresos_financieros: Array.from(new Set(temporalKeysEstado.sub_ingresos_financieros)),
    sub_gastos_financieros: Array.from(new Set(temporalKeysEstado.sub_gastos_financieros)),
    sub_impuestos_y_reservas: Array.from(new Set(temporalKeysEstado.sub_impuestos_y_reservas)),
    sub_resultados_integrales: Array.from(new Set(temporalKeysEstado.sub_impuestos_y_reservas)),
    sub_utilidad_atribuible: Array.from(new Set(temporalKeysEstado.sub_utilidad_atribuible)),
    sub_resultados_integrales_atribuible: Array.from(new Set(temporalKeysEstado.sub_resultados_integrales_atribuible)),
    sub_utilidades_por_accion: Array.from(new Set(temporalKeysEstado.sub_utilidades_por_accion)),
  }
    sub_productos_de_operacion: Array.from(
      new Set(temporalKeysEstado.sub_productos_de_operacion)
    ),
    sub_gastos_financieros: Array.from(
      new Set(temporalKeysEstado.sub_gastos_financieros)
    ),
    sub_costos_de_energia: Array.from(
      new Set(temporalKeysEstado.sub_costos_de_energia)
    ),
    sub_costos_y_gastos_de_operacion: Array.from(
      new Set(temporalKeysEstado.sub_costos_y_gastos_de_operacion)
    ),
    sub_productos_financieros: Array.from(
      new Set(temporalKeysEstado.sub_productos_financieros)
    ),
    sub_impuestos_y_reservas: Array.from(
      new Set(temporalKeysEstado.sub_impuestos_y_reservas)
    ),
  };
});

const input = useCounterStore();
let nivelPorcentaje = 2;
let estado = ref(null);
let options = ["Balance General", "Estado de Resultados"];
const showGraphicsBalance = ref(false);
const showGraphicsER = ref(false);
let periodo1 = ref(null);
let periodo2 = ref(null);
let periods = [];
let generadorBalance = ref(false);
let generadorEstado = ref(false);
let keysBalance = {};
let keysEstado = {};

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
  pdfHandler.create(document.getElementById("balance"));
}

const activarAnalisis = (periodo1, periodo2, estado) => {
  limpiarVariables();
  if (periodo1 === null || periodo2 === null || estado === null) {
    generadorBalance.value = false;
    generadorEstado.value = false;

    showGraphicsBalance.value = false;
    showGraphicsER.value = false;
    return alert("Debes todos los campos");
  }
  if (estado === "Balance General") {
    generadorEstado.value = false;
    generadorBalance.value = true;
    showGraphicsBalance.value = true;
    showGraphicsER.value = false;

    columnsActivo.value.push(
      "ACTIVO",
      periodo2,
      periodo1,
      "Variación Absoluta",
      "Variación Relativa"
    );
    columnsPasivo.value.push(
      "PASIVO",
      periodo2,
      periodo1,
      "Variación Absoluta",
      "Variación Relativa"
    );
    columnsPatrimonio.value.push(
      "PATRIMONIO",
      periodo2,
      periodo1,
      "Variación Absoluta",
      "Variación Relativa"
    );
    activarAnalisisBalance(periodo1, periodo2);
  } else if (estado === "Estado de Resultados") {
    generadorBalance.value = false;
    generadorEstado.value = true;
    showGraphicsBalance.value = false;
    showGraphicsER.value = true;

    columnsTitulo.value.push(
      "CUENTAS",
      periodo2,
      periodo1,
      "Variación Absoluta",
      "Variación Relativa"
    );
    activarAnalisisEstado(periodo1, periodo2);
  }
};

const activarAnalisisBalance = (periodo1, periodo2) => {
  let contador = 0;

  for (let val of keysBalance.activo_corriente) {
    rowsActivo.value.push([val]);
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    let activoCorriente1 =
      totales1.balance.activo.activo_corriente.get(val) || 0;
    let activoCorriente2 =
      totales2.balance.activo.activo_corriente.get(val) || 0;
    rowsActivo.value[contador].push(
      activoCorriente2,
      activoCorriente1,
      calcularVariacionAbsoluta(activoCorriente1, activoCorriente2).toFixed(
        nivelPorcentaje
      ),
      calcularVariacionRelativa(activoCorriente1, activoCorriente2).toFixed(
        nivelPorcentaje
      ) + "%"
    );
    contador++;
  }

  // Esta parte es para crear la fila del total activo corriente

  rowsActivo.value.push(["Total Activo Corriente"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsActivo.value[contador].push(
      totales2.totalActivoCorriente,
      totales1.totalActivoCorriente,
      calcularVariacionAbsoluta(
        totales1.totalActivoCorriente,
        totales2.totalActivoCorriente
      ),
      calcularVariacionRelativa(
        totales1.totalActivoCorriente,
        totales2.totalActivoCorriente
      ).toFixed(nivelPorcentaje) + "%"
    );
  }
  contador++;

  for (let val of keysBalance.activo_no_corriente) {
    rowsActivo.value.push([val]);
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    let activoNoCorriente1 =
      totales1.balance.activo.activo_no_corriente.get(val) || 0;
    let activoNoCorriente2 =
      totales2.balance.activo.activo_no_corriente.get(val) || 0;
    rowsActivo.value[contador].push(
      activoNoCorriente2,
      activoNoCorriente1,
      calcularVariacionAbsoluta(activoNoCorriente1, activoNoCorriente2),
      calcularVariacionRelativa(activoNoCorriente1, activoNoCorriente2).toFixed(
        nivelPorcentaje
      ) + "%"
    );
    contador++;
  }

  // Esta parte es para crear el total del activo no corriente

  rowsActivo.value.push(["Total Activo No Corriente"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsActivo.value[contador].push(
      totales2.totalActivoNoCorriente,
      totales1.totalActivoNoCorriente,
      calcularVariacionAbsoluta(
        totales1.totalActivoNoCorriente,
        totales2.totalActivoNoCorriente
      ),
      calcularVariacionRelativa(
        totales1.totalActivoNoCorriente,
        totales2.totalActivoNoCorriente
      ).toFixed(nivelPorcentaje) + "%"
    );
  }
  contador++;

  // Finalmente la fila que crea el total del Activo

  rowsActivo.value.push(["Total Activo"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsActivo.value[contador].push(
      totales2.totalActivo,
      totales1.totalActivo,
      calcularVariacionAbsoluta(totales1.totalActivo, totales2.totalActivo),
      calcularVariacionRelativa(
        totales1.totalActivo,
        totales2.totalActivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // COMIENZA LA SECCION QUE LLENA LAS FILAS DEL PASIVO

  let contador2 = 0;

  for (let val of keysBalance.pasivo_corriente) {
    rowsPasivo.value.push([val]);
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    let pasivoCorriente1 =
      totales1.balance.pasivo.pasivo_corriente.get(val) || 0;
    let pasivoCorriente2 =
      totales2.balance.pasivo.pasivo_corriente.get(val) || 0;
    rowsPasivo.value[contador2].push(
      pasivoCorriente2,
      pasivoCorriente1,
      calcularVariacionAbsoluta(pasivoCorriente1, pasivoCorriente2),
      calcularVariacionRelativa(pasivoCorriente1, pasivoCorriente2).toFixed(
        nivelPorcentaje
      ) + "%"
    );
    contador2++;
  }

  // Esta parte es para crear la fila del total del pasivo corriente

  rowsPasivo.value.push(["Total Pasivo Corriente"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsPasivo.value[contador2].push(
      totales2.totalPasivoCorriente,
      totales1.totalPasivoCorriente,
      calcularVariacionAbsoluta(
        totales1.totalPasivoCorriente,
        totales2.totalPasivoCorriente
      ),
      calcularVariacionRelativa(
        totales1.totalPasivoCorriente,
        totales2.totalPasivoCorriente
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador2++;

  for (let val of keysBalance.pasivo_no_corriente) {
    rowsPasivo.value.push([val]);
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    let pasivoNoCorriente1 =
      totales1.balance.pasivo.pasivo_no_corriente.get(val) || 0;
    let pasivoNoCorriente2 =
      totales2.balance.pasivo.pasivo_no_corriente.get(val) || 0;
    rowsPasivo.value[contador2].push(
      pasivoNoCorriente2,
      pasivoNoCorriente1,
      calcularVariacionAbsoluta(pasivoNoCorriente1, pasivoNoCorriente2),
      calcularVariacionRelativa(pasivoNoCorriente1, pasivoNoCorriente2).toFixed(
        nivelPorcentaje
      ) + "%"
    );
    contador2++;
  }

  // Esta parte es para crear la fila del total del pasivo no corriente

  rowsPasivo.value.push(["Total Pasivo No Corriente"]);
  let totales1 = obtenerTotalesBalance(periodo1);
  let totales2 = obtenerTotalesBalance(periodo2);
  rowsPasivo.value[contador2].push(
    totales2.totalPasivoNoCorriente,
    totales1.totalPasivoNoCorriente,
    calcularVariacionAbsoluta(
      totales1.totalPasivoNoCorriente,
      totales2.totalPasivoNoCorriente
    ),
    calcularVariacionRelativa(
      totales1.totalPasivoNoCorriente,
      totales2.totalPasivoNoCorriente
    ).toFixed(nivelPorcentaje) + "%"
  );

  contador2++;

  // Finalmente la fila que crea el total del Pasivo

  rowsPasivo.value.push(["Total Pasivo"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsPasivo.value[contador2].push(
      totales2.totalPasivo,
      totales1.totalPasivo,
      calcularVariacionAbsoluta(totales1.totalPasivo, totales2.totalPasivo),
      calcularVariacionRelativa(
        totales1.totalPasivo,
        totales2.totalPasivo
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  // COMIENZA LA SECCION DEL PATRIMONIO

  let contador3 = 0;

  for (let val of keysBalance.patrimonio) {
    if (val === "Capital social mínimo") {
      rowsPatrimonio.value.push([val]);
      let totales1 = obtenerTotalesBalance(periodo1);
      let totales2 = obtenerTotalesBalance(periodo2);

      let patrimonio1 = totales1.CapitalSocialMinimo || 0;
      let patrimonio2 = totales2.CapitalSocialMinimo || 0;
      // let patrimonioPasivo1 =
      //   totales1.totalPasivo + totales1.totalPatrimonio || 0;
      // let patrimonioPasivo2 =
      //   totales2.totalPasivo + totales2.totalPatrimonio || 0;
      rowsPatrimonio.value[contador3].push(
        patrimonio2,
        patrimonio1,
        calcularVariacionAbsoluta(patrimonio1, patrimonio2),
        calcularVariacionRelativa(patrimonio1, patrimonio2).toFixed(
          nivelPorcentaje
        ) + "%"
      );
      contador3++;
    } else if (val === "Capital social variable") {
      rowsPatrimonio.value.push([val]);

      let totales1 = obtenerTotalesBalance(periodo1);
      let totales2 = obtenerTotalesBalance(periodo2);
      let patrimonio1 = totales1.CapitalSocialVariable || 0;
      let patrimonio2 = totales2.CapitalSocialVariable || 0;
      // let patrimonioPasivo =
      //   totales.totalPasivo + totales.totalPatrimonio || 0;
      rowsPatrimonio.value[contador3].push(
        patrimonio2,
        patrimonio1,
        calcularVariacionAbsoluta(patrimonio1, patrimonio2),
        calcularVariacionRelativa(patrimonio1, patrimonio2).toFixed(
          nivelPorcentaje
        ) + "%"
      );
      contador3++;
    } else if (val === "sub_capital_social") {
      rowsPatrimonio.value.push([val]);

      let totales1 = obtenerTotalesBalance(periodo1);
      let totales2 = obtenerTotalesBalance(periodo2);
      let patrimonio1 = totales1.totalCapitalSocial || 0;
      let patrimonio2 = totales2.totalCapitalSocial || 0;

      rowsPatrimonio.value[contador3].push(
        patrimonio2,
        patrimonio1,
        calcularVariacionAbsoluta(patrimonio1, patrimonio2),
        calcularVariacionRelativa(patrimonio1, patrimonio2).toFixed(
          nivelPorcentaje
        ) + "%"
      );
      contador3++;
    } else {
      rowsPatrimonio.value.push([val]);
      let totales1 = obtenerTotalesBalance(periodo1);
      let totales2 = obtenerTotalesBalance(periodo2);
      let patrimonio1 = totales1.balance.patrimonio.get(val) || 0;
      let patrimonio2 = totales2.balance.patrimonio.get(val) || 0;
      rowsPatrimonio.value[contador3].push(
        patrimonio2,
        patrimonio1,
        calcularVariacionAbsoluta(patrimonio1, patrimonio2),
        calcularVariacionRelativa(patrimonio1, patrimonio2).toFixed(
          nivelPorcentaje
        ) + "%"
      );
      contador3++;
    }
  }

  // Esta parte es para crear la fila del total patrimonio neto

  rowsPatrimonio.value.push(["Total Patrimonio Neto"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    rowsPatrimonio.value[contador3].push(
      totales2.totalPatrimonio,
      totales1.totalPatrimonio,
      calcularVariacionAbsoluta(
        totales1.totalPatrimonio,
        totales2.totalPatrimonio
      ),
      calcularVariacionRelativa(
        totales1.totalPatrimonio,
        totales2.totalPatrimonio
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador3++;

  rowsPatrimonio.value.push(["Total Pasivo + Patrimonio Neto"]);
  {
    let totales1 = obtenerTotalesBalance(periodo1);
    let totales2 = obtenerTotalesBalance(periodo2);
    let patrimonioPasivo1 =
      totales1.totalPasivo + totales1.totalPatrimonio || 0;
    let patrimonioPasivo2 =
      totales2.totalPasivo + totales2.totalPatrimonio || 0;
    rowsPatrimonio.value[contador3].push(
      patrimonioPasivo2,
      patrimonioPasivo1,
      calcularVariacionAbsoluta(patrimonioPasivo1, patrimonioPasivo2),
      calcularVariacionRelativa(patrimonioPasivo1, patrimonioPasivo2).toFixed(
        nivelPorcentaje
      ) + "%"
    );
  }
};

const activarAnalisisEstado = (periodo1, periodo2) => {
  let contador = 0;

  // Productos de Operacion (Que viene a ser las Ventas)

  rowsAnalisisEstado.value.push(["PRODUCTOS DE OPERACIÓN"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.ProductosOperacion,
      totales1.ProductosOperacion,
      calcularVariacionAbsoluta(
        totales1.ProductosOperacion,
        totales2.ProductosOperacion
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.ProductosOperacion,
        totales2.ProductosOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas de Productos de Operacion

  for (let val of keysEstado.sub_productos_de_operacion) {
    rowsAnalisisEstado.value.push([val]);
    {
      let totales1 = obtenerTotalesEstado(periodo1);
      let totales2 = obtenerTotalesEstado(periodo2);
      let productosOperacion1 =
        totales1.estado.sub_productos_de_operacion.get(val) || 0;
      let productosOperacion2 =
        totales2.estado.sub_productos_de_operacion.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        productosOperacion2,
        productosOperacion1,
        calcularVariacionAbsoluta(
          productosOperacion1,
          productosOperacion2
        ).toFixed(nivelPorcentaje),
        calcularVariacionRelativa(
          productosOperacion1,
          productosOperacion2
        ).toFixed(nivelPorcentaje) + "%"
      );
      contador++;
    }
  }

  // Costos de Energia

  rowsAnalisisEstado.value.push(["Costos de Energía"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.CostosEnergia,
      totales1.CostosEnergia,
      calcularVariacionAbsoluta(
        totales1.CostosEnergia,
        totales2.CostosEnergia
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.CostosEnergia,
        totales2.CostosEnergia
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Utilidad Bruta

  rowsAnalisisEstado.value.push(["MARGEN COMPRA VENTA DE ENERGIA"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.utilidadBruta,
      totales1.utilidadBruta,
      calcularVariacionAbsoluta(
        totales1.utilidadBruta,
        totales2.utilidadBruta
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.utilidadBruta,
        totales2.utilidadBruta
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // let contador2 = 0;

  // Cuentas de Utilidad Operativa

  for (let val of keysEstado.sub_costos_y_gastos_de_operacion) {
    rowsAnalisisEstado.value.push([val]);
    {
      let totales1 = obtenerTotalesEstado(periodo1);
      let totales2 = obtenerTotalesEstado(periodo2);
      let cuentaUtilidadOperativa1 =
        totales1.estado.sub_costos_y_gastos_de_operacion.get(val) || 0;
      let cuentaUtilidadOperativa2 =
        totales2.estado.sub_costos_y_gastos_de_operacion.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        cuentaUtilidadOperativa2,
        cuentaUtilidadOperativa1,
        calcularVariacionAbsoluta(
          cuentaUtilidadOperativa1,
          cuentaUtilidadOperativa2
        ).toFixed(nivelPorcentaje),
        calcularVariacionRelativa(
          cuentaUtilidadOperativa1,
          cuentaUtilidadOperativa2
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Utilidad Operativa

  rowsAnalisisEstado.value.push(["UTILIDAD DE OPERACIÓN"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.utilidadOperacion,
      totales1.utilidadOperacion,
      calcularVariacionAbsoluta(
        totales1.utilidadOperacion,
        totales2.utilidadOperacion
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.utilidadOperacion,
        totales2.utilidadOperacion
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas de Utilidad Antes de Impuestos y Reservas

  rowsAnalisisEstado.value.push(["Gastos Financieros"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.gastosFinancieros,
      totales1.gastosFinancieros,
      calcularVariacionAbsoluta(
        totales1.gastosFinancieros,
        totales2.gastosFinancieros
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.gastosFinancieros,
        totales2.gastosFinancieros
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  for (let val of keysEstado.sub_productos_financieros) {
    rowsAnalisisEstado.value.push([val]);
    {
      let totales1 = obtenerTotalesEstado(periodo1);
      let totales2 = obtenerTotalesEstado(periodo2);
      let cuentaUtilidadAntesImpuestos1 =
        totales1.estado.sub_productos_financieros.get(val) || 0;
      let cuentaUtilidadAntesImpuestos2 =
        totales2.estado.sub_productos_financieros.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        cuentaUtilidadAntesImpuestos2,
        cuentaUtilidadAntesImpuestos1,
        calcularVariacionAbsoluta(
          cuentaUtilidadAntesImpuestos1,
          cuentaUtilidadAntesImpuestos2
        ).toFixed(nivelPorcentaje),
        calcularVariacionRelativa(
          cuentaUtilidadAntesImpuestos1,
          cuentaUtilidadAntesImpuestos2
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  // Utilidad Antes de Impuestos

  rowsAnalisisEstado.value.push(["UTILIDAD ANTES DE IMPUESTOS Y RESERVAS"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.gastosFinancieros,
      totales1.gastosFinancieros,
      calcularVariacionAbsoluta(
        totales1.gastosFinancieros,
        totales2.gastosFinancieros
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.gastosFinancieros,
        totales2.gastosFinancieros
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;

  // Cuentas Utilidad por Distribuir (Neta)

  for (let val of keysEstado.sub_impuestos_y_reservas) {
    rowsAnalisisEstado.value.push([val]);
    {
      let totales1 = obtenerTotalesEstado(periodo1);
      let totales2 = obtenerTotalesEstado(periodo2);
      let cuentaUtilidadNeta1 =
        totales1.estado.sub_impuestos_y_reservas.get(val) || 0;
      let cuentaUtilidadNeta2 =
        totales2.estado.sub_impuestos_y_reservas.get(val) || 0;
      rowsAnalisisEstado.value[contador].push(
        cuentaUtilidadNeta2,
        cuentaUtilidadNeta1,
        calcularVariacionAbsoluta(
          cuentaUtilidadNeta1,
          cuentaUtilidadNeta2
        ).toFixed(nivelPorcentaje),
        calcularVariacionRelativa(
          cuentaUtilidadNeta1,
          cuentaUtilidadNeta2
        ).toFixed(nivelPorcentaje) + "%"
      );
    }
    contador++;
  }

  rowsAnalisisEstado.value.push(["UTILIDAD POR DISTRIBUIR"]);
  {
    let totales1 = obtenerTotalesEstado(periodo1);
    let totales2 = obtenerTotalesEstado(periodo2);
    rowsAnalisisEstado.value[contador].push(
      totales2.utilidadNeta,
      totales1.utilidadNeta,
      calcularVariacionAbsoluta(
        totales1.utilidadNeta,
        totales2.utilidadNeta
      ).toFixed(nivelPorcentaje),
      calcularVariacionRelativa(
        totales1.utilidadNeta,
        totales2.utilidadNeta
      ).toFixed(nivelPorcentaje) + "%"
    );
  }

  contador++;
};

const calcularVariacionAbsoluta = (periodo1, periodo2) => {
  return periodo1 - periodo2;
};

const calcularVariacionRelativa = (periodo1, periodo2) => {
  if (periodo1 === 0 && periodo2 === 0) {
    return 0;
  }
  if (periodo2 === 0) {
    return 100;
  }
  return (periodo1 / periodo2 - 1) * 100;
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

watch(periodo1, () => {
  if (showGraphicsBalance.value) {
    showGraphicsBalance.value = false;
  }

  if (showGraphicsBalance.value) {
    showGraphicsER.value = false;
  }
});

watch(periodo2, () => {
  if (showGraphicsBalance.value) {
    showGraphicsBalance.value = false;
  }

  if (showGraphicsER.value) {
    showGraphicsER.value = false;
  }
});

watch(estado, () => {
  if (showGraphicsBalance.value) {
    showGraphicsBalance.value = false;
  }
  if (showGraphicsER.value) {
    showGraphicsER.value = false;
  }
});
</script>

<style scoped>
.vertical-container {
  height: 100vh;
}
.info-container {
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
  margin-top: 3rem;
}

.estado-financiero_container label {
  color: #fff;
  font-size: 1rem;
}

.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.periodo2 {
  position: relative;
  bottom: 55px;
  left: 550px;
}

.buttom {
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  height: 48px;
  letter-spacing: 0.25px;
  padding: 2px 24px;
}

.vertical-seccion-container {
  margin: 1.7rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
</style>
