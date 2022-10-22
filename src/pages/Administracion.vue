<template id="prueba">
  <div class="row">
    <div class="q-pl-md col-xs-12 col-sm-8 col-md-9">
      <h5>Calendario fiscal de la empresa</h5>
    </div>
    <div class="col-xs-12 col-sm-4 col-md-2 q-pt-md">
      <q-btn
        color="secondary"
        label="Nuevo"
        class="q-my-lg"
        @click="nuevo = true"
      />
      <q-dialog v-model="nuevo" persistent :maximized="maximizedToggle">
        <q-card class="bg-grey-5 text-black">
          <q-bar>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-table
            class="bg-grey-5"
            :rows="rows"
            :columns="columns"
            row-key="name"
            virtual-scroll
            :pagination="none"
            :rows-per-page-options="[0]"
            title="Activos corrientes"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
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
                    <q-input
                      type="number"
                      v-model="scope.value"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>

          <q-table
            class="bg-grey-5"
            :rows="rows"
            :columns="columns"
            row-key="name"
            virtual-scroll
            :pagination="none"
            :rows-per-page-options="[0]"
            title="Activos no corrientes"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
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
                    <q-input
                      type="number"
                      v-model="scope.value"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import { useCounterStore } from "stores/estados";
import { defineComponent } from "vue";
import { ref } from "vue";

const store = useCounterStore();

const columns = [
  {
    name: "name",
    required: true,
    label: "Cuentas",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: "Cantidad",
    align: "center",
    label: "Cantidad",
    field: "cantidad",
  },
];

const rows = [
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
];

const cuentas = store
  .getBalanceGeneralByYear(2018)
  .activo.activo_corriente.keys();
console.log(cuentas.next().value);
console.log(cuentas.next().value);
console.log(cuentas.next().value);
export default defineComponent({
  name: "Administracion-page",
  setup() {
    return {
      nuevo: ref(false),
      maximizedToggle: ref(true),
      columns,
      rows: ref(rows),
      store,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
});
</script>
