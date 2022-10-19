<template>
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
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
          <q-item to="/dashboard" exact-active-class="q-py-md active-item">
            <q-item-section avatar top>
              <q-avatar class="ico" icon="fa-solid fa-chart-pie" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Dashboard</q-item-label>
            </q-item-section>
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

let miniState = ref(true)

</script>

<style>

</style>