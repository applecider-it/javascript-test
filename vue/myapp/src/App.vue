<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="app-header">
    <h1>My Site</h1>
    <nav class="app-nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/camera">Camera</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <RouterView />
  </main>

  <footer class="app-footer">
    <div>© 2026 My Site</div>
  </footer>
</template>
