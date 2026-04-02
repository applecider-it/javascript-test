<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ElementResize from '@/services/drag/ElementResize';
import {
  onDragOverElement,
  onDragStartElement,
  onDropElement,
} from '@/services/drag/element-drag';

const elementResize = ref<ElementResize | null>(null);

onMounted(() => {
  console.log('onMounted');

  elementResize.value = new ElementResize();
});
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
          @mousedown="elementResize!.onResizeMouseDown"
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
          @mousedown="elementResize!.onResizeMouseDown"
        ></div>
      </div>
    </div>
  </div>
</template>
