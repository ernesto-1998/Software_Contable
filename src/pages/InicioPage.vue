<template>
  <div>
    <div class="row intro">
      <div class="col-4">
        <q-img src="../assets/LOGO3-removebg-preview2.png"> </q-img>
      </div>
      <div class="col q-ma-xl q-py-xl">
        <h1>
          Distribuidora de Electricidad <span class="q-ml-xs">DELSUR</span>
        </h1>
        <p class="q-mt-lg">
          “Contribuir a la armonía de la vida para un mundo mejor”
        </p>
        <button @click="scrollInto('first')">Ir Elemento1</button>
      </div>
    </div>

    <div id="first" class="first bg-positive">
      <div class="row title">
        <h2>ESTADOS FINANCIEROS</h2>
      </div>
      <div class="row q-mt-xl q-pa-md justify-evenly">
        <div class="col-3">
          <q-select
            transition-show="flip-up"
            transition-hide="scale"
            filled
            v-model="year"
            :options="options"
            label="Periodo:"
          />
        </div>
        <q-list v-show="showList" class="col-6 list-estados" bordered>
          <q-item clickable @click="showBalance">
            <q-item-section>
              <q-item-label>Balance General</q-item-label>
              <q-item-label caption lines="2"
                >Al 30 de Junio de {{ year }}.</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item clickable @click="showEstado">
            <q-item-section>
              <q-item-label>Estado de Resultados</q-item-label>
              <q-item-label caption>Al 30 de Junio de {{ year }}.</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />
        </q-list>
      </div>
    </div>
    <balanceDialog :balance="balance" v-if="showBalanceDialog" />
    <estadoDialog v-if="showEstadoDialog" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCounterStore } from "../stores/estados";
import balanceDialog from "../components/BalanceGeneral.vue";
import estadoDialog from "../components/EstadoResultados.vue";
import useEventsBus from "../eventBus";
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

// DATA
const { bus } = useEventsBus();
const store = useCounterStore();
const showList = ref(false);
const showBalanceDialog = ref(false);
const showEstadoDialog = ref(false);
const year = ref(null);
let balance = ref(null);
const options = ["2018", "2019", "2020", "2021", "2022"];

// METHODS
function showBalance() {
  balance.value = store.getBalanceGeneralByYear(parseInt(year.value));
  showBalanceDialog.value = true;
}
function showEstado() {
  showEstadoDialog.value = true;
  emit("sendEstado", store.getEstadoByYear(parseInt(year.value)));
}

function scrollInto(el) {
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const duration = 1000;
  setVerticalScrollPosition(target, offset, duration);
}

// Computed
const computedShowBalance = computed(() => {
  return showBalanceDialog;
});

const computedShowEstado = computed(() => {
  return showEstadoDialog;
});

// WATCHS
watch(year, () => {
  console.log("detectamos cambio en el year");
  showList.value = true;
});

watch(
  () => bus.value.get("closeBalance"),
  () => {
    console.log(" se ha cerrado el balance");
    showBalanceDialog.value = false;
  }
);
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,900&display=swap");
button {
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
  margin: 10px 10px;
  width: 200px;
  padding: 10px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
}

button:hover {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}
.title {
  display: flex;
  justify-content: center;
}
.first {
  margin-top: 270px;
  padding-bottom: 650px;
}
.list-estados {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
h2 {
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 62px;
  font-weight: 800;
  line-height: 72px;
  margin: 0 0 24px;
  text-align: center;
  text-transform: uppercase;
}
h1 span {
  padding: 2px 15px;
  background: #000;
  transform: translate(-1%, -1%);
  display: inline-block;
  color: rgb(132, 59, 98);
  font-size: 80px;
  letter-spacing: 2px;
}

h1 span::before {
  padding: 2px 15px;
  content: "DELSUR";
  position: absolute;
  color: transparent;
  background-image: repeating-linear-gradient(
    45deg,
    transparent 0,
    transparent 2px,
    rgb(246, 126, 125) 2px,
    white 4px
  );
  -webkit-background-clip: text;
  top: 0px;
  left: 0;
  z-index: -1;
  transition: 1s;
}

h1 span::after {
  padding: 2px 15px;
  content: "DELSUR";
  position: absolute;
  color: transparent;
  background-image: repeating-linear-gradient(
    135deg,
    transparent 0,
    transparent 2px,
    rgb(255, 255, 255) 2px,
    rgb(255, 255, 255) 4px
  );
  -webkit-background-clip: text;
  top: 0px;
  left: 0px;
  transition: 1s;
}

h1 span:hover:before {
  top: 10px;
  left: 10px;
}

h1 span:hover:after {
  top: -10px;
  left: -10px;
}
p {
  color: #000000;
  font-family: "Raleway", Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: 0.175em;
  line-height: 1.75;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
}
h1 {
  font-family: "Source Sans Pro", Helvetica, sans-serif;
  font-size: 5rem;
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  text-transform: none;
}
</style>
