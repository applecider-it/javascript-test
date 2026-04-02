<script setup lang="ts">
import { ref, onMounted } from 'vue';

const previewUrls = ref<string[]>([]);

/** ドラッグしているとき */
const onDragOverFile = (e: DragEvent) => {
  e.preventDefault(); // ドロップ無効を無効化する
};

/** ドロップ時 */
const onDropFile = (e: DragEvent) => {
  e.preventDefault();

  const files = e.dataTransfer?.files;

  if (!files || files.length === 0) return;

  for (const file of files) {
    console.log('ファイル名:', file.name);
    console.log('タイプ:', file.type);
    console.log('サイズ:', file.size);

    // 画像だけ判定
    if (!file.type.startsWith('image/')) continue;

    // サムネイルURL生成
    const url = URL.createObjectURL(file);
    previewUrls.value.push(url);
  }
};
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
