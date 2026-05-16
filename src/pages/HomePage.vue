<template>
  <MainLayout>
    <div>
      <section class="bg-gradient-to-br from-green-700 to-green-900 px-6 py-20 text-white">
        <div class="mx-auto max-w-7xl">
          <p class="text-sm font-semibold uppercase tracking-wider text-green-200">
            Community Projects &amp; Transparency Portal
          </p>
          <h1 class="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Islamic Center of Moscow
          </h1>
          <p class="mt-4 max-w-2xl text-lg text-green-100">
            Follow current repairs, completed projects, donation receipts, and community updates. Full transparency, always.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink to="/projects" class="rounded-lg bg-white px-6 py-3 font-semibold text-green-800 transition-colors hover:bg-green-50">
              View Projects
            </RouterLink>
            <RouterLink to="/transparency" class="rounded-lg border border-green-300 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800">
              View Transparency
            </RouterLink>
          </div>
        </div>
      </section>

      <div class="mx-auto max-w-7xl px-6 py-16">
        <LoadingSpinner v-if="loading" message="Loading project data…" />

        <div v-else-if="error" class="mb-16 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <p class="font-semibold text-red-800">Unable to load projects</p>
          <p class="mt-1 text-sm text-red-600">{{ error }}</p>
        </div>

        <template v-else>
          <div class="mb-16 grid gap-6 sm:grid-cols-3">
            <StatCard label="Total Raised" :value="formatCurrency(totalRaised)" sub-label="All projects combined" accent />
            <StatCard label="Active Projects" :value="String(activeCount)" sub-label="Currently in progress" />
            <StatCard label="Community Members" value="50+ Years" sub-label="Serving the Moscow community" />
          </div>

          <div v-if="activeProject" class="mb-16">
            <SectionHeader title="Current Active Project" subtitle="Your donations are making this happen" />
            <div class="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
              <div class="flex flex-wrap items-center gap-8">
                <div class="flex-1">
                  <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Active</span>
                  <h2 class="mt-3 text-2xl font-bold text-gray-900">
                    {{ activeProject.title }}
                  </h2>
                  <p class="mt-2 text-gray-600">
                    {{ activeProject.shortDescription }}
                  </p>
                  <RouterLink :to="`/projects/${activeProject.id}`" class="mt-4 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                    Full Details
                  </RouterLink>
                </div>
                <div class="flex shrink-0 justify-center">
                  <CircularProgress :raised="activeProject.raised" :goal="activeProject.goal" />
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-4 border-t pt-6">
                <div>
                  <p class="text-xs text-gray-400">Goal</p>
                  <p class="text-lg font-bold text-gray-900">
                    {{ formatCurrency(activeProject.goal) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-400">Raised</p>
                  <p class="text-lg font-bold text-green-700">
                    {{ formatCurrency(activeProject.raised) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-400">Remaining</p>
                  <p class="text-lg font-bold text-gray-900">
                    {{ formatCurrency(Math.max(0, activeProject.goal - activeProject.raised)) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-16">
            <SectionHeader title="Latest Updates" subtitle="Most recent news from our projects" />
            <div class="space-y-4">
              <div v-for="update in latestUpdates" :key="update.date + update.projectTitle" class="rounded-xl border border-gray-100 bg-white p-5">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="rounded-full bg-green-100 px-3 py-0.5 text-xs font-semibold text-green-800">
                    {{ update.projectTitle }}
                  </span>
                  <span class="text-xs text-gray-400">{{ formatDate(update.date, 'long') }}</span>
                </div>
                <p class="mt-2 text-sm text-gray-700">
                  {{ update.update }}
                </p>
              </div>
              <div v-if="latestUpdates.length === 0" class="py-8 text-center text-gray-400">
                <p class="text-sm">No updates yet.</p>
              </div>
            </div>
          </div>
        </template>

        <div class="mb-16">
          <SectionHeader title="Why This Matters" subtitle="Our community, our responsibility" />
          <div class="grid gap-4 sm:grid-cols-3 text-sm text-gray-600">
            <div class="rounded-xl border border-gray-100 bg-white p-5">
              <p class="mb-1 font-semibold text-gray-800">A place for everyone</p>
              <p>For over 50 years, the Islamic Center of Moscow has been the heart of our community. It is a place for prayer, learning, and gathering where families, students, and visitors come together throughout the year.</p>
            </div>
            <div class="rounded-xl border border-gray-100 bg-white p-5">
              <p class="mb-1 font-semibold text-gray-800">Every dollar counts</p>
              <p>The Islamic Center relies entirely on community donations. Every repair, improvement, and community initiative is made possible through the generosity and trust of donors.</p>
            </div>
            <div class="rounded-xl border border-gray-100 bg-white p-5">
              <p class="mb-1 font-semibold text-gray-800">Built on transparency</p>
              <p>We believe every donor deserves to know how their contributions are being used. That is why we publicly share donations, expenses, receipts, and project updates so the community can follow our progress with complete transparency and accountability.</p>
            </div>
          </div>
        </div>

        <div class="mb-16">
          <SectionHeader title="Project Photos" :subtitle="activeProjectPhotos.length > 0 ? 'Before &amp; after documentation' : 'Before &amp; after documentation (photos coming soon)'" />
          <div class="grid gap-6 sm:grid-cols-2">
            <template v-if="activeProjectPhotos.length > 0">
              <div v-for="photo in activeProjectPhotos" :key="photo.id" class="overflow-hidden rounded-2xl bg-gray-100">
                <img v-if="photo.imageLink && !photoErrors[photo.id]" :src="resolveImageUrl(photo.imageLink)" :alt="photo.caption" loading="lazy" class="h-56 w-full object-cover" @error="photoErrors[photo.id] = true">
                <div v-else class="flex h-56 items-center justify-center">
                  <div class="text-center text-gray-400">
                    <svg class="mx-auto h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="mt-2 text-sm font-medium">{{ photo.caption || photo.type }}</p>
                    <p class="text-xs">Photo coming soon</p>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="label in ['Before', 'After']" :key="label" class="flex h-56 items-center justify-center rounded-2xl bg-gray-100">
                <div class="text-center text-gray-400">
                  <svg class="mx-auto h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-2 text-sm font-medium">{{ label }}</p>
                  <p class="text-xs">Photo coming soon</p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="rounded-2xl bg-gradient-to-r from-green-600 to-green-800 p-10 text-center text-white">
          <h2 class="text-2xl font-bold">
            Support Our Community
          </h2>
          <p class="mt-3 text-green-100">
            Every dollar donated goes directly to maintaining and improving our center. All spending is publicly documented.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-4">
            <RouterLink to="/projects" class="rounded-lg bg-white px-6 py-3 font-semibold text-green-800 transition-colors hover:bg-green-50">
              Support Our Projects
            </RouterLink>
            <RouterLink to="/transparency" class="rounded-lg border border-green-300 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
              See How Funds Are Used
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import StatCard from '../components/StatCard.vue'
import CircularProgress from '../components/CircularProgress.vue'
import SectionHeader from '../components/SectionHeader.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useProjects } from '../composables/useProjects'
import { useTimeline } from '../composables/useTimeline'
import { usePhotos } from '../composables/usePhotos'
import { formatCurrency, formatDate } from '../utils/format'
import { resolveImageUrl } from '../utils/image'

interface UpdateRow {
  date: string
  update: string
  projectTitle: string
}

const { projects, loading, error } = useProjects()
const { timeline } = useTimeline()
const { photos } = usePhotos()

const photoErrors = reactive<Record<string, boolean>>({})

const activeProject = computed(() => projects.value.find((p) => p.status === 'active'))

const activeProjectPhotos = computed(() =>
  activeProject.value
    ? photos.value.filter((ph) => ph.projectId === activeProject.value!.id)
    : [],
)
const totalRaised = computed(() => projects.value.reduce((sum, p) => sum + p.raised, 0))
const activeCount = computed(() => projects.value.filter((p) => p.status === 'active').length)

const projectTitleMap = computed<Record<string, string>>(() =>
  Object.fromEntries(projects.value.map((p) => [p.id, p.title])),
)

const latestUpdates = computed<UpdateRow[]>(() =>
  timeline.value
    .map((t) => ({
      date: t.date,
      update: t.update,
      projectTitle: projectTitleMap.value[t.projectId] ?? t.projectId,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3),
)
</script>
