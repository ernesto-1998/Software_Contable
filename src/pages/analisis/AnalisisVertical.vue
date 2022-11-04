<template>
  <div class="analisis-vertical_container">
    <div class="info-container bg-secondary">
      <div class="title">
        <label> Análisis Vertical </label>
      </div>
      <div class="estado-financiero_container">
        <label>Periodo: </label>
        <q-select
          filled
          v-model="año"
          multiple
          :options="periods"
          label="Periodos"
          style="width: 250px"
        />
      </div>
      <div class="periodo-container">
        <label>Estados: </label>
        <q-select filled v-model="estado" :options="options" label="Estado" />
      </div>
      <div class="button-container">
        <button class="btn-activar" @click="activarAnalisis(año, estado)">
          Generar
        </button>
      </div>
    </div>

    <div
      v-if="generador === true"
      class="vertical-seccion-container bg-positive"
    >
      <TablaVerticalBalance
        :columnsActivo="columnsActivo"
        :columnsPasivo="columnsPasivo"
        :columnsPatrimonio="columnsPatrimonio"
        :rowsActivo="rowsActivo"
        :rowsPasivo="rowsPasivo"
        :rowsPatrimonio="rowsPatrimonio"
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
              <EspecificosBalance
                :periodo="parseInt(periodo)"
                :ids="[
                  periodo + 'eB1',
                  periodo + 'eB2',
                  periodo + 'eB3',
                  periodo + 'eB4',
                  periodo + 'eB5',
                  periodo + 'eB6',
                ]"
              />
            </div>
            <div>
              <AbsolutosBalance
                :periodo="periodo"
                :ids="[periodo + 'aB1', periodo + 'aB2']"
              />
            </div>
          </div>
          <div v-if="showGraphicsER" class="q-pa-none">
            <EspecificosER
              :periodo="parseInt(periodo)"
              :ids="[
                periodo + 'eR1',
                periodo + 'eR2',
                periodo + 'eR3',
                periodo + 'eR4',
                periodo + 'eR5',
                periodo + 'eR6',
              ]"
            />
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
import { ref, onBeforeMount, watch } from "vue";
import { useCounterStore } from "stores/estados";
import TablaVerticalBalance from "../../components/AnalisisVertical/TablaVerticalBalance.vue";
import {
  obtenerTotalesBalance,
  obtenerTotalesEstado,
} from "../../utils/totales.js";
import { getKeysBalance } from "../../utils/getKeys.js";
import EspecificosBalance from "src/components/graphics/vertical/especificosBalance.vue";
import AbsolutosBalance from "src/components/graphics/vertical/absolutosBalance.vue";
import EspecificosER from "src/components/graphics/vertical/especificosER.vue";
import AbsolutosER from "src/components/graphics/vertical/absolutosER.vue";
onBeforeMount(() => {
  const tamanio = input.balance_general.length;
  for (let i = 0; i < tamanio; i++) {
    periods.push(input.balance_general[i].año);
  }

  let años = [2018, 2019, 2020, 2021, 2022];
  let temporalKeys = getKeysBalance(años);
  keysBalance = {
    activo_corriente: Array.from(new Set(temporalKeys.ActivoCorriente)),
    activo_no_corriente: Array.from(new Set(temporalKeys.ActivoNoCorriente)),
    pasivo_corriente: Array.from(new Set(temporalKeys.PasivoCorriente)),
    pasivo_no_corriente: Array.from(new Set(temporalKeys.PasivoNoCorriente)),
    patrimonio: Array.from(new Set(temporalKeys.Patrimonio)),
  };
});

const input = useCounterStore();
let tab = ref(null);
let generador = ref(false);
let showGraphicsBalance = ref(false);
let showGraphicsER = ref(false);
let año = ref([]);
let options = ["Balance General", "Estado de Resultados"];
let estado = ref(null);
let periods = [];
let keysBalance = {};
let temporalVals = {};

let columnsActivo = ref([]);
let columnsPasivo = ref([]);
let columnsPatrimonio = ref([]);
let rowsActivo = ref([]);
let rowsPasivo = ref([]);
let rowsPatrimonio = ref([]);

