<template>
  <div>
    <div class="info-container bg-secondary">
      <div class="title">
        <label>Análisis DUPONT</label>
      </div>
      <div class="periodo-container">
        <label>Periodo: </label>
        <q-select
          filled
          v-model="year"
          :options="periods"
          label="Periodo"
          style="width: 250px"
        />
      </div>
      <div class="button-container">
        <button class="btn-activar" @click="activarRazones(año, razon)">
          Activar
        </button>
      </div>
    </div>
    <div id="myDiagramDiv" class="dupont-container bg-positive"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as go from "gojs";
const year = ref(null);
const periods = ["2018", "2019", "2020", "2021", "2022"];
function init() {
  // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
  // For details, see https://gojs.net/latest/intro/buildingObjects.html
  const $ = go.GraphObject.make; // for conciseness in defining templates

  // a collection of colors
  var colors = {
    blue: "#2a6dc0",
    orange: "#ea2857",
    green: "#1cc1bc",
    gray: "#5b5b5b",
    white: "#F5F5F5",
  };

  // The first Diagram showcases what the Nodes might look like "in action"
  let myDiagram = $(go.Diagram, "myDiagramDiv", {
    "undoManager.isEnabled": true,
    layout: $(go.TreeLayout),
  });

  // "icons" is defined in icons.js

  // A data binding conversion function. Given an icon name, return a Geometry.
  // This assumes that all icons want to be filled.
  // This caches the Geometry, because the Geometry may be shared by multiple Shapes.
  function geoFunc(geoname) {
    var geo = icons[geoname];
    if (geo === undefined) geo = icons["heart"]; // use this for an unknown icon name
    if (typeof geo === "string") {
      geo = icons[geoname] = go.Geometry.parse(geo, true); // fill each geometry
    }
    return geo;
  }

  // Define a simple template consisting of the icon surrounded by a filled circle
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      { fill: "lightcoral", strokeWidth: 0, width: "auto", height: "auto" },
      new go.Binding("fill", "color")
    ),
    $(
      go.Panel,
      "Vertical",
      {
        margin: 3,
        padding: 8,
        background: "white",
      },
      new go.Binding("itemArray", "items"),
      {
        itemTemplate: $(
          go.Panel,
          $(go.TextBlock, new go.Binding("text", "").makeTwoWay(), {
            stroke: "black",
            font: "14px sans-serif",
          })
        ),
      }
    ),
    // $(go.TextBlock, new go.Binding("text", "say")),
    // Each node has a tooltip that reveals the name of its icon
    {
      toolTip: $(
        "ToolTip",
        { "Border.stroke": colors["gray"], "Border.strokeWidth": 2 },
        $(
          go.TextBlock,
          { margin: 8, stroke: colors["gray"], font: "bold 16px sans-serif" },
          new go.Binding("text", "geo")
        )
      ),
    }
  );

  // Define a Link template that routes orthogonally, with no arrowhead
  myDiagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, { strokeWidth: 3.5, stroke: colors["gray"] })
  ); // the link shape

  // Create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
    [
      // PRIMERA FILA
      // ESTADO DE RESULTADOS
      {
        key: 1,
        color: colors["blue"],
        items: ["ROE", "", "$3’074,000"],
      },
      {
        key: 2,
        color: colors["blue"],
        items: ["ROA", "", "$3’074,000"],
      },
      {
        key: 3,
        color: colors["blue"],
        items: ["Margen de utilidad neta", "", "$3’074,000"],
      },
      {
        key: 4,
        color: colors["blue"],
        items: ["Utilidad neta", "", "$3’074,000"],
      },
      {
        key: 5,
        color: colors["blue"],
        items: ["Ventas", "", "$3’074,000"],
      },
      {
        key: 6,
        color: colors["blue"],
        items: ["Costo de ventas", "", "$3’074,000"],
      },
      {
        key: 7,
        color: colors["blue"],
        items: ["Gastos operativos", "", "$3’074,000"],
      },
      {
        key: 8,
        color: colors["blue"],
        items: ["Gastos por interes", "", "$3’074,000"],
      },
      {
        key: 9,
        color: colors["blue"],
        items: ["Impuestos", "", "$3’074,000"],
      },
      {
        key: 10,
        color: colors["blue"],
        items: ["Dividendos de AP", "", "$3’074,000"],
      },
      {
        key: 11,
        color: colors["blue"],
        items: ["Ventas", "", "$3’074,000"],
      },
      {
        key: 12,
        color: colors["blue"],
        items: ["Rotacion de activos totales", "", "$3’074,000"],
      },
      {
        key: 13,
        color: colors["blue"],
        items: ["Ventas", "", "$3’074,000"],
      },
      {
        key: 14,
        color: colors["blue"],
        items: ["Activos totales", "", "$3’074,000"],
      },
      {
        key: 15,
        color: colors["blue"],
        items: ["Activos totales", "", "$3’074,000"],
      },
      {
        key: 16,
        color: colors["blue"],
        items: ["Activos fijos netos", "", "$3’074,000"],
      },
      {
        key: 17,
        color: colors["blue"],
        items: ["MAF", "", "$3’074,000"],
      },
      {
        key: 18,
        color: colors["blue"],
        items: ["Pasivos totales y patrimonio", "", "$3’074,000"],
      },
      {
        key: 19,
        color: colors["blue"],
        items: ["Pasivos totales", "", "$3’074,000"],
      },
      {
        key: 20,
        color: colors["blue"],
        items: ["Pasivos corrientes", "", "$3’074,000"],
      },
      {
        key: 21,
        color: colors["blue"],
        items: ["Pasivo no corriente", "", "$3’074,000"],
      },
      {
        key: 22,
        color: colors["blue"],
        items: ["Capital patrimonial", "", "$3’074,000"],
      },
      {
        key: 23,
        color: colors["blue"],
        items: ["Capital patrimonial", "", "$3’074,000"],
      },
    ],
    [
      { from: 1, to: 2 },
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
}

onMounted(() => {
  init();
});
</script>

<style scoped>
.info-container {
  margin: 1.5rem 2.5rem;
  padding: 1rem;
  border-radius: 16px;
}
.periodo-container {
  display: grid;
  grid-template-columns: 150px 250px;
  align-items: center;
  margin-top: 1.5rem;
}
.periodo-container label {
  color: #fff;
  font-size: 1rem;
}

.dupont-container {
  width: auto;
  height: 90vh;
  margin: 1.7rem 2.5rem;
  border-radius: 16px;
  /* height: 350px; */
}
</style>
