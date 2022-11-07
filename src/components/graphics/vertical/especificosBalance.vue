<template>
  <div class="label text-center q-mb-md text-overline text-weight-bold">
    <p class="q-pt-sm">Porcentajes Relativos para el periodo {{ periodo }}</p>
  </div>
  <div class="container q-mb-xl">
    <div class="row">
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[0]" height="700"></canvas>
      </div>
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[1]" height="700"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[2]" height="700"></canvas>
      </div>
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[3]" height="700"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col q-py-sm bg-grey-1">
        <canvas :id="props.ids[5]" height="700"></canvas>
      </div>
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
let graphicANC = null;
let graphicPVC = null;
let graphicPVNC = null;
let graphicPT = null;
const simbolos = "0123456789ABCDEF";

function generateRandomColor(limit) {
  let colors = [];
  for (let j = 0; j < limit; j++) {
    console.log("crenado el color num: ", j);
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  console.log(colors);
  return colors;
}
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
const balance_general = store.getBalanceGeneralByYear(parseInt(props.periodo));

onMounted(() => {
  // obteniendo todas las cuentas de activo corriente y su total
  let dataActivosCorrientes = [];
  let labelsActivosCorrientes = [];
  balance_general.activo.activo_corriente.forEach((amount, acount) => {
    dataActivosCorrientes.push(amount);
    labelsActivosCorrientes.push(acount);
  });

  // obteniendo todas las cuentas de activo no corriente y su total
  let dataActivosNoCorrientes = [];
  let labelsActivosNoCorrientes = [];
  balance_general.activo.activo_no_corriente.forEach((amount, acount) => {
    dataActivosNoCorrientes.push(amount);
    labelsActivosNoCorrientes.push(acount);
  });

  // obteniendo todas las cuentas de pasivo corriente y su total
  let dataPasivosCorrientes = [];
  let labelsPasivosCorrientes = [];
  balance_general.pasivo.pasivo_corriente.forEach((amount, acount) => {
    dataPasivosCorrientes.push(amount);
    labelsPasivosCorrientes.push(acount);
  });

  // obteniendo todas las cuentas de pasivo no corriente y su total
  let dataPasivosNoCorrientes = [];
  let labelsPasivosNoCorrientes = [];
  balance_general.pasivo.pasivo_no_corriente.forEach((amount, acount) => {
    dataPasivosNoCorrientes.push(amount);
    labelsPasivosNoCorrientes.push(acount);
  });

  // obteniendo todas las cuentas de capital social y su total
  let dataPatrimonio = [];
  let labelsPatrimonio = [];
  balance_general.patrimonio
    .get("sub_patrimonio_propietarios")
    .forEach((amount, acount) => {
      dataPatrimonio.push(amount);
      labelsPatrimonio.push(acount);
    });

  balance_general.patrimonio.forEach((amount, acount) => {
    if (acount !== "sub_patrimonio_propietarios") {
      labelsPatrimonio.push(acount);
      dataPatrimonio.push(amount);
    }
  });

  let COLORS_COPY = [...COLORS];
  graphicAC = new Chart(document.getElementById(props.ids[0]), {
    type: "doughnut",
    data: {
      labels: labelsActivosCorrientes,
      datasets: [
        {
          data: dataActivosCorrientes,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataActivosCorrientes.length
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
          position: "bottom",
        },
        title: {
          display: true,
          text: "Activo Corriente",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              if (item[0].label.length >= 30) {
                let breakpoint = 0;
                const frases = item[0].label.split(" ");
                for (const frase of frases) {
                  breakpoint += frase.length + 1;
                  if (breakpoint >= 30) {
                    breakpoint -= frase.length + 1;
                    break;
                  }
                }
                return (
                  item[0].label.slice(0, breakpoint) +
                  "\n" +
                  item[0].label.slice(breakpoint)
                );
              } else {
                return item[0].label;
              }
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalActivoCorriente
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicANC = new Chart(document.getElementById(props.ids[1]), {
    type: "doughnut",
    data: {
      labels: labelsActivosNoCorrientes,
      datasets: [
        {
          data: dataActivosNoCorrientes,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataActivosNoCorrientes.length
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
          position: "bottom",
        },
        title: {
          display: true,
          text: "Activo no Corriente",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              if (item[0].label.length >= 30) {
                let breakpoint = 0;
                const frases = item[0].label.split(" ");
                for (const frase of frases) {
                  breakpoint += frase.length + 1;
                  if (breakpoint >= 30) {
                    breakpoint -= frase.length + 1;
                    break;
                  }
                }
                return (
                  item[0].label.slice(0, breakpoint) +
                  "\n" +
                  item[0].label.slice(breakpoint)
                );
              } else {
                return item[0].label;
              }
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalActivoNoCorriente
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  COLORS_COPY = [...COLORS];
  graphicPVC = new Chart(document.getElementById(props.ids[2]), {
    type: "doughnut",
    data: {
      labels: labelsPasivosCorrientes,
      datasets: [
        {
          data: dataPasivosCorrientes,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataPasivosCorrientes.length
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
          position: "bottom",
        },
        title: {
          display: true,
          text: "Pasivo Corriente",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              if (item[0].label.length >= 30) {
                let breakpoint = 0;
                const frases = item[0].label.split(" ");
                for (const frase of frases) {
                  breakpoint += frase.length + 1;
                  if (breakpoint >= 30) {
                    breakpoint -= frase.length + 1;
                    break;
                  }
                }
                return (
                  item[0].label.slice(0, breakpoint) +
                  "\n" +
                  item[0].label.slice(breakpoint)
                );
              } else {
                return item[0].label;
              }
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalPasivoCorriente
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicPVNC = new Chart(document.getElementById(props.ids[3]), {
    type: "doughnut",
    data: {
      labels: labelsPasivosNoCorrientes,
      datasets: [
        {
          data: dataPasivosNoCorrientes,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataPasivosNoCorrientes.length
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
          position: "bottom",
        },
        title: {
          display: true,
          text: "Pasivo no Corriente",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              if (item[0].label.length >= 30) {
                let breakpoint = 0;
                const frases = item[0].label.split(" ");
                for (const frase of frases) {
                  breakpoint += frase.length + 1;
                  if (breakpoint >= 30) {
                    breakpoint -= frase.length + 1;
                    break;
                  }
                }
                return (
                  item[0].label.slice(0, breakpoint) +
                  "\n" +
                  item[0].label.slice(breakpoint)
                );
              } else {
                return item[0].label;
              }
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalPasivoNoCorriente
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicPT = new Chart(document.getElementById(props.ids[5]), {
    type: "doughnut",
    data: {
      labels: labelsPatrimonio,
      datasets: [
        {
          data: dataPatrimonio,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataPatrimonio.length
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
          position: "bottom",
        },
        title: {
          display: true,
          text: "Patrimonio",
          font: {
            size: 17,
          },
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              if (item[0].label.length >= 30) {
                let breakpoint = 0;
                const frases = item[0].label.split(" ");
                for (const frase of frases) {
                  breakpoint += frase.length + 1;
                  if (breakpoint >= 30) {
                    breakpoint -= frase.length + 1;
                    break;
                  }
                }
                return (
                  item[0].label.slice(0, breakpoint) +
                  "\n" +
                  item[0].label.slice(breakpoint)
                );
              } else {
                return item[0].label;
              }
            },
            label: (item) => {
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalPatrimonio
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
  graphicANC.destroy();
  graphicPVC.destroy();
  graphicPVNC.destroy();
  graphicPT.destroy();
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