const activarAnalisis = (año, estado) => {
  limpiarVariables();
  tab.value = año[0];
  if (estado === "Balance General") {
    showGraphicsBalance.value = true;
    showGraphicsER.value = false;
    generador.value = true;
    columnsActivo.value.push("ACTIVO");
    columnsPasivo.value.push("PASIVO");
    columnsPatrimonio.value.push("PATRIMONIO");
    for (let a of año) {
      columnsActivo.value.push(a, "(%) Relativo", "(%) Absoluto");
      columnsPasivo.value.push(a, "(%) Relativo", "(%) Absoluto");
      columnsPatrimonio.value.push(a, "(%) Relativo", "(%) Absoluto");
    }
    activarAnalisisBalance(año);
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
        calcularPorcentaje(
          activoCorriente,
          totales.totalActivoCorriente
        ).toFixed(1) + "%",
        calcularPorcentaje(activoCorriente, totales.totalActivo).toFixed(1) +
          "%"
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
        totales.totalActivoCorriente
      ).toFixed(1) + "%",
      calcularPorcentaje(
        totales.totalActivoCorriente,
        totales.totalActivo
      ).toFixed(1) + "%"
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
        calcularPorcentaje(
          activoNoCorriente,
          totales.totalActivoNoCorriente
        ).toFixed(1) + "%",
        calcularPorcentaje(activoNoCorriente, totales.totalActivo).toFixed(1) +
          "%"
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
        totales.totalActivoNoCorriente
      ).toFixed(1) + "%",
      calcularPorcentaje(
        totales.totalActivoNoCorriente,
        totales.totalActivo
      ).toFixed(1) + "%"
    );
  }

  contador++;

  // Finalmente la fila que crea el total del Activo

  rowsActivo.value.push(["Total Activo"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsActivo.value[contador].push(
      totales.totalActivo,
      0,
      calcularPorcentaje(totales.totalActivo, totales.totalActivo).toFixed(1) +
        "%"
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
        calcularPorcentaje(
          pasivoCorriente,
          totales.totalPasivoCorriente
        ).toFixed(1) + "%",
        calcularPorcentaje(pasivoCorriente, totales.totalPasivo).toFixed(1) +
          "%"
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
        totales.totalPasivoCorriente
      ).toFixed(1) + "%",
      calcularPorcentaje(
        totales.totalPasivoCorriente,
        totales.totalPasivo
      ).toFixed(1) + "%"
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
        calcularPorcentaje(
          pasivoNoCorriente,
          totales.totalPasivoNoCorriente
        ).toFixed(1) + "%",
        calcularPorcentaje(pasivoNoCorriente, totales.totalPasivo).toFixed(1) +
          "%"
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
        totales.totalPasivoNoCorriente
      ).toFixed(1) + "%",
      calcularPorcentaje(
        totales.totalPasivoNoCorriente,
        totales.totalPasivo
      ).toFixed(1) + "%"
    );
  }

  contador2++;

  // Finalmente la fila que crea el total del Pasivo

  rowsPasivo.value.push(["Total Pasivo"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    rowsPasivo.value[contador2].push(
      totales.totalPasivo,
      0,
      calcularPorcentaje(totales.totalPasivo, totales.totalPasivo).toFixed(1) +
        "%"
    );
  }

  // COMIENZA LA SECCION DEL PATRIMONIO

  let contador3 = 0;

  for (let val of keysBalance.patrimonio) {
    if (val === "Capital social mínimo") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0);
        let patrimonio = totales.CapitalSocialMinimo || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) +
            "%",
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%"
        );
      }
      contador3++;
    } else if (val === "Capital social variable") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0);
        let patrimonio = totales.CapitalSocialVariable || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) +
            "%",
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%"
        );
      }
      contador3++;
    } else if (val === "sub_capital_social") {
      rowsPatrimonio.value.push([val]);
      for (let año of años) {
        let totales = obtenerTotalesBalance(año);
        // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0);
        let patrimonio = totales.totalCapitalSocial || 0;
        let patrimonioPasivo =
          totales.totalPasivo + totales.totalPatrimonio || 0;
        rowsPatrimonio.value[contador3].push(
          patrimonio,
          calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) +
            "%",
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%"
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
          calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) +
            "%",
          calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%"
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
      calcularPorcentaje(
        totales.totalPatrimonio,
        totales.totalPatrimonio
      ).toFixed(1) + "%",
      calcularPorcentaje(totales.totalPatrimonio, patrimonioPasivo).toFixed(1) +
        "%"
    );
  }

  contador3++;

  rowsPatrimonio.value.push(["Total Pasivo + Patrimonio Neto"]);
  for (let año of años) {
    let totales = obtenerTotalesBalance(año);
    let patrimonioPasivo = totales.totalPasivo + totales.totalPatrimonio || 0;
    rowsPatrimonio.value[contador3].push(
      patrimonioPasivo,
      0 + "%",
      calcularPorcentaje(patrimonioPasivo, patrimonioPasivo).toFixed(1) + "%"
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
};
</script>

<style scoped>
.analisis-vertical_container {
  height: 100%;
  /* margin-bottom: 2.5rem; */
}

.info-container {
  margin: 1.5rem 2.5rem;
  padding: 1rem;
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

.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.button-container {
  margin-top: 1.5rem;
}

.vertical-seccion-container {
  margin: 1.7rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
</style>
