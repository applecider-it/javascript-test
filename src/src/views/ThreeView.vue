<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ThreeApp from '@/services/three/ThreeApp';

const app = ref<ThreeApp | null>(null);

onMounted(() => {
  console.log('onMounted');
  app.value = new ThreeApp();
});
onUnmounted(() => {
  console.log('onUnmounted');
  app.value!.clear();
});
</script>

<template>
  <div class="app-card">
    Three.js
    <div id="target"></div>
    <div id="stats"></div>
  </div>
</template>
