<template>
  <div class="razones-financieras_container">
    <div class="info-container bg-secondary">
      <div class="title">
        <label>
          Razones <span class="text-weight-bold">Financieras</span>
        </label>
      </div>
      <div class="periodo-container">
        <label>Periodos: </label>
        <q-select
          label-color="purple-13"
          bg-color="white"
          color="purple-13"
          clearable
          transition-show="flip-up"
          transition-hide="scale"
          rounded
          outlined
          popup-content-style="border-top-left-radius: 15px 50px;
  border-top-right-radius: 15px 50px;
  border-bottom-left-radius: 80px 19px;
  border-bottom-right-radius: 80px 19px;
  border: solid 3px #6e7491;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;"
          style="
            width: 350px;
            border-radius: 30px;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
          "
          v-model="año"
          multiple
          :options="periods"
          label="Periodos"
        />
        <label class="q-ml-xl">Razones: </label>
        <q-select
          class="q-ml-xl"
          label-color="purple-13"
          bg-color="white"
          color="purple-13"
          clearable
          transition-show="flip-up"
          transition-hide="scale"
          rounded
          outlined
          popup-content-style="border-top-left-radius: 15px 50px;
  border-top-right-radius: 15px 50px;
  border-bottom-left-radius: 80px 19px;
  border-bottom-right-radius: 80px 19px;
  border: solid 3px #6e7491;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;"
          style="
            width: 300px;
            border-radius: 30px;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
          "
          v-model="razon"
          :options="razones"
          label="Razon"
        />
      </div>
      <div class="row justify-end q-pt-xl q-pb-md">
        <q-btn
          icon="picture_as_pdf"
          v-if="generador === true"
          color="primary"
          label="Generar Reporte"
          no-caps
          @click="generarPDF"
          class="q-mr-xl buttom"
        />
        <q-btn
          color="primary"
          label="Generar Razones"
          no-caps
          @click="activarRazones(año, razon)"
          class="q-mr-xl buttom"
        />
      </div>
    </div>
    <div
      ref="body"
      class="razones-container bg-positive"
      v-if="generador === true"
    >
      <TablaRazones :columns="columns" :rows="rows" :title="title" />
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useCounterStore } from "stores/estados";
import { pdfHandler } from "../../utils/generatePDF.js";
import { alertas } from "../../utils/sweetAlerts2.js";
import TablaRazones from "src/components/RazonesFinancieras/TablaRazones.vue";
import {
  razones_liquidez,
  razones_actividad,
  razones_rendimiento,
  razones_deuda,
} from "../../utils/razones.js";
import {
  obtenerTotalesBalance,
  obtenerTotalesEstado,
} from "../../utils/totales.js";

onBeforeMount(() => {
  setTimeout(() => {
    document.body.classList.remove("body");
    document.body.classList.add("bg-accent");
  }, 1000);
  const tamanio = input.balance_general.length;
  for (let i = 0; i < tamanio; i++) {
    periods.push(input.balance_general[i].año);
  }
});
const body = ref(null);
const input = useCounterStore();
let generador = ref(false);
let nivelPorcentaje = 2;
let año = ref([]);
let razon = ref(null);
let periods = [];
let razones = [
  "Razones de Liquidez",
  "Razones de Actividad",
  "Razones de Deuda",
  "Razones de Rendimiento",
];
let title = ref("");

let columns = ref([]);
let rows = ref([]);

function generarPDF() {
  pdfHandler.createRFReport(
    body.value,
    razon.value + año.value,
    "landscape",
    "Razones financieras"
  );
}

const activarRazones = (año, razon) => {
  if (año === null) {
    generador.value = false;
    return alertas.alertaNegativa(
      "HA OCURRIDO UN ERROR",
      "Debes llenar todos los campos"
    );
  }
  if (año.length < 1 || razon === null) {
    generador.value = false;
    return alertas.alertaNegativa(
      "HA OCURRIDO UN ERROR",
      "Debes llenar ambos campos"
    );
  }

  limpiarTabla();
  generador.value = true;
  if (razon === "Razones de Liquidez") {
    for (let añ of año) {
      activarRazonesLiquidez(añ);
    }
  } else if (razon === "Razones de Actividad") {
    for (let añ of año) {
      activarRazonesActividad(añ);
    }
  } else if (razon === "Razones de Rendimiento") {
    for (let añ of año) {
      activarRazonesRendimiento(añ);
    }
  } else if (razon === "Razones de Deuda") {
    for (let añ of año) {
      activarRazonesDeuda(añ);
    }
  }
};

