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
          v-model="model"
          :options="options"
          label="Estado Financiero"
        />
      </div>
      <div class="periodo-container">
        <label>Periodos: </label>
        <q-select
          filled
          v-model="model2"
          :options="periods"
          label="Periodo 1"
        />

        <q-select
          filled
          style="width: 250px"
          v-model="model3"
          :options="periods"
          label="Periodo 2"
          class="periodo2"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";

onBeforeMount(() => {
  const tamanio = input.balance_general.length;
  for (let i = 0; i < tamanio; i++) {
    periods.push(input.balance_general[i].año);
  }
});

const input = useCounterStore();
let model = ref(null);
let options = ["Balance General", "Estado de Resultados"];
let model2 = ref(null);
let model3 = ref(null);
let periods = [];
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
