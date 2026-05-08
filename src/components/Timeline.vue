<template>
  <div>
    <p v-if="entries.length === 0" class="text-sm text-gray-400">No updates yet.</p>
    <div v-else class="space-y-0">
      <div v-for="(entry, index) in entries" :key="entry.id" class="relative pl-8">
        <div class="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-green-600 ring-2 ring-white" />
        <div v-if="index < entries.length - 1" class="absolute left-1.5 top-4 bottom-0 w-0.5 bg-gray-200" style="height: calc(100% + 0.5rem)" />
        <div class="pb-8">
          <p class="text-xs font-semibold uppercase tracking-wide text-green-700">{{ formatDate(entry.date, 'long') }}</p>
          <p class="mt-1 text-sm text-gray-700">{{ entry.update }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineEntry } from '../services/timeline.service'
import { formatDate } from '../utils/format'

defineProps<{
  entries: TimelineEntry[]
}>()
</script>
