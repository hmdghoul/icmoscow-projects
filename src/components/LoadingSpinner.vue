<template>
  <div class="flex items-center justify-center py-16">
    <div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
    <span class="ml-3 text-sm text-gray-500">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: 'Loading…' })
</script>
