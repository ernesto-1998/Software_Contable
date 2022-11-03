<template>
  <div class="label text-center text-overline text-weight-bold">
    <p class="q-pt-sm">Porcentajes Absolutos para el periodo {{ periodo }}</p>
  </div>
  <div class="container">
    <div class="col bg-grey-1 q-px-sm">
      <canvas :id="props.ids[0]" width="600" height="1200"></canvas>
    </div>
    <div class="col bg-grey-1 q-px-sm">
      <canvas :id="props.ids[1]" width="600" height="1200"></canvas>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../../stores/estados";
import { Chart, registerables } from "chart.js";
import { onMounted, onBeforeUnmount } from "vue";
import { obtenerTotalesBalance } from "../../../utils/totales.js";
Chart.register(...registerables);

const props = defineProps({
  periodo: Number,
  ids: Array,
});

const store = useCounterStore();

let graphicAC = null;
let graphicPC = null;
const balance_general = store.getBalanceGeneralByYear(parseInt(props.periodo));
const COLORS = [
  "rgb(173, 255, 47)",
  "rgb(240, 128, 128)",
  "rgb(255, 192, 203)",
  "rgb(199, 21, 133)",
  "rgb(152, 251, 152)",
  "rgb(255, 165, 0)",
  "rgb(240, 230, 140)",
  "rgb(189, 183, 107)",
  "rgb(255, 215, 0)",
  "rgb(102, 51, 153)",
  "rgb(0, 250, 154)",
  "rgb(255, 0, 255)",
  "rgb(106, 90, 205)",
  "rgb(128, 128, 0)",
  "rgb(50, 205, 50)",
  "rgb(102, 205, 170)",
  "rgb(143, 188, 139)",
  "rgb(70, 130, 180)",
  "rgb(123, 104, 238)",
  "rgb(154, 205, 50)",
  "rgb(0, 0, 255)",
  "rgb(255, 222, 173)",
  "rgb(244, 164, 96)",
  "rgb(188, 143, 143)",
  "rgb(218, 165, 32)",
  "rgb(165, 42, 42)",
  "rgb(160, 82, 45)",
  "rgb(210, 105, 30)",
];

onMounted(() => {
  let dataActivo = [];
  let labelsActivo = [];
  balance_general.activo.activo_corriente.forEach((amount, acount) => {
    if (amount) {
      dataActivo.push(amount);
      labelsActivo.push(acount);
    }
  });

  // obteniendo todas las cuentas de activo no corriente y su total
  balance_general.activo.activo_no_corriente.forEach((amount, acount) => {
    if (amount) {
      dataActivo.push(amount);
      labelsActivo.push(acount);
    }
  });

  // obteniendo todas las cuentas de pasivo corriente y su total
  let dataPasivoCapital = [];
  let labelsPasivoCapital = [];
  balance_general.pasivo.pasivo_corriente.forEach((amount, acount) => {
    if (amount) {
      dataPasivoCapital.push(amount);
      labelsPasivoCapital.push(acount);
    }
  });

  balance_general.pasivo.pasivo_no_corriente.forEach((amount, acount) => {
    if (amount) {
      dataPasivoCapital.push(amount);
      labelsPasivoCapital.push(acount);
    }
  });

  console.log(balance_general.patrimonio.get("sub_capital_social"));
  balance_general.patrimonio
    .get("sub_capital_social")
    .forEach((amount, acount) => {
      if (amount) {
        dataPasivoCapital.push(amount);
        labelsPasivoCapital.push(acount);
      }
    });

  balance_general.patrimonio.forEach((amount, acount) => {
    if (acount === "sub_capital_social") {
      console.log(amount);
    } else {
      if (amount) {
        dataPasivoCapital.push(amount);
        labelsPasivoCapital.push(acount);
      }
    }
  });

  let COLORS_COPY = [...COLORS];
  graphicAC = new Chart(document.getElementById(props.ids[0]), {
    type: "doughnut",
    data: {
      labels: labelsActivo,
      datasets: [
        {
          data: dataActivo,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).slice(
            0,
            dataActivo.length
          ),
          hoverOffset: 5,
          borderAlign: "center",
          circumference: 360,
          borderWidth: 0.5,
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
          position: "left",
        },
        title: {
          display: true,
          text: "Activo",
          padding: {
            top: 10,
            bottom: 0,
          },
          font: {
            size: 24,
          },
        },
        subtitle: {
          display: true,
          text: "Porcentaje absoluto de las cuentas de activo",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label;
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalActivo
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicPC = new Chart(document.getElementById(props.ids[1]), {
    type: "doughnut",
    data: {
      labels: labelsPasivoCapital,
      datasets: [
        {
          data: dataPasivoCapital,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).slice(
            0,
            dataPasivoCapital.length
          ),
          hoverOffset: 5,
          borderAlign: "inner",
          circumference: 360,
          borderWidth: 0.5,
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
          position: "right",
        },
        title: {
          display: true,
          text: "Pasivo y Patrimonio",
          padding: {
            top: 10,
            bottom: 0,
          },
          font: {
            size: 24,
          },
        },
        subtitle: {
          display: true,
          text: "Porcentaje absoluto de las cuentas de pasivo y patrimonio",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label;
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  (obtenerTotalesBalance(props.periodo).totalPasivo +
                    obtenerTotalesBalance(props.periodo).totalPatrimonio)
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });
});

onBeforeUnmount(() => {
  graphicAC.destroy();
  graphicPC.destroy();
});
</script>

<style scoped>
.label {
  margin: 0px auto 25px auto;
  width: 490px;
  height: 50px;
  background-color: rgba(255, 217, 217, 0.5);
  box-shadow: -8px 13px 0px 0px rgba(0, 0, 0, 0.3);
}

.container {
  box-shadow: -8px 13px 0px 0px rgba(0, 0, 0, 0.3);
}
</style>
