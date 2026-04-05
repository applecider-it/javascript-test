<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MapApp from '@/services/map/MapApp';

const app = ref<MapApp | null>(null);

const mapEl = ref<HTMLElement | null>(null);
const message = ref('');
const finding = ref(false);

const findByGPS = async () => {
  message.value = 'GPS情報取得中';
  finding.value = true;
  const result = await app.value!.findByGPS();
  message.value = '';
  finding.value = false;

  console.log('gps result', result);
};

onMounted(() => {
  app.value = new MapApp(mapEl.value!);
});
</script>

<template>
  <h2 class="app-h2">地図</h2>

  <div class="app-card">
    <div class="w-full h-[500px]" ref="mapEl"></div>
  </div>

  <div class="my-5 space-x-4">
    <button @click="findByGPS" class="app-btn-primary" v-if="finding === false">
      GPS
    </button>
    <span>{{ message }}</span>
  </div>
</template>
