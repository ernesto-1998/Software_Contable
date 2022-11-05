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
          label="Generar Análisis"
          no-caps
          @click="showAnalisis"
          class="q-mr-xl buttom"
        />
      </div>
    </div>

    <div v-if="generadorBalance === true" class="vertical-seccion-container bg-positive">
      <TablaAnalisisBalance
        :columnsActivo="columnsActivo"
        :columnsPasivo="columnsPasivo"
        :columnsPatrimonio="columnsPatrimonio"
        :rowsActivo="rowsActivo"
        :rowsPasivo="rowsPasivo" :rowsPatrimonio="rowsPatrimonio"
      />
    </div>
    <div v-if="generadorEstado === true" class="vertical-seccion-container bg-positive">
      <TablaAnalisisEstado :columnsTitulo="columnsTitulo" :rowsAnalisisEstado="rowsAnalisisEstado"
      />
    </div>

    <div class="info-container bg-secondary">
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
import { useCounterStore } from "stores/estados";
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
});

const input = useCounterStore();
let estado = ref(null);
let options = ["Balance General", "Estado de Resultados"];
const showGraphicsBalance = ref(false);
const showGraphicsER = ref(false);
let periodo1 = ref(null);
let periodo2 = ref(null);
let periods = [];

function showAnalisis() {
  if (estado.value === "Balance General") {
    showGraphicsBalance.value = true;
    showGraphicsER.value = false;
  } else {
    showGraphicsBalance.value = false;
    showGraphicsER.value = true;
  }
}




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
</style>
