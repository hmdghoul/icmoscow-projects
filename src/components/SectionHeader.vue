<template>
  <div class="mb-6">
    <h2 class="text-2xl font-bold text-gray-900">
      <span v-if="icon" class="mr-2">{{ icon }}</span>{{ title }}
    </h2>
    <p v-if="subtitle" class="mt-1 text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  icon?: string
}>()
</script>
