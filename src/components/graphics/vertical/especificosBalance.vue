<template>
  <div class="label text-center q-mb-md text-overline text-weight-bold">
    <p class="q-pt-sm">Porcentajes Específicos para el periodo {{ periodo }}</p>
  </div>
  <div class="row container q-mb-xl">
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[0]" width="200" height="200"></canvas>
    </div>
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[1]" width="200" height="200"></canvas>
    </div>
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[2]" width="200" height="200"></canvas>
    </div>
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[3]" width="200" height="200"></canvas>
    </div>
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[4]" width="200" height="200"></canvas>
    </div>
    <div class="col-2 q-py-sm bg-grey-2">
      <canvas :id="props.ids[5]" width="200" height="200"></canvas>
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
let graphicCS = null;
let graphicPT = null;
const COLORS = [
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
  "#A000D3",
  "#BDFF00",
  "#C20058",
  "#00C2A5",
  "#BAC200",
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
  let dataCapitalSocial = [];
  let labelsCapitalSocial = [];
  let totalCapitalSocial = 0;
  console.log(balance_general.patrimonio.get("sub_capital_social"));
  balance_general.patrimonio
    .get("sub_capital_social")
    .forEach((amount, acount) => {
      dataCapitalSocial.push(amount);
      labelsCapitalSocial.push(acount);
      totalCapitalSocial += amount;
    });

  // obteniendo todas las cuentas de patrimonio no corriente y su total
  let dataPatrimonio = [];
  let labelsPatrimonio = [];
  balance_general.patrimonio.forEach((amount, acount) => {
    if (acount === "sub_capital_social") {
      labelsPatrimonio.push("Total Capital Social");
      dataPatrimonio.push(totalCapitalSocial);
    } else {
      labelsPatrimonio.push(acount);
      dataPatrimonio.push(amount);
    }
  });

  graphicAC = new Chart(document.getElementById(props.ids[0]), {
    type: "doughnut",
    data: {
      labels: labelsActivosCorrientes,
      datasets: [
        {
          data: dataActivosCorrientes,
          backgroundColor: COLORS.slice(0, dataActivosCorrientes.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Activo Corriente",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
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
          backgroundColor: COLORS.slice(0, dataActivosNoCorrientes.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Activo no Corriente",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
            },
            label: (item) => {
              console.log(item);
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

  graphicPVC = new Chart(document.getElementById(props.ids[2]), {
    type: "doughnut",
    data: {
      labels: labelsPasivosCorrientes,
      datasets: [
        {
          data: dataPasivosCorrientes,
          backgroundColor: COLORS.slice(0, dataPasivosCorrientes.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Pasivo Corriente",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
            },
            label: (item) => {
              console.log(item);
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
          backgroundColor: COLORS.slice(0, dataPasivosNoCorrientes.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Pasivo no Corriente",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
            },
            label: (item) => {
              console.log(item);
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

  graphicCS = new Chart(document.getElementById(props.ids[4]), {
    type: "doughnut",
    data: {
      labels: labelsCapitalSocial,
      datasets: [
        {
          data: dataCapitalSocial,
          backgroundColor: COLORS.slice(0, dataCapitalSocial.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Capital Social",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
            },
            label: (item) => {
              console.log(item);
              return (
                (
                  (item.raw * 100) /
                  obtenerTotalesBalance(props.periodo).totalCapitalSocial
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
          backgroundColor: COLORS.slice(0, dataPatrimonio.length),
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
          display: false,
        },
        title: {
          display: true,
          text: "Capital Social",
        },
        tooltip: {
          padding: 3,
          usePointStyle: true,
          callbacks: {
            title: (item) => {
              return item[0].label + ": ";
            },
            label: (item) => {
              console.log(item);
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
  graphicCS.destroy();
  graphicPT.destroy();
});
</script>

<style>
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
