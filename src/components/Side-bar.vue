<template>
  <q-drawer
    show-if-above
    side="left"
    behavior="desktop"
    class="bg-primary"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :breakpoint="500"
  >
    <q-list padding>
      <div class="item q-mt-lg" style="margin-bottom: 12px">
        <q-item-label header class="subdiv">Home</q-item-label>
        <q-item to="/" exact-active-class="q-py-md active-item">
          <q-item-section avatar top>
            <q-avatar class="ico" icon="fa-solid fa-house-user" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="label-home" lines="1">Inicio</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="blue-grey-6" spaced />
      </div>

      <div class="item q-mt-lg" style="margin-bottom: 12px">
        <q-separator color="blue-grey-6" spaced />
        <q-item-label header class="subdiv">General</q-item-label>
        <q-item
          class="analisis-container"
          exact-active-class="q-py-md active-item"
        >
          <div class="analisis-menu">
            <q-item-section avatar top>
              <q-avatar class="ico" icon="fa-solid fa-chart-pie" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Analisis</q-item-label>
            </q-item-section>
          </div>

          <div class="hover-menu">
            <router-link :to="{ name: 'razones' }"
              ><li class="hover-menu_link">Razones Financieras</li></router-link
            >
            <router-link :to="{ name: 'dupont' }"
              ><li class="hover-menu_link">Diagrama Dupon</li></router-link
            >
            <router-link :to="{ name: 'vertical' }"
              ><li class="hover-menu_link">Analisis Vertical</li></router-link
            >
            <router-link :to="{ name: 'horizontal' }"
              ><li class="hover-menu_link">Analisis Horizontal</li></router-link
            >
          </div>
        </q-item>
        <q-item to="/reportes" exact-active-class="q-py-md active-item">
          <q-item-section avatar top>
            <q-avatar class="ico" icon="fa-solid fa-file-lines" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Reportes</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="blue-grey-6" spaced />
      </div>

      <div class="item q-mt-lg" style="margin-bottom: 12px">
        <q-separator color="blue-grey-6" spaced />
        <q-item-label header class="subdiv">Administración</q-item-label>
        <q-item to="/admin" exact-active-class="q-py-md active-item">
          <q-item-section avatar top>
            <q-avatar class="ico" icon="settings" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Configuración</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="blue-grey-6" spaced />
      </div>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { ref } from "vue";

let miniState = ref(true);
</script>

<style scoped>
.label-home {
  color: white;
}
.ico {
  box-shadow: -2px 2px 0px -0px hsla(297, 70%, 71%, 0.984);
  color: #8646f3;
  background-color: aliceblue;
}
.subdiv {
  color: rgb(176, 164, 164);
  padding: 8px 12px 12px 16px;
}
.active-item {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}
.active-item .ico {
  transform: scale(1.2);
  transition: transform 450ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -2px 2px 0px -0px hsla(0, 0%, 100%, 0.984);
  color: aliceblue;
  background-color: #00abb3;
}
.item {
  color: white;
  text-decoration-color: azure;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  transition: 0.4s;
}
.analisis-container {
  display: grid;
  align-items: center;
}

.analisis-menu {
  display: flex;
}

.hover-menu {
  display: none;
  width: 100%;
  list-style: none;
  margin-top: 0.5rem;
}

.hover-menu a {
  text-decoration: none;
  color: #fff;
}

.analisis-container:hover .hover-menu {
  display: block;
  background-color: transparent;
  transition: ease-in-out;
}

.hover-menu_link {
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.hover-menu_link:hover {
  color: #000;
  cursor: pointer;
  background-color: rgb(104, 87, 209);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
