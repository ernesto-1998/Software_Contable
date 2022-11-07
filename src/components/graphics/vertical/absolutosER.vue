<template>
  <div class="label text-center text-overline text-weight-bold">
    <p class="q-pt-sm">Porcentajes Absolutos para el periodo {{ periodo }}</p>
  </div>
  <div class="container">
    <div class="row">
      <div class="col bg-grey-1 q-px-sm">
        <canvas :id="props.ids[0]" width="600" height="800"></canvas>
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

let graphicsV = null;
const estado_resultados = store.getEstadoByYear(parseInt(props.periodo));
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
  let dataVentas = [];
  let labelsVentas = [];

  // obteniendo todas las cuentas de activo no corriente y su total
  estado_resultados.sub_productos_de_operacion.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  estado_resultados.sub_costos_y_gastos_de_operacion.forEach(
    (amount, acount) => {
      if (amount) {
        dataVentas.push(amount);
        labelsVentas.push(acount);
      }
    }
  );

  estado_resultados.sub_gastos_financieros.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  estado_resultados.sub_ingresos_financieros.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  estado_resultados.sub_impuestos_y_reservas.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  estado_resultados.sub_resultados_integrales.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  estado_resultados.sub_utilidad_atribuible.forEach((amount, acount) => {
    if (amount) {
      dataVentas.push(amount);
      labelsVentas.push(acount);
    }
  });

  if(estado_resultados.sub_resultados_integrales_atribuible){
    estado_resultados.sub_resultados_integrales_atribuible.forEach(
      (amount, acount) => {
        if (amount) {
          dataVentas.push(amount);
          labelsVentas.push(acount);
        }
      }
    );
  } 

  let COLORS_COPY = [...COLORS];
  graphicsV = new Chart(document.getElementById(props.ids[0]), {
    type: "doughnut",
    data: {
      labels: labelsVentas,
      datasets: [
        {
          data: dataVentas,
          backgroundColor: COLORS_COPY.sort(() => Math.random() - 0.5).slice(
            0,
            dataVentas.length
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
          text: "Ventas",
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
          text: "Porcentaje absoluto de las cuentas del estado de resultados",
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
                  obtenerTotalesEstado(props.periodo).ProductosOperacion
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
  graphicsV.destroy();
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
