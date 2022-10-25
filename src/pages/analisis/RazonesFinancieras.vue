<template>
    <div class="razones-financieras_container">
        <div class="info-container bg-secondary">
            <div class="title">
                <label>Razones Financieras</label>
            </div>
            <div class="periodo-container">
                <label>Periodo 1: </label>
                <q-select filled v-model="model" :options="periods" label="Periodo" />
                <label>Periodo 2: </label>
                <q-select filled v-model="model2" :options="periods2" label="Periodo" />
            </div>
            <div class="button-container">
                <button class="btn-activar" @click="activarRazonesLiquidez(2018)">
                    Activar
                </button>
            </div>
        </div>  
        <div class="razones-container bg-positive">
            <RazonesLiquidez :columns="columns" :rows="rows"/>
        </div>      
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";
import RazonesLiquidez from "components/RazonesFinancieras/RazonesLiquidez.vue";
import { razones_liquidez } from "../../utils/razones.js";
import { obtenerTotalesBalance, obtenerTotalesEstado } from "../../utils/totales.js"

onBeforeMount(() => {
    const tamanio = input.balance_general.length;
    for(let i = 0; i < tamanio; i++){
        periods.push(input.balance_general[i].año);
        periods2.push(input.balance_general[i].año);
    }
})

const input = useCounterStore();
let model = ref(null);
let model2 = ref(null);
let periods = [];
let periods2 = [];

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories' },
  { name: 'fat', label: 'Fat (g)', field: 'fat' },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium' },
  { name: 'iron', label: 'Iron (%)', field: 'iron' }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
]

const activarRazones = () => {

}

const activarRazonesLiquidez = (año) => {
    const totalesBalance = obtenerTotalesBalance(año);
    const totalesEstado = obtenerTotalesEstado(año);
    const balance = input.getBalanceGeneralByYear(año);

    const activo = totalesBalance.totalActivo;
    const pasivo = totalesBalance.totalPasivo;
    const activo_corriente = totalesBalance.totalActivoCorriente;
    const pasivo_corriente = totalesBalance.totalPasivoCorriente;
    const patrimonio = totalesBalance.totalPatrimonio;
    const inventarios = balance.activo.activo_corriente.get("Inventarios");

    const utilidad_bruta = totalesEstado.utilidadBruta;
    const utilidad_operativa = totalesEstado.utilidadOperacion;
    const utilidad_antes_impuestos = totalesEstado.utilidadAntesImpuestos;
    const utilidad_neta = totalesEstado.utilidadNeta;
    const ventas = totalesEstado.ProductosOperacion;

    const razon_circulante = razones_liquidez.razon_circulante(activo_corriente, pasivo_corriente);
    const razon_rapida = razones_liquidez.razon_rapida(activo_corriente, inventarios, pasivo_corriente);
    const capital_trabajo = razones_liquidez.capital_trabajo(activo_corriente, pasivo_corriente);

    const roa = razones_liquidez.roa(utilidad_neta, activo);
    const roe = razones_liquidez.roe(utilidad_neta, patrimonio);
    const ros = razones_liquidez.ros(utilidad_neta, ventas);

    
}

</script>

<style>
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