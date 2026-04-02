<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import CameraApp from '@/services/camera/CameraApp';

const video = ref(null);
const photos = ref<string[]>([]);

const app = ref<CameraApp | null>(null);

/** 写真を撮る */
const takePhoto = () => {
  const image = app.value!.takePhoto();

  photos.value.push(image);
};

onMounted(() => {
  console.log('onMounted');
  app.value = new CameraApp(video.value!);
});
onUnmounted(() => {
  console.log('onUnmounted');
  app.value!.stopCamera();
});
</script>

<template>
  <h2 class="app-h2">カメラアプリ</h2>

  <div class="app-card">
    <video ref="video" autoplay playsinline></video>
  </div>

  <div class="my-5">
    <button @click="takePhoto" class="app-btn-primary">撮影</button>
  </div>

  <div class="app-card">
    <div class="photos">
      <span v-for="(photo, index) in photos" :key="index">
        <img :src="photo" class="inline-block" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.photos img {
  width: 300px;
}

video {
  width: 400px;
}
</style>
