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

        <div v-if="generador === true" class="vertical-seccion-container bg-positive">
            <TablaVerticalBalance :columns="columns" :rowsActivo="rowsActivo" :rowsPasivo="rowsPasivo" :rowsPatrimonio="rowsPatrimonio"/>
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
let generador = ref(false);
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
let rowsPasivo = ref([]);
let rowsPatrimonio = ref([]);

const activarAnalisis = (año, estado) => {
    generador.value = true;
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
    
    // Esta parte es para crear el total del activo no corriente

    rowsActivo.value.push(["Total Activo No Corriente"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsActivo.value[contador].push(totales.totalActivoNoCorriente, calcularPorcentaje(totales.totalActivoNoCorriente, totales.totalActivoNoCorriente).toFixed(1) + "%", calcularPorcentaje(totales.totalActivoNoCorriente, totales.totalActivo).toFixed(1) + "%")
    }    

    contador++;

    // Finalmente la fila que crea el total del Activo

    rowsActivo.value.push(["Total Activo"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsActivo.value[contador].push(totales.totalActivoNoCorriente, 0, calcularPorcentaje(totales.totalActivo, totales.totalActivo).toFixed(1) + "%")
    }    

    contador++;

    // COMIENZA LA SECCION QUE LLENA LAS FILAS DEL PASIVO

    let contador2 = 0;

    for(let val of keysBalance.pasivo_corriente){
        rowsPasivo.value.push([val]);
        for(let año of años){
            let totales = obtenerTotalesBalance(año);
            let pasivoCorriente = (totales.balance.pasivo.pasivo_corriente.get(val) || 0); 
            rowsPasivo.value[contador2].push(pasivoCorriente, calcularPorcentaje(pasivoCorriente, totales.totalPasivoCorriente).toFixed(1) + "%", calcularPorcentaje(pasivoCorriente, totales.totalPasivo).toFixed(1) + "%");   
        }
        contador2++;
    }    

    // Esta parte es para crear la fila del total del pasivo corriente

    rowsPasivo.value.push(["Total Pasivo Corriente"]);
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsPasivo.value[contador2].push(totales.totalPasivoCorriente, calcularPorcentaje(totales.totalPasivoCorriente, totales.totalPasivoCorriente).toFixed(1) + "%", calcularPorcentaje(totales.totalPasivoCorriente, totales.totalPasivo).toFixed(1) + "%");
    }    

    contador2++;

    for(let val of keysBalance.pasivo_no_corriente){
        rowsPasivo.value.push([val]);
        for(let año of años){
            let totales = obtenerTotalesBalance(año);
            let pasivoNoCorriente = (totales.balance.pasivo.pasivo_no_corriente.get(val) || 0); 
            rowsPasivo.value[contador2].push(pasivoNoCorriente, calcularPorcentaje(pasivoNoCorriente, totales.totalPasivoNoCorriente).toFixed(1) + "%", calcularPorcentaje(pasivoNoCorriente, totales.totalPasivo).toFixed(1) + "%");   
        }
        contador2++;
    }  

    // Esta parte es para crear la fila del total del pasivo no corriente

    rowsPasivo.value.push(["Total Pasivo No Corriente"]);
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsPasivo.value[contador2].push(totales.totalPasivoNoCorriente, calcularPorcentaje(totales.totalPasivoNoCorriente, totales.totalPasivoNoCorriente).toFixed(1) + "%", calcularPorcentaje(totales.totalPasivoNoCorriente, totales.totalPasivo).toFixed(1) + "%");
    }    

    contador2++;

    // Finalmente la fila que crea el total del Pasivo

    rowsPasivo.value.push(["Total Pasivo"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        rowsPasivo.value[contador2].push(totales.totalPasivo, 0, calcularPorcentaje(totales.totalPasivo, totales.totalPasivo).toFixed(1) + "%");
    }    

    // COMIENZA LA SECCION DEL PATRIMONIO

    let contador3 = 0;      

    for(let val of keysBalance.patrimonio){
        if(val === "Capital social mínimo"){
            rowsPatrimonio.value.push([val]);
            for(let año of años){
                let totales = obtenerTotalesBalance(año);
                // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0); 
                let patrimonio = (totales.CapitalSocialMinimo || 0); 
                let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);
                rowsPatrimonio.value[contador3].push(patrimonio, calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) + "%", calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%");   
            }
            contador3++;
        }  
        else if(val === "Capital social variable"){
            rowsPatrimonio.value.push([val]);
            for(let año of años){
                let totales = obtenerTotalesBalance(año);
                // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0); 
                let patrimonio = (totales.CapitalSocialVariable || 0); 
                let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);
                rowsPatrimonio.value[contador3].push(patrimonio, calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) + "%", calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%");   
            }
            contador3++;
        }
        else if(val === "sub_capital_social"){
            rowsPatrimonio.value.push([val]);
            for(let año of años){
                let totales = obtenerTotalesBalance(año);
                // let patrimonio = (totales.balance.patrimonio.get("sub_capital_social").get(val) || 0); 
                let patrimonio = (totales.totalCapitalSocial || 0); 
                let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);
                rowsPatrimonio.value[contador3].push(patrimonio, calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) + "%", calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%");   
            }
            contador3++;
        }
        else {
            rowsPatrimonio.value.push([val]);
            for(let año of años){
                let totales = obtenerTotalesBalance(año);
                let patrimonio = (totales.balance.patrimonio.get(val) || 0); 
                let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);
                rowsPatrimonio.value[contador3].push(patrimonio, calcularPorcentaje(patrimonio, totales.totalPatrimonio).toFixed(1) + "%", calcularPorcentaje(patrimonio, patrimonioPasivo).toFixed(1) + "%");   
            }
            contador3++;
        }
    }

    // Esta parte es para crear la fila del total patrimonio neto

    rowsPatrimonio.value.push(["Total Patrimonio Neto"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);        
        rowsPatrimonio.value[contador3].push(totales.totalPatrimonio, calcularPorcentaje(totales.totalPatrimonio, totales.totalPatrimonio).toFixed(1) + "%", calcularPorcentaje(totales.totalPatrimonio, patrimonioPasivo).toFixed(1) + "%");
    }

    contador3++;

    rowsPatrimonio.value.push(["Total Pasivo + Patrimonio Neto"])
    for(let año of años){
        let totales = obtenerTotalesBalance(año);
        let patrimonioPasivo = ((totales.totalPasivo + totales.totalPatrimonio) || 0);        
        rowsPatrimonio.value[contador3].push(patrimonioPasivo, 0 + "%", calcularPorcentaje(patrimonioPasivo, patrimonioPasivo).toFixed(1) + "%");
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

const limpiarVariables = () => {
    columns.value = [];
    rowsActivo.value = [];
    rowsPasivo.value = [];
    rowsPatrimonio.value = [];
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