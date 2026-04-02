<script setup lang="ts">
import { ref, onMounted } from 'vue';

const previewUrls = ref<string[]>([]);

const onDragOverFile = (e: DragEvent) => {
  e.preventDefault();
};

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
    <div class="drop-area" @dragover="onDragOverFile" @drop="onDropFile">
      ここに画像ファイルをドロップ
    </div>
  </div>

  <div class="preview mt-5">
    <img
      v-for="(url, index) in previewUrls"
      :key="index"
      :src="url"
      class="thumb"
    />
  </div>
</template>

<style scoped>
.drop-area {
  width: 300px;
  height: 200px;
  border: 2px dashed #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.thumb {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
