<template>
  <q-layout view="lHh lpR lFf">
    <Sidebar />
    <footer class="fixed-bottom footer"></footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../components/Side-bar.vue";
</script>
<style scoped>
.footer {
  height: 300px;
  widows: 100%;
  background-image: url(../assets/footer.png);
  background-position: bottom; /*Para que la imagen aparezca desde abajo*/
  background-size: 100% 300px; /*o las medidas que quieras darle a la imagen*/
  background-repeat: no-repeat; /*Para que solo se repita a los lados y no hacia arriba*/
}
</style>
