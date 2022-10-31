<template>
  <div class="vertical-container">
    <div class="info-container bg-secondary">
      <div class="title">
        <label> Análisis Horizontal </label>
      </div>
      <div class="estado-financiero_container">
        <label>Estado Financiero: </label>
        <q-select
          filled
          v-model="estado"
          :options="options"
          label="Estado Financiero"
        />
      </div>
      <div class="periodo-container">
        <label>Periodos: </label>
        <q-select
          filled
          v-model="periodo1"
          :options="periods"
          label="Comparar periodo"
        />

        <q-select
          filled
          style="width: 250px"
          v-model="periodo2"
          :options="periods"
          label="Con el periodo"
          class="periodo2"
        />
      </div>
      <q-btn
        color="white"
        text-color="black"
        label="Generar"
        @click="showAnalisis"
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
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useCounterStore } from "stores/estados";
import GraficoRosquillaBalance from "src/components/graphics/GraficoRosquillaBalance.vue";
import GraficoUtilidades from "src/components/graphics/GraficoUtilidades.vue";
import GraficoCuentasER from "src/components/graphics/GraficoCuentasER.vue";
import GraficoCuentasBalance from "src/components/graphics/GraficoCuentasBalance.vue";

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

.periodo2 {
  position: relative;
  bottom: 55px;
  left: 450px;
}
</style>
