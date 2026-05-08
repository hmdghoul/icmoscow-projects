<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm" :class="accent ? 'border-l-4 border-green-600' : ''">
    <p class="text-sm font-medium text-gray-500">{{ label }}</p>
    <p class="mt-1 text-2xl font-bold text-gray-900">{{ value }}</p>
    <p v-if="subLabel" class="mt-1 text-xs text-gray-400">{{ subLabel }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  subLabel?: string
  accent?: boolean
}>()
</script>