const activarRazonesLiquidez = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = [
    "Año",
    "Razón Circulante",
    "Razón Rápida",
    "Capital de Trabajo",
    "Nivel de Dependencia de Inventarios",
  ];
  rows.value.push([
    año,
    datos.razon_circulante,
    datos.razon_rapida,
    "$ " + new Intl.NumberFormat("en-US").format(datos.capital_trabajo),
    datos.nivel_dependencia + "%",
  ]);
};

const activarRazonesActividad = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = [
    "Año",
    "Número de días Inventario",
    "Rotación de Inventarios",
    "Rotacion de Activo Total",
    "Rotación de Activo Operacional",
    "Rotación de Cuentas por Cobrar",
    "Periodo Promedio de Cobro",
    "Periodo Promedio de Pago",
    "Ciclo Operacional",
  ];
  rows.value.push([
    año,
    datos.numero_dias_inventario,
    datos.rotacion_inventarios,
    datos.rotacion_activo_total,
    datos.rotacion_activo_operacional,
    datos.rotacion_cuentas_por_cobrar,
    datos.periodo_promedio_cobro,
    datos.periodo_promedio_pago,
    datos.ciclo_operacional,
  ]);
};

const activarRazonesDeuda = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = [
    "Año",
    "Razon de Endeudamiento",
    "Razon Deuda Capital Patrimonial",
    "Razon Cargo Interes Fijo",
    "MAF",
  ];
  rows.value.push([
    año,
    datos.razon_endeudamiento + "%",
    datos.razon_deuda_capital_patrimonial + "%",
    datos.razon_cargos_interes_fijo,
    datos.maf,
  ]);
};

const activarRazonesRendimiento = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = [
    "Año",
    "ROA",
    "ROE",
    "Margen Utilidad Bruta",
    "Margen Utilidad Operativa",
    "Margen Utilidad Neta",
  ];
  rows.value.push([
    año,
    datos.roa + "%",
    datos.roe + "%",
    datos.margen_utilidad_bruta + "%",
    datos.margen_utilidad_operativa + "%",
    datos.margen_utilidad_neta + "%",
  ]);
};

