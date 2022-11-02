<template>
  <div class="bg-white box">
    <canvas id="utilidades" width="580" height="450"></canvas>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { obtenerTotalesEstado } from "../../utils/totales.js";
import { onMounted, onBeforeUnmount } from "vue";

Chart.register(...registerables);

const props = defineProps({
  periodos: Array,
});

let graphicBarras = null;
const options = [
  "Activo corriente",
  "Activo no corriente",
  "Pasivo corriente",
  "Pasivo no corriente",
  "Patrimonio y reservas",
];

onMounted(() => {
  drawGraphics();
});

onBeforeUnmount(() => {
  graphicBarras.destroy();
});

function drawGraphics() {
  const dataAño2 = [
    obtenerTotalesEstado(props.periodos[1]).utilidadBruta,
    obtenerTotalesEstado(props.periodos[1]).utilidadOperacion,
    obtenerTotalesEstado(props.periodos[1]).utilidadAntesImpuestos,
    obtenerTotalesEstado(props.periodos[1]).utilidadNeta,
  ];
  const dataAño1 = [
    obtenerTotalesEstado(props.periodos[0]).utilidadBruta,
    obtenerTotalesEstado(props.periodos[0]).utilidadOperacion,
    obtenerTotalesEstado(props.periodos[0]).utilidadAntesImpuestos,
    obtenerTotalesEstado(props.periodos[0]).utilidadNeta,
  ];
  const data3 = dataAño1.map(
    (value, index) => parseFloat(value) - parseFloat(dataAño2[index])
  );
  graphicBarras = new Chart(document.getElementById("utilidades"), {
    type: "bar",
    data: {
      labels: ["Utilidad Bruta", "Utilidad Operativa", "UAR", "Utilidad Neta"],
      datasets: [
        {
          label: "Periodo " + props.periodos[0],
          data: dataAño1,
          backgroundColor: "rgb(255, 99, 132)",
          borderWidth: 0,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Periodo " + props.periodos[1],
          data: dataAño2,
          backgroundColor: "rgb(75, 192, 192)",
          borderWidth: 0,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Diferencia ",
          data: data3,
          backgroundColor: "rgb(255, 149, 0)",
          borderWidth: 0,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Variación de Utilidades",
        },
      },
    },
  });
}
</script>

<style>
.box {
  border: 0px inset rgba(100, 100, 100, 1);
  border-radius: 20px;
  background-color: rgba(255, 217, 217, 0.5);
  box-shadow: -8px 13px 0px 0px rgba(0, 0, 0, 0.3);
}
</style>
