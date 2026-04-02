<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import GraphApp from '@/services/graph/GraphApp';

const app = ref<GraphApp | null>(null);

onMounted(() => {
  console.log('onMounted');
  app.value = new GraphApp();
});

onUnmounted(() => {
  console.log('onUnmounted');
  app.value!.clear();
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
