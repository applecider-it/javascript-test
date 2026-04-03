<script setup lang="ts">
import { ref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import { formatHtml, cleanHtml } from '@/services/data/html'
import { htmlString } from '@/services/editor/editor'

/** HTML文字列 */
const content = ref('')

/** エディタ */
const editor = useEditor({
  extensions: [StarterKit],
  content: htmlString,
})

/** HTMLに変換（↓） */
const toHtml = async () => {
  const raw = editor.value!.getHTML() ?? ''
  const html = await formatHtml(cleanHtml(raw))

  content.value = html
}

/** Editorに反映（↑） */
const toEditor = () => {
  editor.value!.commands.setContent(content.value)
}
</script>

<template>
  <div class="app-card space-y-3">
    <i><b>TipTap</b></i>

    <div class="space-x-3">
      <button @click="editor!.chain().focus().toggleBold().run()" class="app-btn-primary">
        太字
      </button>
      <button @click="editor!.chain().focus().toggleItalic().run()" class="app-btn-primary">
        斜体
      </button>
      <button @click="editor!.chain().focus().toggleUnderline().run()" class="app-btn-primary">
        下線
      </button>
    </div>

    <EditorContent
      :editor="editor"
      class="app-form-input h-[20rem] overflow-scroll app-post-content-container"
    />

    <div class="space-x-3">
      <button @click="toHtml" class="app-btn-primary">↓</button>
      <button @click="toEditor" class="app-btn-primary">↑</button>
    </div>

    <div>
      <textarea v-model="content" class="app-form-input h-[20rem]"></textarea>
    </div>
  </div>
</template>