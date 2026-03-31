<script setup lang="ts">
import { onMounted } from 'vue';

import CameraApp from '@/services/camera/CameraApp';

onMounted(() => {
  const app = new CameraApp('video', 'photos', 'take');
});
</script>

<template>
  <h2 class="app-h2">カメラアプリ</h2>

  <div class="app-card">
    <video id="video" autoplay playsinline></video>
  </div>

  <div style="margin: 2rem 0">
    <button id="take" class="app-btn-primary">撮影</button>
  </div>

  <div class="app-card">
    <div id="photos"></div>
  </div>
</template>

<style>
#photos canvas {
  width: 300px;
}

#video {
  width: 400px;
}
</style>
