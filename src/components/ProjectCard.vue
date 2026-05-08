<template>
  <div class="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
    <div class="h-40 shrink-0 bg-gray-100">
      <img v-if="project.coverImage" :src="project.coverImage" :alt="project.title" class="h-full w-full object-cover">
      <div v-else class="flex h-full items-center justify-center">
        <img src="/logo.png" alt="" class="h-14 w-14 object-contain opacity-20">
      </div>
    </div>

    <div class="flex flex-1 flex-col p-6">
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-lg font-bold text-gray-900">{{ project.title }}</h3>
        <span class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold" :class="badgeClass">
          {{ statusLabel }}
        </span>
      </div>

      <p class="mt-2 flex-1 text-sm text-gray-600">{{ project.shortDescription }}</p>

      <div class="mt-4">
        <ProgressBar :raised="project.raised" :goal="project.goal" :show-label="true" />
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-400">Goal</p>
          <p class="text-sm font-semibold text-gray-900">{{ formatCurrency(project.goal) }}</p>
        </div>
        <RouterLink :to="`/projects/${project.id}`" class="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700">
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project } from '../data/projects'
import ProgressBar from './ProgressBar.vue'

const props = defineProps<{
  project: Project
}>()

const badgeClasses: Record<Project['status'], string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  future: 'bg-yellow-100 text-yellow-800',
}

const statusLabels: Record<Project['status'], string> = {
  active: 'Active',
  completed: 'Completed',
  future: 'Future',
}

const badgeClass = computed(() => badgeClasses[props.project.status])
const statusLabel = computed(() => statusLabels[props.project.status])

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>
