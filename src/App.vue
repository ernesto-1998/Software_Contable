<template>
  <router-view v-slot="{ Component, route }" class="bg-accent">
    <transition name="scale" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup>
import { defineComponent, watch } from "vue";
defineComponent({
  name: "App",
});
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
