<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CameraApp from '@/services/camera/CameraApp';

const video = ref(null);
const photos = ref<any>([]);

const app = ref<any>(null);

/** 写真を撮る */
const takePhoto = () => {
  const image = app.value.takePhoto();

  photos.value.push(image);
};

onMounted(() => {
  app.value = new CameraApp(video.value!);
});
</script>

<template>
  <h2 class="app-h2">カメラアプリ</h2>

  <div class="app-card">
    <video ref="video" autoplay playsinline></video>
  </div>

  <div style="margin: 2rem 0">
    <button @click="takePhoto" class="app-btn-primary">撮影</button>
  </div>

  <div class="app-card">
    <div class="photos">
      <span v-for="(photo, index) in photos" :key="index">
        <img :src="photo" />
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
