<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { setupThree, clearThree } from '@/services/three/setup';

onMounted(() => {
  console.log('onMounted');
  setupThree();
});
onUnmounted(() => {
  console.log('onUnmounted');
  clearThree();
});
</script>

<template>
  <div class="app-card">
    Three.js
    <div id="target"></div>
    <div id="stats"></div>
  </div>
</template>
