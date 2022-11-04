<template>
  <div class="row justify-center">
    <div class="col-md-auto text-h6 bg-grey-8 text-white label">
      <p class="text">Año {{ periodos[0] }}</p>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadbruta1" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadoperativa1" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadantesimpuestos1" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadneta1" width="150" height="200"></canvas>
    </div>
  </div>
  <div class="row justify-center q-mt-xl">
    <div class="col-md-auto text-h6 bg-grey-8 text-white label">
      <p class="text">Año {{ periodos[1] }}</p>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadbruta2" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadoperativa2" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadantesimpuestos2" width="150" height="200"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2">
      <canvas id="utilidadneta2" width="150" height="200"></canvas>
    </div>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { onMounted, onBeforeUnmount } from "vue";
import { obtenerTotalesEstado } from "../../utils/totales.js";
Chart.register(...registerables);

const props = defineProps({
  periodos: Array,
});

const totalesERAño1 = obtenerTotalesEstado(props.periodos[0]);
const totalesERAño2 = obtenerTotalesEstado(props.periodos[1]);
let graphic1 = null;
let graphic2 = null;
let graphic3 = null;
let graphic4 = null;
let graphic5 = null;
let graphic6 = null;
let graphic7 = null;
let graphic8 = null;

const utilidadBrutaAño1 = totalesERAño1.utilidadBruta;
const utilidadOperativaAño1 = totalesERAño1.utilidadOperacion;
const utilidadAntesImpuestosAño1 = totalesERAño1.utilidadAntesImpuestos;
const utilidadNetaAño1 = totalesERAño1.utilidadNeta;

const utilidadBrutaAño2 = totalesERAño2.utilidadBruta;
const utilidadOperativaAño2 = totalesERAño2.utilidadOperacion;
const utilidadAntesImpuestosAño2 = totalesERAño2.utilidadAntesImpuestos;
const utilidadNetaAño2 = totalesERAño2.utilidadNeta;

const porcentajeActivoAño1 = (activoAño1 * 100) / totalAño1;
const porcentajePasivoAño1 = (pasivoAño1 * 100) / totalAño1;
const porcentajePatrimonioAño1 = (patrimonioAño1 * 100) / totalAño1;

const activoAño2 = totalesBalanceAño2.totalActivo;
const pasivoAño2 = totalesBalanceAño2.totalPasivo;
const patrimonioAño2 = totalesBalanceAño2.totalPatrimonio;
const totalAño2 = activoAño2 + pasivoAño2 + patrimonioAño2;

const porcentajeActivoAño2 = (activoAño2 * 100) / totalAño2;
const porcentajePasivoAño2 = (pasivoAño2 * 100) / totalAño2;
const porcentajePatrimonioAño2 = (patrimonioAño2 * 100) / totalAño2;

onMounted(() => {
  graphic1 = new Chart(document.getElementById("activo1"), {
    type: "doughnut",
    data: {
      labels: ["Utilidad Bruta"],
      datasets: [
        {
          data: [utilidadBrutaAño1],
          backgroundColor: ["#44EE00"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajeActivoAño1 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[0];
            },
            footer: () => {
              return "Porcentaje: " + porcentajeActivoAño1.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });

  graphic2 = new Chart(document.getElementById("pasivo1"), {
    type: "doughnut",
    data: {
      labels: ["Pasivo"],
      datasets: [
        {
          data: [pasivoAño1],
          backgroundColor: ["#B200FF"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajePasivoAño1 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[0];
            },

            footer: () => {
              return "Porcentaje: " + porcentajePasivoAño1.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });

  graphic3 = new Chart(document.getElementById("patrimonio1"), {
    type: "doughnut",
    data: {
      labels: ["Patrimonio"],
      datasets: [
        {
          data: [patrimonioAño1],
          backgroundColor: ["#FFB900"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajePatrimonioAño1 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
          spacing: 60,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[0];
            },

            footer: () => {
              return "Porcentaje: " + porcentajePatrimonioAño1.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });

  graphic4 = new Chart(document.getElementById("activo2"), {
    type: "doughnut",
    data: {
      labels: ["Activo"],
      datasets: [
        {
          data: [activoAño2],
          backgroundColor: ["#44EE00"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajeActivoAño2 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[1];
            },

            footer: () => {
              return "Porcentaje: " + porcentajeActivoAño2.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });

  graphic5 = new Chart(document.getElementById("pasivo2"), {
    type: "doughnut",
    data: {
      labels: ["Pasivo"],
      datasets: [
        {
          data: [pasivoAño2],
          backgroundColor: ["#B200FF"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajePasivoAño2 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[1];
            },

            footer: () => {
              return "Porcentaje: " + porcentajePasivoAño2.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });

  graphic6 = new Chart(document.getElementById("patrimonio2"), {
    type: "doughnut",
    data: {
      labels: ["Patrimonio"],
      datasets: [
        {
          data: [patrimonioAño2],
          backgroundColor: ["#FFB900"],
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: (porcentajePatrimonioAño2 / 100) * 360,
          borderWidth: 0.5,
          offset: 20,
          spacing: 60,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            title: () => {
              return "Periodo: " + props.periodos[1];
            },

            footer: () => {
              return "Porcentaje: " + porcentajePatrimonioAño2.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });
});

onBeforeUnmount(() => {
  graphic1.destroy();
  graphic2.destroy();
  graphic3.destroy();
  graphic4.destroy();
  graphic5.destroy();
  graphic6.destroy();
});
</script>

<style scoped>
.label {
  border: 0px inset rgba(100, 100, 100, 1);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgba(255, 217, 217, 0.5);
  box-shadow: -8px 13px 0px 0px rgba(0, 0, 0, 0.3);
}

.text {
  transform: rotate(271deg);
  margin-top: 90%;
}
</style>
