<template>
    <div class="razones-financieras_container">
        <div class="info-container bg-secondary">
            <div class="title">
                <label>Razones Financieras</label>
            </div>
            <div class="periodo-container">
                <label>Periodo 1: </label>
                <q-select filled v-model="año" :options="periods" label="Periodo" />
                <label>Periodo 2: </label>
                <q-select filled v-model="año2" :options="periods2" label="Periodo" />
            </div>
            <div class="button-container">
                <button class="btn-activar" @click="activarRazones(año, año2)">
                    Activar
                </button>
            </div>
        </div>  
        <div class="razones-container bg-positive" v-if="columns.length !== 0">
            <RazonesLiquidez :columns="columns" :rows="rows" :title="title" :secondRow="secondRow"/>
        </div>      
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";
import RazonesLiquidez from "src/components/RazonesFinancieras/TablaRazones.vue";
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
let año = ref(null);
let año2 = ref(null);
let periods = [];
let periods2 = [];
let title = ref("");
let secondRow = ref(false);

let columns = ref([]);
let rows = ref([]);

const activarRazones = (año, año2) => {
    if(año === null && año2 === null) alert("Debes escoger un año de periodo");
    else if(año === null) alert("Debes escoger el primer periodo primero");
    else if(año !== null && año2 !== null) {
        secondRow.value = true;
        activarRazonesLiquidez(año);
        activarRazonesLiquidez(año2);
    }
}

const activarRazonesLiquidez = (año) => {
    title.value = "Razones de Liquidez";

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

    columns.value = ["Año", "Razón Circulante", "Razón Rápida", "Capital de Trabajo", "ROA", "ROE", "ROS"];
    rows.value = [año ,razon_circulante, razon_rapida, capital_trabajo, roa, roe, ros];

    
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