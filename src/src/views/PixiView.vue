<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { setupPixi, clearPixi } from '@/services/pixi/setup';

onMounted(() => {
  console.log('onMounted');
  setupPixi();
});

onUnmounted(() => {
  console.log('onUnmounted');
  clearPixi();
});
</script>

<template>
  <div class="app-card">
    Pixi.js
    <div>
      <div
        id="target"
        class="border-2 border-gray-600 h-[calc(100vh-300px)]"
      ></div>
    </div>
  </div>
</template>
