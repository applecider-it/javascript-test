<script setup lang="ts">
import { ref, onMounted } from 'vue';

const onDragStartElement = (e: DragEvent) => {
  const el = e.currentTarget as HTMLElement;
  e.dataTransfer?.setData('text/plain', el.id);
};

const onDragOverElement = (e: DragEvent) => {
  e.preventDefault();
};

const onDropElement = (e: DragEvent) => {
  e.preventDefault();

  const id = e.dataTransfer?.getData('text/plain');
  const element = document.getElementById(id!);

  const drop = e.currentTarget as HTMLElement;

  if (element) {
    drop.appendChild(element);
  }
};
</script>

<template>
  <div class="app-card">
    <div
      class="drag-element"
      id="drag-target"
      @dragstart="onDragStartElement"
      draggable="true"
    >
      ドラッグ対象
    </div>

    <div
      class="drop-element"
      @dragover="onDragOverElement"
      @drop="onDropElement"
    >
      ここにドロップ
    </div>
  </div>
</template>

<style scoped>
.drag-element {
  width: 100px;
  padding: 10px;
  background: lightblue;
  cursor: grab;
}

.drop-element {
  width: 200px;
  height: 200px;
  margin-top: 20px;
  background: lightgray;
}
</style>
