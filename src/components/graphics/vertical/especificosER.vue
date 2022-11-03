<template>
  <div class="label text-center q-mb-md text-overline text-weight-bold">
    <p class="q-pt-sm">Porcentajes Específicos para el periodo {{ periodo }}</p>
  </div>
  <div class="container q-mb-xl">
    <div class="row">
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[0]" height="450"></canvas>
      </div>
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[1]" height="450"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[2]" height="450"></canvas>
      </div>
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[3]" height="450"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[4]" height="450"></canvas>
      </div>
      <div class="col-6 q-py-sm bg-grey-1">
        <canvas :id="props.ids[5]" height="450"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../../../stores/estados";
import { Chart, registerables } from "chart.js";
import { onMounted, onBeforeUnmount } from "vue";
import { obtenerTotalesEstado } from "../../../utils/totales.js";
Chart.register(...registerables);

const props = defineProps({
  periodo: Number,
  ids: Array,
});

const store = useCounterStore();

let graphicPO = null;
let graphicCV = null;
let graphicCGO = null;
let graphicGF = null;
let graphicPF = null;
let graphicIP = null;
const simbolos = "0123456789ABCDEF";

const COLORS = [
  "rgb(240, 128, 128)",
  "rgb(255, 192, 203)",
  "rgb(199, 21, 133)",
  "rgb(255, 165, 0)",
  "rgb(240, 230, 140)",
  "rgb(189, 183, 107)",
  "rgb(255, 215, 0)",
  "rgb(255, 228, 181)",
  "rgb(230, 230, 250)",
  "rgb(102, 51, 153)",
  "rgb(255, 0, 255)",
  "rgb(106, 90, 205)",
  "rgb(173, 255, 47)",
  "rgb(152, 251, 152)",
  "rgb(0, 250, 154)",
  "rgb(50, 205, 50)",
  "rgb(154, 205, 50)",
  "rgb(128, 128, 0)",
  "rgb(102, 205, 170)",
  "rgb(143, 188, 139)",
  "rgb(70, 130, 180)",
  "rgb(123, 104, 238)",
  "rgb(0, 0, 255)",
  "rgb(255, 222, 173)",
  "rgb(244, 164, 96)",
  "rgb(188, 143, 143)",
  "rgb(218, 165, 32)",
  "rgb(165, 42, 42)",
  "rgb(160, 82, 45)",
  "rgb(210, 105, 30)",
];
const estado_resultados = store.getEstadoByYear(parseInt(props.periodo));

onMounted(() => {
  // obteniendo todas las cuentas de activo corriente y su total
  let dataProductosOperacion = [];
  let labelsProductosOperacion = [];
  estado_resultados.sub_productos_de_operacion.forEach((amount, acount) => {
    dataProductosOperacion.push(amount);
    labelsProductosOperacion.push(acount);
  });

  // obteniendo todas las cuentas de activo no corriente y su total
  let dataCostoVentas = [];
  let labelsCostoVentas = [];
  estado_resultados.sub_costos_de_energia.forEach((amount, acount) => {
    dataCostoVentas.push(amount);
    labelsCostoVentas.push(acount);
  });

  // obteniendo todas las cuentas de pasivo corriente y su total
  let dataCGOperacion = [];
  let labelsCGOperacion = [];
  estado_resultados.sub_costos_y_gastos_de_operacion.forEach(
    (amount, acount) => {
      dataCGOperacion.push(amount);
      labelsCGOperacion.push(acount);
    }
  );

  // obteniendo todas las cuentas de pasivo no corriente y su total
  let dataGastosFinancieros = [];
  let labelsGastosFinancieros = [];
  estado_resultados.sub_gastos_financieros.forEach((amount, acount) => {
    dataGastosFinancieros.push(amount);
    labelsGastosFinancieros.push(acount);
  });

  // obteniendo todas las cuentas de capital social y su total
  let dataProductosFinancieros = [];
  let labelsProductosFinancieros = [];
  estado_resultados.sub_productos_financieros.forEach((amount, acount) => {
    dataProductosFinancieros.push(amount);
    labelsProductosFinancieros.push(acount);
  });

  // obteniendo todas las cuentas de patrimonio no corriente y su total
  let dataImpuestos = [];
  let labelsImpuestos = [];
  estado_resultados.sub_impuestos_y_reservas.forEach((amount, acount) => {
    labelsImpuestos.push(acount);
    dataImpuestos.push(amount);
  });

  let COLORS_COPY = [...COLORS];
  graphicPO = new Chart(document.getElementById(props.ids[0]), {
    type: "doughnut",
    data: {
      labels: labelsProductosOperacion,
      datasets: [
        {
          data: dataProductosOperacion,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataProductosOperacion.length
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
          text: "Productos de Operación",
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
                  obtenerTotalesEstado(props.periodo).ProductosOperacion
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicCV = new Chart(document.getElementById(props.ids[1]), {
    type: "doughnut",
    data: {
      labels: labelsCostoVentas,
      datasets: [
        {
          data: dataCostoVentas,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataCostoVentas.length
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
          text: "Costos de Venta",
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
                  obtenerTotalesEstado(props.periodo).CostosEnergia
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  COLORS_COPY = [...COLORS];
  graphicCGO = new Chart(document.getElementById(props.ids[2]), {
    type: "doughnut",
    data: {
      labels: labelsCGOperacion,
      datasets: [
        {
          data: dataCGOperacion,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataCGOperacion.length
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
          text: "Costos y Gastos de Operación",
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
                  obtenerTotalesEstado(props.periodo).costosYGastosOperacion
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicGF = new Chart(document.getElementById(props.ids[3]), {
    type: "doughnut",
    data: {
      labels: labelsGastosFinancieros,
      datasets: [
        {
          data: dataGastosFinancieros,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataGastosFinancieros.length
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
          text: "Gastos Financieros",
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
                  obtenerTotalesEstado(props.periodo).gastosFinancieros
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicPF = new Chart(document.getElementById(props.ids[4]), {
    type: "doughnut",
    data: {
      labels: labelsProductosFinancieros,
      datasets: [
        {
          data: dataProductosFinancieros,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataProductosFinancieros.length
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
          text: "Productos Financieros",
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
                  obtenerTotalesEstado(props.periodo).productosFinancieros
                ).toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });

  graphicIP = new Chart(document.getElementById(props.ids[5]), {
    type: "doughnut",
    data: {
      labels: labelsImpuestos,
      datasets: [
        {
          data: dataImpuestos,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).splice(
            0,
            dataImpuestos.length
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
          text: "Impuestos y Reservas",
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
                  obtenerTotalesEstado(props.periodo).impuestos_y_reservas
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
  graphicPO.destroy();
  graphicCGO.destroy();
  graphicGF.destroy();
  graphicPF.destroy();
  graphicCV.destroy();
  graphicIP.destroy();
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
