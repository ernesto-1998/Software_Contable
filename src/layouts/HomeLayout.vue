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
<style>
.footer {
  height: 300px;
  widows: 100%;
  background-image: url(../assets/footer.png);
  background-position: bottom; /*Para que la imagen aparezca desde abajo*/
  background-size: 100% 300px; /*o las medidas que quieras darle a la imagen*/
  background-repeat: no-repeat; /*Para que solo se repita a los lados y no hacia arriba*/
}
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

.login {
  cursor: pointer;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
  margin: 10px 10px;
  width: 200px;
  padding: 10px 0;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.2);
  transition: 0.4s;
  color: rgb(104, 85, 224);
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(104, 85, 224, 1);
}

button:hover {
  color: white;
  box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  background-color: rgba(104, 85, 224, 1);
}

.navigation-container {
  background-color: #8646f3;
  display: flex;
  justify-content: center;
}
</style>
