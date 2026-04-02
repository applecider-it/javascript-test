<script setup lang="ts">
import { ref, onMounted } from 'vue';

let isResizing = false;
let resizeTarget: HTMLElement | null = null;

let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;

let offsetX = 0;
let offsetY = 0;

/** ドラッグしているとき */
const onDragOverElement = (e: DragEvent) => {
  console.log('onDragOverElement');
  e.preventDefault(); // ドロップ無効を無効化する
};

/** ドラッグ開始時 */
const onDragStartElement = (e: DragEvent) => {
  console.log('onDragStartElement', e);
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();

  console.log('rect', rect);

  // 要素内のどこを掴んだか保存
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  // 大きいエレメントだとゴーストがわかりにくいので、小さいダミー要素を作る
  const dragImage = document.createElement('div');
  dragImage.style.width = '30px';
  dragImage.style.height = '30px';
  dragImage.style.background = '#ddd';
  dragImage.style.borderRadius = '50%';

  document.body.appendChild(dragImage);

  // これで見た目を置き換える
  e.dataTransfer?.setDragImage(dragImage, 15, 15);

  e.dataTransfer?.setData('text/plain', el.id);

  // 後で削除
  setTimeout(() => {
    document.body.removeChild(dragImage);
  });
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

const onResizeMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  //e.stopPropagation();

  const handle = e.currentTarget as HTMLElement;
  const el = handle.parentElement as HTMLElement;

  isResizing = true;
  resizeTarget = el;

  startX = e.clientX;
  startY = e.clientY;

  startWidth = el.offsetWidth;
  startHeight = el.offsetHeight;

  document.addEventListener('mousemove', onResizeMouseMove);
  document.addEventListener('mouseup', onResizeMouseUp);
};

const onResizeMouseMove = (e: MouseEvent) => {
  if (!isResizing || !resizeTarget) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  resizeTarget.style.width = `${startWidth + dx}px`;
  resizeTarget.style.height = `${startHeight + dy}px`;
};

const onResizeMouseUp = () => {
  isResizing = false;
  resizeTarget = null;

  document.removeEventListener('mousemove', onResizeMouseMove);
  document.removeEventListener('mouseup', onResizeMouseUp);
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
        class="w-40 h-40 border bg-red-200 app-drag-element"
        id="drag-target"
        @dragstart="onDragStartElement"
        draggable="true"
      >
        ドラッグ対象1

        <!-- リサイズハンドル -->
        <div
          class="app-drag-element-resize"
          @mousedown="onResizeMouseDown"
        ></div>
      </div>

      <div
        class="w-40 h-20 border bg-blue-200 app-drag-element"
        id="drag-target2"
        @dragstart="onDragStartElement"
        draggable="true"
      >
        ドラッグ対象2

        <!-- リサイズハンドル -->
        <div
          class="app-drag-element-resize"
          @mousedown="onResizeMouseDown"
        ></div>
      </div>
    </div>
  </div>
</template>
