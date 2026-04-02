<script setup lang="ts">
import ElementDrag from '@/components/drag-view/ElementDrag.vue';
import FileDrag from '@/components/drag-view/FileDrag.vue';
</script>

<template>
  <h2 class="app-h2">ドラッグアンドドロップ</h2>

  <div class="space-y-10">
    <div>
      <ElementDrag />
    </div>
    <div>
      <FileDrag />
    </div>
  </div>
</template>
