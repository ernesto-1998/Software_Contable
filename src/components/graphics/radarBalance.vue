<template>
  <div class="row justify-evenly">
    <div class="col-md-auto bg-grey-2 box">
      <canvas id="radarBalance1" width="400" height="450"></canvas>
    </div>
    <div class="col-md-auto bg-grey-2 box">
      <canvas id="radarBalance2" width="400" height="450"></canvas>
    </div>
  </div>
</template>

<script setup>
import { Chart, registerables } from "chart.js";
import { obtenerTotalesBalance } from "../../utils/totales.js";
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
  graphicRadar2 = new Chart(document.getElementById("radarBalance1"), {
    type: "polarArea",
    data: {
      labels: ["Activo", "Pasivo", "Capital"],
      datasets: [
        {
          label: "Periodo " + props.periodos[1],
          data: [
            obtenerTotalesBalance(props.periodos[1]).totalActivo / 1000000,
            obtenerTotalesBalance(props.periodos[1]).totalPasivo / 1000000,
            obtenerTotalesBalance(props.periodos[1]).totalPatrimonio / 1000000,
          ],
          backgroundColor: [
            "rgba(255, 149, 0,0.5)",
            "rgba(0, 216, 255,0.5)",
            "rgba(170, 0, 255,0.5)",
            "rgba(255, 0, 89 ,0.5)",
            "rgba(68, 196, 0 ,0.5)",
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
              size: 18,
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
  graphicRadar1 = new Chart(document.getElementById("radarBalance2"), {
    type: "polarArea",
    data: {
      labels: ["Activo", "Pasivo", "Capital"],
      datasets: [
        {
          label: "Periodo " + props.periodos[0],
          data: [
            obtenerTotalesBalance(props.periodos[0]).totalActivo / 1000000,
            obtenerTotalesBalance(props.periodos[0]).totalPasivo / 1000000,
            obtenerTotalesBalance(props.periodos[0]).totalPatrimonio / 1000000,
          ],
          backgroundColor: [
            "rgba(255, 149, 0,0.5)",
            "rgba(0, 216, 255,0.5)",
            "rgba(170, 0, 255,0.5)",
            "rgba(255, 0, 89 ,0.5)",
            "rgba(68, 196, 0 ,0.5)",
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
              size: 18,
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
