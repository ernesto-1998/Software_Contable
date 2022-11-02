<template>
  <div class="bg-white box">
    <canvas id="cuentasBalance" width="640" height="450"></canvas>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { obtenerTotalesBalance } from "../../utils/totales.js";
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
  const dataAño1 = [
    obtenerTotalesBalance(props.periodos[0]).totalActivoCorriente,
    obtenerTotalesBalance(props.periodos[0]).totalActivoNoCorriente,
    obtenerTotalesBalance(props.periodos[0]).totalPasivoCorriente,
    obtenerTotalesBalance(props.periodos[0]).totalPasivoNoCorriente,
    obtenerTotalesBalance(props.periodos[0]).totalPatrimonio,
  ];

  const dataAño2 = [
    obtenerTotalesBalance(props.periodos[1]).totalActivoCorriente,
    obtenerTotalesBalance(props.periodos[1]).totalActivoNoCorriente,
    obtenerTotalesBalance(props.periodos[1]).totalPasivoCorriente,
    obtenerTotalesBalance(props.periodos[1]).totalPasivoNoCorriente,
    obtenerTotalesBalance(props.periodos[1]).totalPatrimonio,
  ];
  const data3 = dataAño1.map(
    (value, index) => parseFloat(value) - parseFloat(dataAño2[index])
  );

  graphicBarras = new Chart(document.getElementById("cuentasBalance"), {
    type: "bar",
    data: {
      labels: [
        "Activo corriente",
        "Activo no corriente",
        "Pasivo Corriente",
        "Pasivo no corriente",
        "Patrimonio",
      ],
      datasets: [
        {
          label: "Periodo " + props.periodos[0],
          data: dataAño1,
          borderColor: "rgba(201, 255, 0 )",
          backgroundColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Periodo " + props.periodos[1],
          data: dataAño2,
          borderColor: "rgb(201, 255, 0 )",
          backgroundColor: "rgb(75, 192, 192)",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Diferencia ",
          data: data3,
          borderColor: "rgb(201, 255, 0 )",
          backgroundColor: "rgb(255, 149, 0)",
          borderWidth: 2,
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
        tooltip: {
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].dataset.label;
            },
            label: (item) => {
              return item.label + ": $" + item.formattedValue;
            },
          },
        },
        title: {
          display: true,
          text: "Variación de Cuentas",
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
