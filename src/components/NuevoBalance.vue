<template>
  <div>
    <q-table
      class="bg-white"
      :rows="cac"
      :columns="ac"
      row-key="name"
      virtual-scroll
      :pagination="initialPagination"
      hide-pagination
      :rows-per-page-options="[0]"
      title="Balance General"
    >
      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #001aff">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
          >
            {{ col.name }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" style="background-color: #b2b5d4">
          <q-td key="name">
            {{
              // store.getBalanceGeneralByYear(2018).activo.activo_corriente
              props.row.name
            }}
          </q-td>
          <q-td key="Cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Agregar dato"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      class="bg-white"
      :rows="canc"
      :columns="anc"
      row-key="name"
      virtual-scroll
      :pagination="initialPagination"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #027d79">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
          >
            {{ col.name }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" style="background-color: #b1c9c9">
          <q-td key="name">
            {{
              // store.getBalanceGeneralByYear(2018).activo.activo_corriente
              props.row.name
            }}
          </q-td>
          <q-td key="Cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Agregar dato"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      class="bg-white"
      :rows="cpc"
      :columns="pc"
      row-key="name"
      virtual-scroll
      :pagination="initialPagination"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #491980">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
          >
            {{ col.name }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" style="background-color: #b9a9cc">
          <q-td key="name">
            {{
              // store.getBalanceGeneralByYear(2018).activo.activo_corriente
              props.row.name
            }}
          </q-td>
          <q-td key="Cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Agregar dato"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      class="bg-white"
      :rows="cpnc"
      :columns="pnc"
      row-key="name"
      virtual-scroll
      :pagination="initialPagination"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #960055">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
          >
            {{ col.name }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" style="background-color: #c4a1b5">
          <q-td key="name">
            {{
              // store.getBalanceGeneralByYear(2018).activo.activo_corriente
              props.row.name
            }}
          </q-td>
          <q-td key="Cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Agregar dato"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      class="bg-white"
      :rows="cp"
      :columns="p"
      row-key="name"
      virtual-scroll
      :pagination="initialPagination"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props" style="background-color: #ad5400">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-white"
          >
            {{ col.name }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" style="background-color: #c9b4a1">
          <q-td key="name">
            {{
              // store.getBalanceGeneralByYear(2018).activo.activo_corriente
              props.row.name
            }}
          </q-td>
          <q-td key="Cantidad" :props="props">
            {{ props.row.cantidad }}
            <q-popup-edit
              v-model="props.row.cantidad"
              title="Agregar dato"
              buttons
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-bar style="height: 7%">
      <q-space />
      <q-btn
        class="text-white"
        dense
        flat
        label="Siguiente"
        style="font-size: 13px"
      ></q-btn>
    </q-bar>
  </div>
</template>
<script>
import { useCounterStore } from "stores/estados";
import { ref } from "vue";
import { defineComponent } from "vue";

const store = useCounterStore();

const ac = [
  {
    name: "Cuentas de activos corrientes",
    required: true,
    label: "Cuentas de activos corrientes",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const anc = [
  {
    name: "Cuentas de activos no corrientes",
    required: true,
    label: "Cuentas de activos no corrientes",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const pc = [
  {
    name: "Cuentas de pasivos corrientes",
    required: true,
    label: "Cuentas de pasivos corrientes",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const pnc = [
  {
    name: "Cuentas de pasivos no corrientes",
    required: true,
    label: "Cuentas de pasivos no corrientes",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const p = [
  {
    name: "Cuentas de patrimonio",
    required: true,
    label: "Cuentas de patrimonio",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const cac = [
  {
    name: "Efectivo y Equivalentes de Efectivo",
    cantidad: 0,
  },
  {
    name: "Efectivo Restringido",
    cantidad: 0,
  },
  {
    name: "Inversión temporales mantenidas al vencimiento",
    cantidad: 0,
  },
  {
    name: "Cuentas por Cobrar",
    cantidad: 0,
  },
  {
    name: "Cuentas por Cobrar Activo Regulatorio",
    cantidad: 0,
  },
  {
    name: "Estimación para Cuentas Incobrables",
    cantidad: 0,
  },
  {
    name: "Cuentas por Cobrar a partes relacionadas",
    cantidad: 0,
  },
  {
    name: "Inventarios",
    cantidad: 0,
  },
  {
    name: "Gastos Pagados por Anticipado",
    cantidad: 0,
  },
  {
    name: "Otros Activos",
    cantidad: 0,
  },
  {
    name: "TOTAL ACTIVO CORRIENTE",
    cantidad: 0,
  },
];
const canc = [
  {
    name: "Inversión en Acciones Compañías Subsidiarias",
    cantidad: 0,
  },
  {
    name: "Inversión mantenidas al vencimiento",
    cantidad: 0,
  },
  {
    name: "Préstamos por cobrar Largo Plazo",
    cantidad: 0,
  },
  {
    name: "Préstamos por Cobrar a partes relacionadas",
    cantidad: 0,
  },
  {
    name: "Materiales y equipos para Propiedad, Planta y Equipo",
    cantidad: 0,
  },
  {
    name: "Propiedad, Planta y Equipo",
    cantidad: 0,
  },
  {
    name: "Depreciación Acumulada de Propiedad, Planta y Equipo",
    cantidad: 0,
  },
  {
    name: "Depreciación de Propiedad, Planta y Equipo",
    cantidad: 0,
  },
  {
    name: "Depreciación Acumulada de Revaluación PP&E",
    cantidad: 0,
  },
  {
    name: "Obras en Proceso",
    cantidad: 0,
  },
  {
    name: "Bienes Intangibles",
    cantidad: 0,
  },
  {
    name: "Amortización de Intangibles",
    cantidad: 0,
  },
  {
    name: "Activo por impuesto sobre la renta diferido",
    cantidad: 0,
  },
  {
    name: "Activos por diferidos a largo plazo",
    cantidad: 0,
  },
  {
    name: "TOTAL ACTIVO NO CORRIENTE",
    cantidad: 0,
  },
];
const cpc = [
  {
    name: "Sobregiros bancarios contables",
    cantidad: 0,
  },
  {
    name: "Prestamos Bancarios por Pagar a Corto Plazo",
    cantidad: 0,
  },
  {
    name: "Títulos emitidos por Pagar a Corto Plazo",
    cantidad: 0,
  },
  {
    name: "Proveedores de Energía Eléctrica",
    cantidad: 0,
  },
  {
    name: "Cuentas por Pagar Regulatorias",
    cantidad: 0,
  },
  {
    name: "Cuentas por pagar a partes relacionadas",
    cantidad: 0,
  },
  {
    name: "Cuentas por Pagar Comerciales",
    cantidad: 0,
  },
  {
    name: "Otras cuentas por pagar y Gastos acumulados",
    cantidad: 0,
  },
  {
    name: "Impuestos por Pagar",
    cantidad: 0,
  },
  {
    name: "Dividendos por pagar",
    cantidad: 0,
  },
  {
    name: "Depósitos de Consumidores",
    cantidad: 0,
  },
  {
    name: "Ingreso Diferido a corto plazo",
    cantidad: 0,
  },
  {
    name: "Otros Créditos Diferidos",
    cantidad: 0,
  },
  {
    name: "TOTAL PASIVO CORRIENTE",
    cantidad: 0,
  },
];
const cpnc = [
  {
    name: "Prestamos a Largo Plazo",
    cantidad: 0,
  },
  {
    name: "Cuentas por pagar Accionistas",
    cantidad: 0,
  },
  {
    name: "Pasivo por Impuesto sobre la Renta Diferido",
    cantidad: 0,
  },
  {
    name: "Ingreso Diferido a largo plazo",
    cantidad: 0,
  },
  {
    name: "Provisión para Obligaciones Laborales",
    cantidad: 0,
  },
  {
    name: "TOTAL PASIVO NO CORRIENTE",
    cantidad: 0,
  },
];
const cp = [
  {
    name: "Capital social mínimo",
    cantidad: 0,
  },
  {
    name: "Capital social variable",
    cantidad: 0,
  },
  {
    name: "Superávit por Revaluación de Activo",
    cantidad: 0,
  },
  {
    name: "Superávit Realizado",
    cantidad: 0,
  },
  {
    name: "Ganancias Pérdidas actuariales",
    cantidad: 0,
  },
  {
    name: "Reserva Legal",
    cantidad: 0,
  },
  {
    name: "Utilidades por Aplicar de ejercicios anteriores",
    cantidad: 0,
  },
  {
    name: "Utilidad del Ejercicio Corriente",
    cantidad: 0,
  },
  {
    name: "TOTAL PATRIMONIO",
    cantidad: 0,
  },
];

const cuentas = store
  .getBalanceGeneralByYear(2018)
  .activo.activo_corriente.keys();
console.log(cuentas.next().value);
console.log(cuentas.next().value);
console.log(cuentas.next().value);

export default defineComponent({
  name: "Nuevo-Balance",
  setup() {
    return {
      nuevo: ref(false),
      maximizedToggle: ref(true),
      ac,
      anc,
      pc,
      pnc,
      p,
      cac: ref(cac),
      canc: ref(canc),
      cpc: ref(cpc),
      cpnc: ref(cpnc),
      cp: ref(cp),
      store,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
});
</script>
