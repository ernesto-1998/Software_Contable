<template>
  <div class="razones-financieras_container">
    <div class="info-container bg-secondary">
      <div class="title">
        <label>Razones Financieras</label>
      </div>
      <div class="periodo-container">
        <label>Periodo: </label>
        <q-select
          filled
          v-model="año"
          multiple
          :options="periods"
          label="periodo"
          style="width: 250px"
        />
        <label>Razones: </label>
        <q-select filled v-model="razon" :options="razones" label="Razon" />
      </div>
      <div class="button-container">
        <button class="btn-activar" @click="activarRazones(año, razon)">
          Activar
        </button>
      </div>
    </div>
    <div class="razones-container bg-positive" v-if="rows.length !== 0">
      <TablaRazones :columns="columns" :rows="rows" :title="title" />
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";
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
  const tamanio = input.balance_general.length;
  for (let i = 0; i < tamanio; i++) {
    periods.push(input.balance_general[i].año);
  }
});

const input = useCounterStore();
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

const activarRazones = (año, razon) => {
  if (año.length < 1 || razon === null)
    return alert("Debe rellenar ambos campos");
  limpiarTabla();
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
    "Nivel de Dependencia",
  ];
  rows.value.push([
    año,
    datos.razon_circulante,
    datos.razon_rapida,
    datos.capital_trabajo,
    datos.nivel_dependencia,
  ]);
};

const activarRazonesActividad = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = [
    "Año",
    "Rotación de Inventarios",
    "Rotación de Cuentas por Cobrar",
    "Número de días Inventario",
    "Ciclo Operacional",
    "Periodo Promedio de Cobro",
    "Periodo Promedio de Pago",
    "Rotacion de Activo Total",
    "Rotación de Activo Operacional",
  ];
  rows.value.push([
    año,
    datos.rotacion_inventarios,
    datos.rotacion_cuentas_por_cobrar,
    datos.numero_dias_inventario,
    datos.ciclo_operacional,
    datos.periodo_promedio_cobro,
    datos.periodo_promedio_pago,
    datos.rotacion_activo_total,
    datos.rotacion_activo_operacional,
  ]);
};

const activarRazonesDeuda = (año) => {
  title.value = razon.value;
  const datos = obtenerDatosRazones(año);
  columns.value = ["Año", "Razon de Endeudamiento", "Razon Cargo Interes Fijo", "MAF"];
  rows.value.push([
    año,
    datos.razon_endeudamiento,
    datos.razon_cargos_interes_fijo,
    datos.maf
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
    datos.roa,
    datos.roe,
    datos.margen_utilidad_bruta,
    datos.margen_utilidad_operativa,
    datos.margen_utilidad_neta,
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
  const total_depreciacion = totalesBalance.total_depreciacion;

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
    .toFixed(2);
  const razon_rapida = razones_liquidez
    .razon_rapida(activo_corriente, inventarios, pasivo_corriente)
    .toFixed(2);
  const capital_trabajo = razones_liquidez
    .capital_trabajo(activo_corriente, pasivo_corriente)
    .toFixed(2);
  const nivel_dependencia = razones_liquidez
    .nivel_de_dependencia_de_inventarios(
      pasivo_corriente,
      efectivo,
      cuentas_por_cobrar,
      inventarios
    )
    .toFixed(2);

  // Razones de Actividad

  const rotacion_cuentas_por_cobrar = razones_actividad
    .rotacion_cuentas_por_cobrar(cuentas_por_cobrar, ventas)
    .toFixed(2);
  const rotacion_inventarios = razones_actividad
    .rotacion_inventarios(costo_de_ventas, inventarios)
    .toFixed(2);
  const numero_dias_inventario = razones_actividad
    .numero_dias_inventario(inventarios, costo_de_ventas)
    .toFixed(2);
  const ciclo_operacional = razones_actividad
    .ciclo_operacional(cuentas_por_cobrar, ventas, inventarios, costo_de_ventas)
    .toFixed(2);
  const periodo_promedio_cobro = razones_actividad
    .periodo_promedio_cobro(cuentas_por_cobrar, ventas)
    .toFixed(2);
  const periodo_promedio_pago = razones_actividad
    .periodo_promedio_pago(cuentas_por_pagar, costo_de_ventas)
    .toFixed(2);
  const rotacion_activo_total = razones_actividad
    .rotacion_activo_total(ventas, activo)
    .toFixed(2);
  const rotacion_activo_operacional = razones_actividad
    .rotacion_activo_operacional(
      ventas,
      cuentas_por_cobrar,
      inventarios,
      activo_no_corriente,
      total_depreciacion,
      efectivo
    )
    .toFixed(2);

  // Razones de Deuda

  const razon_endeudamiento = razones_deuda
    .razon_endeudamiento(pasivo, activo)
    .toFixed(2);
  const razon_cargos_interes_fijo = razones_deuda
    .razon_cargos_interes_fijo(utilidad_antes_impuestos, impuestos)
    .toFixed(2);
  const maf = razones_deuda.MAF(activo, patrimonio).toFixed(2);

  // Razones de Rendimiento

  const roa = razones_rendimiento.ROA(utilidad_neta, activo).toFixed(2);
  const roe = razones_rendimiento.ROE(utilidad_neta, patrimonio).toFixed(2);
  const margen_utilidad_bruta = razones_rendimiento
    .margen_utilidad_bruta(utilidad_bruta, ventas)
    .toFixed(2);
  const margen_utilidad_operativa = razones_rendimiento
    .margen_utilidad_operativa(utilidad_operativa, ventas)
    .toFixed(2);
  const margen_utilidad_neta = razones_rendimiento
    .margen_utilidad_neta(utilidad_neta, ventas)
    .toFixed(2);

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
  grid-template-columns: 90px 250px 90px 250px;
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
  /* height: 350px; */
}

.button-container {
  margin-top: 1.5rem;
}
</style>
