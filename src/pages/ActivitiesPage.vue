<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-12">
        <p class="text-sm font-semibold uppercase tracking-wide text-green-700">Islamic Center of Moscow</p>
        <h1 class="mt-2 text-4xl font-bold text-gray-900">Community Activities</h1>
        <p class="mt-3 max-w-2xl text-lg text-gray-600">
          We offer a range of programs and events for all ages. Come learn, volunteer, and connect with your community.
        </p>
      </div>

      <LoadingSpinner v-if="loading" message="Loading activities…" />

      <div v-else-if="error" class="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p class="font-semibold text-red-800">Unable to load activities</p>
        <p class="mt-1 text-sm text-red-600">{{ error }}</p>
      </div>

      <div v-else class="space-y-16">
        <section v-for="section in activitySections" :key="section.category">
          <SectionHeader :title="section.category" :icon="section.icon" />
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="item in section.items" :key="item.id" class="rounded-2xl bg-white p-6 shadow-sm">
              <h3 class="font-bold text-gray-900">{{ item.title }}</h3>
              <p class="mt-2 text-sm text-gray-600">{{ item.description }}</p>
              <div class="mt-4 space-y-1">
                <p v-if="item.schedule" class="flex items-center gap-2 text-xs text-gray-500">
                  <span class="font-medium text-green-700">Schedule:</span>
                  {{ item.schedule }}
                </p>
                <p v-if="item.location" class="flex items-center gap-2 text-xs text-gray-500">
                  <span class="font-medium text-green-700">Location:</span>
                  {{ item.location }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div v-if="activitySections.length === 0" class="py-16 text-center text-gray-400">
          <p class="text-sm">No activities found.</p>
        </div>
      </div>

      <div class="mt-16 rounded-2xl bg-green-50 p-8 text-center">
        <h2 class="text-xl font-bold text-gray-900">Want to Get Involved?</h2>
        <p class="mt-2 text-gray-600">
          Contact us or speak to the imam after Friday prayers to learn more about volunteering and participating in our programs.
        </p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useActivities } from '../composables/useActivities'
import type { Activity } from '../services/activities.service'

interface ActivitySection {
  category: string
  icon: string
  items: Activity[]
}

const categoryIcons: Record<string, string> = {
  'Quran Classes': '📖',
  'Community Events': '🤝',
  'Volunteer Work': '🛠️',
  'Youth Activities': '⚽',
  'Coming Soon': '📢',
}

const { activities, loading, error } = useActivities()

const activitySections = computed<ActivitySection[]>(() => {
  const map = new Map<string, Activity[]>()
  activities.value.forEach((a) => {
    if (!map.has(a.category)) map.set(a.category, [])
    map.get(a.category)!.push(a)
  })
  return Array.from(map.entries()).map(([category, items]) => ({
    category,
    icon: categoryIcons[category] ?? '📌',
    items,
  }))
})
</script>
