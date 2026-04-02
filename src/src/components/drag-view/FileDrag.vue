<script setup lang="ts">
import { ref, onMounted } from 'vue';

import {
  onDragOverFile,
  onDropFile,
  previewUrls,
} from '@/services/drag/file-drag';
</script>

<template>
  <div class="app-card">
    <div
      class="w-[300px] h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center"
      @dragover="onDragOverFile"
      @drop="onDropFile"
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
