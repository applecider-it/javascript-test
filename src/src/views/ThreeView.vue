<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import ThreeApp from '@/services/three/ThreeApp';

const app = ref<ThreeApp | null>(null);

onMounted(() => {
  console.log('onMounted');
  app.value = new ThreeApp('targetArea', 'statsArea');
});
onUnmounted(() => {
  console.log('onUnmounted');
  app.value!.clear();
});
</script>

<template>
  <div class="app-card">
    Three.js
    <div
      id="targetArea"
      class="border-2 border-gray-600 h-[calc(100vh-300px)] relative"
    ></div>
    <div id="statsArea"></div>
  </div>
</template>