const obtenerDatosRazones = (año) => {
  const totalesBalance = obtenerTotalesBalance(año);
  const totalesEstado = obtenerTotalesEstado(año);
  const balance = input.getBalanceGeneralByYear(año);

  const activo = totalesBalance.totalActivo;
  const pasivo = totalesBalance.totalPasivo;
  const activo_corriente = totalesBalance.totalActivoCorriente;
  const pasivo_corriente = totalesBalance.totalPasivoCorriente;
  const activo_no_corriente = totalesBalance.totalActivoNoCorriente;
  const pasivo_no_corriente = totalesBalance.totalPasivoNoCorriente;
  const patrimonio = totalesBalance.totalPatrimonio;
  const inventarios = totalesBalance.inventarios;
  const efectivo = totalesBalance.efectivo;
  const cuentas_por_cobrar = totalesBalance.cuentas_por_cobrar;
  const cuentas_por_pagar = totalesBalance.cuentas_por_pagar;
  const total_depreciacion = totalesEstado.total_depreciacion;

  const impuestos = totalesEstado.impuestos;
  const utilidad_bruta = totalesEstado.utilidadBruta;
  const utilidad_operativa = totalesEstado.utilidadOperacion;
  const utilidad_antes_impuestos = totalesEstado.utilidadAntesImpuestos;
  const utilidad_neta = totalesEstado.utilidadNeta;
  const ventas = totalesEstado.ProductosOperacion;
  const costo_de_ventas = totalesEstado.CostosEnergia;

  // Razones de Liquidez

  const razon_circulante = razones_liquidez
    .razon_circulante(activo_corriente, pasivo_corriente)
    .toFixed(nivelPorcentaje);
  const razon_rapida = razones_liquidez
    .razon_rapida(activo_corriente, inventarios, pasivo_corriente)
    .toFixed(nivelPorcentaje);
  const capital_trabajo = razones_liquidez
    .capital_trabajo(activo_corriente, pasivo_corriente)
    .toFixed(nivelPorcentaje);
  const nivel_dependencia = razones_liquidez
    .nivel_de_dependencia_de_inventarios(
      pasivo_corriente,
      efectivo,
      cuentas_por_cobrar,
      inventarios
    )
    .toFixed(nivelPorcentaje);

  // Razones de Actividad

  const rotacion_cuentas_por_cobrar = razones_actividad
    .rotacion_cuentas_por_cobrar(cuentas_por_cobrar, ventas)
    .toFixed(nivelPorcentaje);
  const rotacion_inventarios = razones_actividad
    .rotacion_inventarios(costo_de_ventas, inventarios)
    .toFixed(nivelPorcentaje);
  const numero_dias_inventario = razones_actividad
    .numero_dias_inventario(inventarios, costo_de_ventas)
    .toFixed(nivelPorcentaje);
  const ciclo_operacional = razones_actividad
    .ciclo_operacional(cuentas_por_cobrar, ventas, inventarios, costo_de_ventas)
    .toFixed(nivelPorcentaje);
  const periodo_promedio_cobro = razones_actividad
    .periodo_promedio_cobro(cuentas_por_cobrar, ventas)
    .toFixed(nivelPorcentaje);
  const periodo_promedio_pago = razones_actividad
    .periodo_promedio_pago(cuentas_por_pagar, costo_de_ventas)
    .toFixed(nivelPorcentaje);
  const rotacion_activo_total = razones_actividad
    .rotacion_activo_total(ventas, activo)
    .toFixed(nivelPorcentaje);
  const rotacion_activo_operacional = razones_actividad
    .rotacion_activo_operacional(
      ventas,
      cuentas_por_cobrar,
      inventarios,
      activo_no_corriente,
      total_depreciacion,
      efectivo
    )
    .toFixed(nivelPorcentaje);

  // Razones de Deuda

  const razon_endeudamiento = razones_deuda
    .razon_endeudamiento(pasivo, activo)
    .toFixed(nivelPorcentaje);
  const razon_deuda_capital_patrimonial = razones_deuda
    .razon_deuda_capital_patrimonial(pasivo, patrimonio)
    .toFixed(nivelPorcentaje);
  const razon_cargos_interes_fijo = razones_deuda
    .razon_cargos_interes_fijo(utilidad_antes_impuestos, impuestos)
    .toFixed(nivelPorcentaje);
  const maf = razones_deuda.MAF(activo, patrimonio).toFixed(nivelPorcentaje);

  // Razones de Rendimiento

  const roa = razones_rendimiento
    .ROA(utilidad_neta, activo)
    .toFixed(nivelPorcentaje);
  const roe = razones_rendimiento
    .ROE(utilidad_neta, patrimonio)
    .toFixed(nivelPorcentaje);
  const margen_utilidad_bruta = razones_rendimiento
    .margen_utilidad_bruta(utilidad_bruta, ventas)
    .toFixed(nivelPorcentaje);
  const margen_utilidad_operativa = razones_rendimiento
    .margen_utilidad_operativa(utilidad_operativa, ventas)
    .toFixed(nivelPorcentaje);
  const margen_utilidad_neta = razones_rendimiento
    .margen_utilidad_neta(utilidad_neta, ventas)
    .toFixed(nivelPorcentaje);

  return {
    activo,
    pasivo,
    activo_corriente,
    pasivo_corriente,
    patrimonio,
    inventarios,
    utilidad_bruta,
    utilidad_operativa,
    utilidad_antes_impuestos,
    utilidad_neta,
    ventas,
    // Razones de Liquidez
    razon_circulante,
    razon_rapida,
    capital_trabajo,
    nivel_dependencia,
    // Razones de Actividad
    rotacion_cuentas_por_cobrar,
    rotacion_inventarios,
    periodo_promedio_cobro,
    periodo_promedio_pago,
    rotacion_activo_total,
    rotacion_activo_operacional,
    numero_dias_inventario,
    ciclo_operacional,
    // Razon de Deuda
    razon_endeudamiento,
    razon_deuda_capital_patrimonial,
    razon_cargos_interes_fijo,
    maf,
    // Razones de Rendimiento
    roa,
    roe,
    margen_utilidad_bruta,
    margen_utilidad_operativa,
    margen_utilidad_neta,
  };
};

const limpiarTabla = () => {
  rows.value = [];
  columns.value = [];
};

watch(razon, () => {
  if (generador.value) {
    generador.value = false;
  }
});
watch(año, () => {
  if (generador.value) {
    generador.value = false;
  }
});
</script>

<style scoped>
.razones-financieras_container {
  height: 100vh;
}

.info-container {
  margin: 1.5rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}

.title label {
  color: #fff;
  font-size: 1.5rem;
}

.periodo-container {
  display: grid;
  grid-template-columns: 90px 350px 90px 250px;
  gap: 10px;
  align-items: center;
  margin-top: 1.5rem;
}

.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.razones-container {
  margin: 1.7rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}

.buttom {
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  height: 48px;
  letter-spacing: 0.25px;
  padding: 2px 24px;
}
</style>
