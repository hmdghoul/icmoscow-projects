<template>
  <div class="relative h-48 w-48">
    <svg width="192" height="192" viewBox="0 0 192 192" class="-rotate-90" aria-hidden="true">
      <circle cx="96" cy="96" r="80" fill="none" class="stroke-gray-100" stroke-width="14" />
      <circle cx="96" cy="96" r="80" fill="none" stroke-width="14" stroke-linecap="round" class="progress-arc stroke-green-600 transition-colors duration-300 group-hover:stroke-emerald-500" :stroke-dasharray="circumference" :stroke-dashoffset="animatedOffset" />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700" :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'">
      <p class="text-xl font-bold leading-tight text-gray-900">{{ formatCurrency(displayRaised) }}</p>
      <p class="mt-0.5 text-sm font-bold text-green-700">{{ displayPercent }}%</p>
      <p class="mt-0.5 text-xs text-gray-400">of {{ formatCurrency(goal) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { formatCurrency } from '../utils/format'

const props = defineProps<{ raised: number; goal: number }>()

const circumference = 2 * Math.PI * 80

const percentage = computed(() =>
  props.goal === 0 ? 0 : Math.min(100, Math.round((props.raised / props.goal) * 100)),
)

const animatedOffset = ref(circumference)
const displayRaised = ref(0)
const displayPercent = ref(0)
const visible = ref(false)

onMounted(() => {
  nextTick(() => {
    animatedOffset.value = circumference * (1 - percentage.value / 100)
    visible.value = true
  })

  const duration = 1500
  const start = performance.now()
  const targetRaised = props.raised
  const targetPct = percentage.value

  function tick(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - t) ** 3
    displayRaised.value = Math.round(targetRaised * eased)
    displayPercent.value = Math.round(targetPct * eased)
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
})
</script>

<style scoped>
.progress-arc {
  transition-property: stroke-dashoffset, stroke;
  transition-duration: 1500ms, 300ms;
  transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1), ease;
}
</style>
