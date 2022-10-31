<template>
  <div class="bg-white box">
    <canvas id="cuentasER" width="600" height="450"></canvas>
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
  graphicBarras = new Chart(document.getElementById("cuentasER"), {
    type: "bar",
    data: {
      labels: [
        "Ventas",
        "Costos de venta",
        "C/G de operación",
        "Gastos fin.",
        "Productos fin.",
      ],
      datasets: [
        {
          label: "Periodo " + props.periodos[0],
          data: [
            obtenerTotalesEstado(props.periodos[0]).ProductosOperacion,
            obtenerTotalesEstado(props.periodos[0]).CostosEnergia,
            obtenerTotalesEstado(props.periodos[0]).costosYGastosOperacion,
            obtenerTotalesEstado(props.periodos[0]).productosFinancieros,
          ],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: "Periodo " + props.periodos[1],
          data: [
            obtenerTotalesEstado(props.periodos[1]).ProductosOperacion,
            obtenerTotalesEstado(props.periodos[1]).CostosEnergia,
            obtenerTotalesEstado(props.periodos[1]).costosYGastosOperacion,
            obtenerTotalesEstado(props.periodos[1]).productosFinancieros,
          ],
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
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
