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
            <TablaVerticalBalance :columns="columns"/>
        </div>

    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";
import TablaVerticalBalance from "../../components/AnalisisVertical/TablaVerticalBalance.vue";
import { obtenerTotalesBalance, obtenerTotalesEstado } from "../../utils/totales.js";

onBeforeMount(() => {
    const tamanio = input.balance_general.length;
    for(let i = 0; i < tamanio; i++){
        periods.push(input.balance_general[i].año);
    }
})

const input = useCounterStore();
let año = ref([]);
let options = [
    "Balance General",
    "Estado de Resultados"
];
let estado = ref(null);
let periods = [];
let columns = ref([]);
let rowsActivo = ref([]);

const activarAnalisis = (año, estado) => {
    if(estado === "Balance General"){
        columns.value.push("ACTIVO");
        let controlador = -1;
        for(let a of año){
            columns.value.push(año, "(%) Relativo", "(%) Absoluto");
            activarAnalisisBalance(a, controlador);
            controlador++;
        }
        console.log(rowsActivo.value)
    }
}

const activarAnalisisBalance = (año, controlador) => {
    let contador = 0;
    const totales = obtenerDatosRazones(año);
    if(controlador === -1){
        for(let [key, value] of totales.balance.activo.activo_corriente){
            rowsActivo.value.push([key, value, calcularPorcentaje(value, totales.activo_corriente), calcularPorcentaje(value, totales.activo)])
        }   
        return     
    }
    for(let [key, value] of totales.balance.activo.activo_corriente){
        rowsActivo.value[controlador].push(value, calcularPorcentaje(value, totales.activo_corriente), calcularPorcentaje(value, totales.activo));
    }     

    
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

</script>

<style>

.analisis-vertical_container {
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