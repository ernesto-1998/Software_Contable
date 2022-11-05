<template>
  <div id="myDiagramDiv" class="dupont"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as go from "gojs";
import {
  obtenerTotalesBalance,
  obtenerTotalesEstado,
} from "../../utils/totales.js";
import {
  razones_actividad,
  razones_rendimiento,
  razones_deuda,
} from "../../utils/razones.js";

const props = defineProps({
  periodo: Number,
});

const estado = obtenerTotalesEstado(parseInt(props.periodo));
const balance = obtenerTotalesBalance(parseInt(props.periodo));
onMounted(() => {
  console.log(typeof props.periodo);
  const $ = go.GraphObject.make;

  // The first Diagram showcases what the Nodes might look like "in action"
  let myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout),
  });

  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(go.Shape, "RoundedRectangle", {
      fill: "#ea2857",
      strokeWidth: 0,
      width: 150,
      height: "auto",
    }),
    $(
      go.Panel,
      "Vertical",
      {
        margin: 3,
        padding: 8,
      },
      new go.Binding("itemArray", "items"),
      {
        itemTemplate: $(
          go.Panel,
          $(go.TextBlock, new go.Binding("text", "").makeTwoWay(), {
            stroke: "white",
            font: "14px sans-serif",
            textAlign: "center",
            isMultiline: true,
          })
        ),
      }
    )
  );

  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 10 },
    $(go.Shape, { strokeWidth: 3, stroke: "#5b5b5b" })
  );

  myDiagram.model = new go.GraphLinksModel(
    [
      { key: "resta", text: "menos", color: "green", isGroup: true },
      { key: "resta1", text: "menos", color: "green", isGroup: true },
      { key: "resta2", text: "menos", color: "green", isGroup: true },
      { key: "resta3", text: "menos", color: "green", isGroup: true },
      { key: "suma", text: "mas", color: "green", isGroup: true },
      { key: "suma1", text: "mas", color: "green", isGroup: true },
      { key: "suma2", text: "mas", color: "green", isGroup: true },

      { key: "suma3", text: "mas", color: "green", isGroup: true },
      { key: "mul", text: "multiplicado por", color: "green", isGroup: true },
      { key: "mul1", text: "multiplicado por", color: "green", isGroup: true },
      { key: "div", text: "dividido entre", color: "green", isGroup: true },
      { key: "div1", text: "dividido entre", color: "green", isGroup: true },
      { key: "div2", text: "dividido entre", color: "green", isGroup: true },
      {
        key: 1,
        items: [
          "ROE\n",
          razones_rendimiento
            .ROE(estado.utilidadNeta, balance.totalPatrimonio)
            .toFixed(2) + "%",
        ],
      },
      {
        key: 2,
        items: [
          "ROA\n",
          razones_rendimiento
            .ROA(estado.utilidadNeta, balance.totalActivo)
            .toFixed(2) + "%",
        ],
      },
      {
        key: 3,
        items: [
          "Margen de utilidad\n neta\n",
          razones_rendimiento
            .margen_utilidad_neta(
              estado.utilidadNeta,
              estado.ProductosOperacion
            )
            .toFixed(2) + "%",
        ],
      },
      {
        key: 4,
        items: [
          "Utilidad neta\n",
          "$ " + new Intl.NumberFormat("en-US").format(estado.utilidadNeta),
        ],
      },
      {
        key: 5,
        items: [
          "Ventas\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(estado.ProductosOperacion),
        ],
      },
      {
        key: 6,
        items: [
          "Costo de ventas\n",
          "$" + new Intl.NumberFormat("en-US").format(estado.CostosEnergia),
        ],
        group: "resta",
      },
      {
        key: 7,
        items: [
          "Gastos y costos\n operativos\n",
          "$" +
            new Intl.NumberFormat("en-US").format(
              estado.costosYGastosOperacion
            ),
        ],

        group: "resta1",
      },
      {
        key: 8,
        items: [
          "Gastos financieros\n",
          "$" + new Intl.NumberFormat("en-US").format(estado.gastosFinancieros),
        ],
        group: "resta2",
      },
      {
        key: 9,
        items: [
          "Productos financieros\n",
          "$" +
            new Intl.NumberFormat("en-US").format(estado.productosFinancieros),
        ],
        group: "suma3",
      },
      {
        key: 10,
        items: [
          "Impuestos\n",
          "$" +
            new Intl.NumberFormat("en-US").format(estado.impuestos_y_reservas),
        ],
        group: "resta3",
      },
      {
        key: 11,
        items: [
          "Ventas",
          "",
          "$ " +
            new Intl.NumberFormat("en-US").format(estado.ProductosOperacion),
        ],
        group: "div",
      },
      {
        key: 12,
        items: [
          "Rotacion de activos\n totales\n",
          razones_actividad
            .rotacion_activo_total(
              estado.ProductosOperacion,
              balance.totalActivo
            )
            .toFixed(2),
        ],
        group: "mul1",
      },
      {
        key: 13,
        items: [
          "Ventas",
          "",
          "$ " +
            new Intl.NumberFormat("en-US").format(estado.ProductosOperacion),
        ],
      },
      {
        key: 14,
        items: [
          "Activos totales\n",
          "$ " + new Intl.NumberFormat("en-US").format(balance.totalActivo),
        ],
        group: "div2",
      },
      {
        key: 15,
        items: [
          "Activos corrientes\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(balance.totalActivoCorriente),
        ],
      },
      {
        key: 16,
        items: [
          "Activos no corrientes\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(
              balance.totalActivoNoCorriente
            ),
        ],

        group: "suma",
      },
      {
        key: 17,
        items: [
          "MAF\n",
          razones_deuda
            .MAF(balance.totalActivo, balance.totalPatrimonio)
            .toFixed(2),
        ],

        group: "mul",
      },
      {
        key: 18,
        items: [
          "Pasivo total y\n patrimonio\n=\nActivos totales\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(
              balance.totalPatrimonio + balance.totalPasivo
            ),
        ],
      },
      {
        key: 19,
        items: [
          "Pasivos totales\n",
          "$ " + new Intl.NumberFormat("en-US").format(balance.totalPasivo),
        ],
      },
      {
        key: 20,
        items: [
          "Pasivos corrientes\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(balance.totalPasivoCorriente),
        ],
      },
      {
        key: 21,
        items: [
          "Pasivos no corrientes\n",
          "$ " +
            new Intl.NumberFormat("en-US").format(
              balance.totalPasivoNoCorriente
            ),
        ],

        group: "suma1",
      },
      {
        key: 22,
        items: [
          "Patrimonio total\n",
          "$ " + new Intl.NumberFormat("en-US").format(balance.totalPatrimonio),
        ],

        group: "suma2",
      },
      {
        key: 23,
        items: [
          "Patrimonio total\n",
          "$ " + new Intl.NumberFormat("en-US").format(balance.totalPatrimonio),
        ],
        group: "div1",
      },
    ],
    [
      { from: 1, to: 2, operator: "suma" },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 5 },
      { from: 4, to: 6 },
      { from: 4, to: 7 },

      { from: 4, to: 8 },
      { from: 4, to: 9 },
      { from: 4, to: 10 },
      { from: 3, to: 11 },
      { from: 2, to: 12 },
      { from: 12, to: 13 },
      { from: 12, to: 14 },
      { from: 14, to: 15 },
      { from: 14, to: 16 },
      { from: 1, to: 17 },
      { from: 17, to: 18 },
      { from: 18, to: 19 },
      { from: 19, to: 20 },
      { from: 19, to: 21 },
      { from: 18, to: 22 },
      { from: 17, to: 23 },
    ]
  );
});
</script>

<style scoped>
.dupont {
  width: auto;
  height: 80vh;
}
</style>
