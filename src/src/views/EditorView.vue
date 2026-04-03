<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { formatHtml, cleanHtml } from '@/services/data/html';

import { htmlString } from '@/services/editor/editor';

/** エディターへのリファレンス */
const editor = ref<HTMLDivElement | null>(null);
/** 内容（HTML文字列） */
const content = ref('');

/** 選択範囲にフォーマットを当てる */
const format = (command: string) => {
  document.execCommand(command, false, undefined);
};

/** HTMLに変換 */
const toHtml = async () => {
  const html = await formatHtml(cleanHtml(editor.value!.innerHTML));

  content.value = html;
};

/** Editorに変換 */
const toEditor = async () => {
  editor.value!.innerHTML = content.value;
};

onMounted(() => {
  editor.value!.innerHTML = htmlString;
});
</script>

<template>
  <div class="app-card space-y-3">
    <i><b>Editor</b></i>

    <div class="space-x-3">
      <button @click="format('bold')" class="app-btn-primary">太字</button>
      <button @click="format('italic')" class="app-btn-primary">斜体</button>
      <button @click="format('underline')" class="app-btn-primary">下線</button>
    </div>

    <div
      ref="editor"
      contenteditable="true"
      class="app-form-input h-[20rem] overflow-scroll app-post-content-container"
    ></div>

    <div class="space-x-3">
      <button @click="toHtml" class="app-btn-primary">↓</button>
      <button @click="toEditor" class="app-btn-primary">↑</button>
    </div>

    <div>
      <textarea v-model="content" class="app-form-input h-[20rem]"></textarea>
    </div>
  </div>
</template>
