<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setupThree } from '@/services/three/setup';

onMounted(() => {
  setupThree();
});
</script>

<template>
  <div class="app-card">
    Three.js
    <div id="target"></div>
  </div>
</template>
