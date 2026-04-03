<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header
    class="bg-white px-8 py-4 flex justify-between items-center sticky top-0"
    style="box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05)"
  >
    <h1 class="text-[18px] font-semibold">My Site</h1>
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/camera">カメラ</RouterLink>
      <RouterLink to="/microphone">マイク</RouterLink>
      <RouterLink to="/drag">ドラッグアンドドロップ</RouterLink>
      <RouterLink to="/editor">エディター</RouterLink>
      <RouterLink to="/tiptap">TipTap.js</RouterLink>
      <RouterLink to="/three">Three.js</RouterLink>
      <RouterLink to="/pixi">Pixi.js</RouterLink>
    </nav>
  </header>

  <main class="p-[1.7rem]">
    <RouterView />
  </main>

  <footer class="text-center p-5 mt-10 text-[#888]">
    <div>© 2026 My Site</div>
  </footer>
</template>

<style scoped>
.nav a {
  @apply ml-5 no-underline text-[#555] font-medium transition duration-200;
}

.nav a:hover {
  @apply text-[#007aff];
}
</style>
