<template>
  <div class="relative h-48 w-48">
    <svg width="192" height="192" viewBox="0 0 192 192" class="-rotate-90" aria-hidden="true">
      <circle cx="96" cy="96" r="80" fill="none" class="stroke-gray-100" stroke-width="14" />
      <circle cx="96" cy="96" r="80" fill="none" stroke-width="14" stroke-linecap="round" class="stroke-green-600 transition-colors duration-300 group-hover:stroke-emerald-500" :stroke-dasharray="circumference" :stroke-dashoffset="offset" />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
      <p class="text-xl font-bold leading-tight text-gray-900">{{ formatCurrency(raised) }}</p>
      <p class="mt-0.5 text-sm font-bold text-green-700">{{ percentage }}%</p>
      <p class="mt-0.5 text-xs text-gray-400">of {{ formatCurrency(goal) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from '../utils/format'

const props = defineProps<{ raised: number; goal: number }>()

const circumference = 2 * Math.PI * 80

const percentage = computed(() =>
  props.goal === 0 ? 0 : Math.min(100, Math.round((props.raised / props.goal) * 100)),
)

const offset = computed(() => circumference * (1 - percentage.value / 100))
</script>
