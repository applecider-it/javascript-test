<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CameraApp from '@/services/camera/CameraApp';

const video = ref(null);
const photos = ref(null);

const app = ref<any>(null);

const take = () => {
  app.value.takePhoto();
};

onMounted(() => {
  app.value = new CameraApp(video.value, photos.value);
});
</script>

<template>
  <h2 class="app-h2">カメラアプリ</h2>

  <div class="app-card">
    <video ref="video" autoplay playsinline></video>
  </div>

  <div style="margin: 2rem 0">
    <button @click="take" class="app-btn-primary">撮影</button>
  </div>

  <div class="app-card">
    <div ref="photos" class="photos"></div>
  </div>
</template>

<style>
.photos canvas {
  width: 300px;
}

video {
  width: 400px;
}
</style>
