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

      <div class="space-y-16">
        <section v-for="section in activitySections" :key="section.id">
          <SectionHeader :title="`${section.icon}  ${section.heading}`" />
          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in section.items"
              :key="item.title"
              class="rounded-2xl bg-white p-6 shadow-sm"
            >
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
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { activitySections } from '../data/activities'
</script>
