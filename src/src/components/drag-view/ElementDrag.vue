<script setup lang="ts">
import { ref, onMounted } from 'vue';

let offsetX = 0;
let offsetY = 0;

/** ドラッグしているとき */
const onDragOverElement = (e: DragEvent) => {
  console.log('onDragOverElement');
  e.preventDefault(); // ドロップ無効を無効化する
};

/** ドラッグ開始時 */
const onDragStartElement = (e: DragEvent) => {
  console.log('onDragStartElement');
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();

  // 要素内のどこを掴んだか保存
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  e.dataTransfer?.setData('text/plain', el.id);
};

/** ドロップ時 */
const onDropElement = (e: DragEvent) => {
  console.log('onDropElement');
  e.preventDefault();

  const id = e.dataTransfer?.getData('text/plain');
  const element = document.getElementById(id!);
  const drop = e.currentTarget as HTMLElement;

  if (!element) return;

  const rect = drop.getBoundingClientRect();

  // オフセット分ずらす
  const x = e.clientX - rect.left - offsetX;
  const y = e.clientY - rect.top - offsetY;

  element.style.position = 'absolute';
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;

  drop.appendChild(element);
};
</script>

<template>
  <div class="app-card flex">
    <div class="flex-1">
      <div
        class="w-full h-80 bg-green-50 relative overflow-hidden border-2 border-gray-700"
        @dragover="onDragOverElement"
        @drop="onDropElement"
      >
        ここにドロップ
      </div>
    </div>

    <div class="border-2 w-64">
      <div
        class="w-40 h-40 border bg-red-200 cursor-grab"
        id="drag-target"
        @dragstart="onDragStartElement"
        draggable="true"
      >
        ドラッグ対象1
      </div>

      <div
        class="w-40 h-20 border bg-blue-200 cursor-grab"
        id="drag-target2"
        @dragstart="onDragStartElement"
        draggable="true"
      >
        ドラッグ対象2
      </div>
    </div>
  </div>
</template>
