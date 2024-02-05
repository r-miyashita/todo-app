<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="menu">
        <RouterLink to="/" class="menu__link">Home</RouterLink>
        <RouterLink to="/edit" class="menu__link">EditTask</RouterLink>
        <RouterLink to="/add" class="menu__link">AddTask</RouterLink>
    </nav>
</template>