<template>
  <div>
    <div class="info-container bg-secondary">
      <div class="title">
        <label> Análisis <span class="text-weight-bold">DUPONT</span> </label>
      </div>
      <div class="periodo-container">
        <label>Periodo: </label>
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
            width: 250px;
            border-radius: 30px;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
          "
          v-model="year"
          :options="periods"
          label="Periodo"
        />
      </div>

      <div class="row justify-end q-py-md">
        <div class="col-2">
          <q-btn
            v-if="showGraphicDupont"
            icon="picture_as_pdf"
            color="primary"
            label="Generar Reporte"
            no-caps
            @click="generarPDF"
            class="buttom self-end"
          />
        </div>
        <div class="col-2">
          <q-btn
            color="primary"
            label="Generar Análisis"
            no-caps
            @click="show"
            class="buttom"
          />
        </div>
      </div>
    </div>
    <div
      ref="body"
      v-if="showGraphicDupont"
      class="dupont-container bg-positive"
    >
      <DupontGraphic :periodo="parseInt(year)"></DupontGraphic>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from "vue";
import DupontGraphic from "src/components/graphics/DupontGraphic.vue";
import { pdfHandler } from "../../utils/generatePDF.js";
import { alertas } from "../../utils/sweetAlerts2.js";
const year = ref(null);
const body = ref(null);
let alert = ref(false);
const periods = ["2017", "2018", "2019", "2020", "2021"];
const showGraphicDupont = ref(false);

onBeforeMount(() => {
  setTimeout(() => {
    document.body.classList.remove("body");
    document.body.classList.add("bg-accent");
  }, 1000);
});

function generarPDF() {
  pdfHandler.createDPReport(
    body.value,
    "AnálisisDupont" + year.value,
    "landscape"
  );
}

function show() {
  if (year.value === null) {
    return alertas.alertaNegativa(
      "Ha Ocurrido un error",
      "Debes escoger un período"
    );
  }
  showGraphicDupont.value = true;
  alert.value = true;
}

watch(year, () => {
  if (showGraphicDupont.value) {
    showGraphicDupont.value = false;
  }
});
</script>

<style scoped>
.title label {
  color: #fff;
  font-size: 1.5rem;
}
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
  border-radius: 26px;
  height: 1350px;
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
