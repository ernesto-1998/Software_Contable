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
        </div>  
        <div class="razones-container bg-positive">

        </div>      
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useCounterStore } from "stores/estados";

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
    height: 350px;
}

</style>