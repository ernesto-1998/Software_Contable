<template>
    <div class="analisis-vertical_container">
        <div class="info-container bg-secondary">
            <div class="title">
                <label> Análisis Vertical </label>
            </div>
            <div class="estado-financiero_container">
                <label>Periodo: </label>
                <q-select
                    filled
                    v-model="año"
                    multiple
                    :options="periods"
                    label="periodo"
                    style="width: 250px"
                />
            </div>
            <div class="periodo-container">
                <label>Estados: </label>
                <q-select filled v-model="estado" :options="options" label="Estado" />
            </div>
            <div class="button-container">
                <button class="btn-activar" @click="activarAnalisis(año, estado)">
                    Activar
                </button>
            </div>            
        </div>

        <div class="vertical-seccion-container bg-positive">
            <TablaVerticalBalance :columns="columns" :rowsActivo="rowsActivo"/>
        </div>

    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";
import TablaVerticalBalance from "../../components/AnalisisVertical/TablaVerticalBalance.vue";
import { obtenerTotalesBalance, obtenerTotalesEstado } from "../../utils/totales.js";
import { getKeysBalance } from "../../utils/getKeys.js";

onBeforeMount(() => {
    const tamanio = input.balance_general.length;
    for(let i = 0; i < tamanio; i++){
        periods.push(input.balance_general[i].año);
    }

    let años = [2018, 2019, 2020, 2021, 2022];
    let temporalKeys = getKeysBalance(años);
    keysBalance = {
        activo_corriente: Array.from(new Set(temporalKeys.ActivoCorriente)),
        activo_no_corriente: Array.from(new Set(temporalKeys.ActivoNoCorriente)),
        pasivo_corriente: Array.from(new Set(temporalKeys.PasivoCorriente)),
        pasivo_no_corriente: Array.from(new Set(temporalKeys.PasivoNoCorriente)),
        patrimonio: Array.from(new Set(temporalKeys.Patrimonio)),
    }
});

const input = useCounterStore();
let año = ref([]);
let options = [
    "Balance General",
    "Estado de Resultados"
];
let estado = ref(null);
let periods = [];
let keysBalance = {};
let temporalVals = {};

let columns = ref([]);
let rowsActivo = ref([]);

const activarAnalisis = (año, estado) => {
    limpiarVariables();
    if(estado === "Balance General"){
        columns.value.push("ACTIVO");
        for(let a of año){
            columns.value.push(a, "(%) Relativo", "(%) Absoluto");
        }
        activarAnalisisBalance(año);
    }
    
}

const activarAnalisisBalance = (años) => {
    let contador = 0;
    for(let val of keysBalance.activo_corriente){
        rowsActivo.value.push([val]);
        for(let año of años){
            let totales = obtenerTotalesBalance(año);
            let activoCorriente = (totales.balance.activo.activo_corriente.get(val) || 0); 
            rowsActivo.value[contador].push(activoCorriente, calcularPorcentaje(activoCorriente, totales.totalActivoCorriente).toFixed(1) + "%", calcularPorcentaje(activoCorriente, totales.totalActivo).toFixed(1) + "%");   
        }
        contador++;
    }

    // Esta parte es para crear la fila del total activo corriente

    rowsActivo.value.push(["Total Activo Corriente"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsActivo.value[contador].push(totales.totalActivoCorriente, calcularPorcentaje(totales.totalActivoCorriente, totales.totalActivoCorriente).toFixed(1) + "%", calcularPorcentaje(totales.totalActivoCorriente, totales.totalActivo).toFixed(1) + "%")
    }

    contador++;

    for(let val of keysBalance.activo_no_corriente){
        rowsActivo.value.push([val]);
        for(let año of años){
            let totales = obtenerTotalesBalance(año);
            let activoNoCorriente = (totales.balance.activo.activo_no_corriente.get(val) || 0); 
            rowsActivo.value[contador].push(activoNoCorriente, calcularPorcentaje(activoNoCorriente, totales.totalActivoNoCorriente).toFixed(1) + "%", calcularPorcentaje(activoNoCorriente, totales.totalActivo).toFixed(1) + "%");   
        }
        contador++;
    }   
    
    // Esta parte es para crear la final del total del activo no corriente

    rowsActivo.value.push(["Total Activo No Corriente"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsActivo.value[contador].push(totales.totalActivoNoCorriente, calcularPorcentaje(totales.totalActivoNoCorriente, totales.totalActivoNoCorriente).toFixed(1) + "%", calcularPorcentaje(totales.totalActivoNoCorriente, totales.totalActivo).toFixed(1) + "%")
    }    

    contador++;
}

const calcularPorcentaje = (numerador, denominador) => {
    return (numerador / denominador) * 100;
}

const obtenerDatosRazones = (año) => {
    const totalesBalance = obtenerTotalesBalance(año);
    const totalesEstado = obtenerTotalesEstado(año);

    const balance = totalesBalance.balance;
    const activo = totalesBalance.totalActivo;
    const pasivo = totalesBalance.totalPasivo;
    const activo_corriente = totalesBalance.totalActivoCorriente;
    const pasivo_corriente = totalesBalance.totalPasivoCorriente;
    const activo_no_corriente = totalesBalance.totalActivoNoCorriente;
    const pasivo_no_corriente = totalesBalance.totalPasivoNoCorriente;

    return {
        balance, activo, pasivo, activo_corriente, activo_no_corriente, pasivo_corriente, pasivo_no_corriente
    }
}

const limpiarVariables = () => {
    columns.value = [];
    rowsActivo.value = [];
}
</script>

<style>

.analisis-vertical_container {
    height: 100%;
    /* margin-bottom: 2.5rem; */
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

.estado-financiero_container, .periodo-container {
    display: grid;
    grid-template-columns: 150px 250px;
    align-items: center;
    margin-top: 1.5rem;
}

.estado-financiero_container label {
    color: #fff;
    font-size: 1rem;
}

.periodo-container label {
    color: #fff;
    font-size: 1rem;
}

.button-container {
    margin-top: 1.5rem;
}

.vertical-seccion-container {
    margin: 1.7rem 2.5rem;
    padding: 1rem;
    border-radius: 16px;
}

</style>