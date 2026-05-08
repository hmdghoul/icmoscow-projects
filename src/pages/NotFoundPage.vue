<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-24 text-center">
      <p class="text-9xl font-bold text-green-100">404</p>
      <h1 class="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
      <p class="mt-4 text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <RouterLink
        to="/"
        class="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
      >
        Back to Home
      </RouterLink>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
</script>
