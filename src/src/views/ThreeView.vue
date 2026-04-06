<script setup lang="ts">
import { onMounted, onUnmounted, ref, markRaw  } from 'vue';
import ThreeApp from '@/services/three/ThreeApp';

const app = markRaw(new ThreeApp())

onMounted(async() => {
  console.log('onMounted');
 
  await app.setup('targetArea', 'statsArea');

  app.loop();
});
onUnmounted(() => {
  console.log('onUnmounted');
  app.clear();
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
