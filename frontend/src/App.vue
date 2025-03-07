<script setup lang="ts">
import NavBar from './components/navbar/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <div class="view scrollable">
    <RouterView />
  </div>
</template>
