<template>
  <div class="row justify-evenly">
    <div class="col-md-auto bg-grey-2 box">
      <canvas id="radarER1" width="400" height="450"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2 box">
      <canvas id="radarER2" width="400" height="450"></canvas>
    </div>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { obtenerTotalesEstado } from "../../utils/totales.js";
import { onMounted, onBeforeUnmount } from "vue";

Chart.register(...registerables);

let graphicRadar1 = null;
let graphicRadar2 = null;

const props = defineProps({
  periodos: Array,
});

onMounted(() => {
  drawGraphic();
});

onBeforeUnmount(() => {
  graphicRadar1.destroy();
  graphicRadar2.destroy();
});

function drawGraphic() {
  graphicRadar2 = new Chart(document.getElementById("radarER1"), {
    type: "polarArea",
    data: {
      labels: ["Ventas", "Costos de venta", "C/G operativos"],
      datasets: [
        {
          label: "Periodo " + props.periodos[1],
          data: [
            obtenerTotalesEstado(props.periodos[1]).ProductosOperacion /
              1000000,
            obtenerTotalesEstado(props.periodos[1]).CostosEnergia / 1000000,
            obtenerTotalesEstado(props.periodos[1]).costosYGastosOperacion /
              1000000,
          ],
          backgroundColor: [
            "rgba(255, 149, 0,0.5)",
            "rgba(0, 216, 255,0.5)",
            "rgba(170, 0, 255,0.5)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 10,
            },
          },
          ticks: {
            z: 2,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Distribución de cuentas para el periodo " + props.periodos[1],
        },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            label: (item) => {
              return (
                item.label +
                ": $" +
                new Intl.NumberFormat("en-US").format(item.raw * 1000000)
              );
            },
          },
        },
      },
    },
  });
  graphicRadar1 = new Chart(document.getElementById("radarER2"), {
    type: "polarArea",
    data: {
      labels: ["Ventas", "Costos de venta", "C/G operativos"],
      datasets: [
        {
          label: "Periodo " + props.periodos[0],
          data: [
            obtenerTotalesEstado(props.periodos[0]).ProductosOperacion /
              1000000,
            obtenerTotalesEstado(props.periodos[0]).CostosEnergia / 1000000,
            obtenerTotalesEstado(props.periodos[0]).costosYGastosOperacion /
              1000000,
          ],
          backgroundColor: [
            "rgba(255, 149, 0,0.5)",
            "rgba(0, 216, 255,0.5)",
            "rgba(170, 0, 255,0.5)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          pointLabels: {
            display: true,
            centerPointLabels: true,
            font: {
              size: 10,
            },
          },
          ticks: {
            z: 2,
            stepSize: 30,
          },
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Distribución de cuentas para el periodo " + props.periodos[0],
        },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            label: (item) => {
              return (
                item.label +
                ": $" +
                new Intl.NumberFormat("en-US").format(item.raw * 1000000)
              );
            },
          },
        },
      },
    },
  });
}
</script>

<style scoped>
.box {
  border: 0px inset rgba(100, 100, 100, 1);
  border-radius: 20px;
  background-color: rgba(255, 217, 217, 0.5);
  box-shadow: -8px 13px 0px 0px rgba(0, 0, 0, 0.3);
}
</style>
