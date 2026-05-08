<template>
  <div>
    <div class="h-2.5 overflow-hidden rounded-full bg-gray-200">
      <div class="h-2.5 rounded-full bg-green-600 transition-all duration-700" :style="{ width: percentage + '%' }" />
    </div>
    <div v-if="showLabel" class="mt-1.5 flex justify-between text-xs text-gray-500">
      <span>{{ formatCurrency(raised) }} raised</span>
      <span>{{ percentage }}% of {{ formatCurrency(goal) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from '../utils/format'

const props = defineProps<{
  raised: number
  goal: number
  showLabel?: boolean
}>()

const percentage = computed(() =>
  props.goal === 0 ? 0 : Math.min(100, Math.round((props.raised / props.goal) * 100)),
)
</script>
