<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/HeaderComponent.vue"
</script>

<template>
  <Header />
  <main class="main">
    <RouterView />
  </main>
</template>
