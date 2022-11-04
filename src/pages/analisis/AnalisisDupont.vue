<template>
  <div>
    <div class="info-container bg-secondary">
      <div class="title">
        <label>Análisis DUPONT</label>
      </div>
      <div class="periodo-container">
        <label>Periodo: </label>
        <q-select
          filled
          v-model="year"
          :options="periods"
          label="Periodo"
          style="width: 250px"
        />
      </div>
      <div class="button-container">
        <button class="btn-activar" @click="showGraphicDupont = true">
          Generar
        </button>
      </div>
    </div>
    <div class="dupont-container bg-positive">
      <DupontGraphic
        v-if="showGraphicDupont"
        :periodo="parseInt(year)"
      ></DupontGraphic>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import DupontGraphic from "src/components/graphics/DupontGraphic.vue";
const year = ref(null);
const periods = ["2018", "2019", "2020", "2021", "2022"];
const showGraphicDupont = ref(false);
watch(year, () => {
  if (showGraphicDupont.value) {
    showGraphicDupont.value = false;
  }
});
</script>

<style scoped>
.info-container {
  margin: 1.5rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
.periodo-container {
  display: grid;
  grid-template-columns: 150px 250px;
  align-items: center;
  margin-top: 1.5rem;
}
.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.dupont-container {
  margin: 1.7rem 2.5rem;
  border-radius: 16px;
  /* height: 350px; */
}
</style>
