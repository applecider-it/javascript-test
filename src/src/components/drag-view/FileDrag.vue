<script setup lang="ts">
import { ref, onMounted } from 'vue';

import FileDrag from '@/services/drag/FileDrag';

const previewUrls = ref<string[]>([]);

const fileDrag = ref<FileDrag | null>(null);
const drop = ref(null);

onMounted(() => {
  console.log('onMounted');

  fileDrag.value = new FileDrag(drop.value!);

  fileDrag.value!.onPushed = (url: string) => {
    previewUrls.value.push(url);
  };
});
</script>

<template>
  <div class="app-card">
    <div
      ref="drop"
      class="w-[300px] h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center"
    >
      ここに画像ファイルをドロップ
    </div>

    <div class="flex gap-2.5 flex-wrap mt-5">
      <img
        v-for="(url, index) in previewUrls"
        :key="index"
        :src="url"
        class="w-[100px] h-[100px] object-cover"
      />
    </div>
  </div>
</template>
