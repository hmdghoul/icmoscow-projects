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
        <div v-if="loading" class="py-16 text-center text-gray-400">
          <p class="text-sm">Loading project data…</p>
        </div>

        <div v-else-if="error" class="mb-16 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <p class="font-semibold text-red-800">Unable to load projects</p>
          <p class="mt-1 text-sm text-red-600">{{ error }}</p>
        </div>

        <template v-else>
          <div class="mb-16 grid gap-6 sm:grid-cols-3">
            <StatCard label="Total Raised" :value="formatCurrency(totalRaised)" sub-label="All projects combined" accent />
            <StatCard label="Active Projects" :value="String(activeCount)" sub-label="Currently in progress" />
            <StatCard label="Community Members" value="150+" sub-label="Families served" />
          </div>

          <div v-if="activeProject" class="mb-16">
            <SectionHeader title="Current Active Project" subtitle="Your donations are making this happen" />
            <div class="rounded-2xl bg-white p-8 shadow-sm">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Active</span>
                  <h2 class="mt-3 text-2xl font-bold text-gray-900">
                    {{ activeProject.title }}
                  </h2>
                  <p class="mt-2 max-w-xl text-gray-600">
                    {{ activeProject.shortDescription }}
                  </p>
                </div>
                <RouterLink :to="`/projects/${activeProject.id}`" class="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                  Full Details
                </RouterLink>
              </div>

              <div class="mt-6">
                <ProgressBar :raised="activeProject.raised" :goal="activeProject.goal" :show-label="true" />
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
                    {{ formatCurrency(activeProject.goal - activeProject.raised) }}
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
                  <span class="text-xs text-gray-400">{{ formatDate(update.date) }}</span>
                </div>
                <p class="mt-2 text-sm text-gray-700">
                  {{ update.update }}
                </p>
              </div>
              <div v-if="latestUpdates.length === 0" class="py-8 text-center text-gray-400">
                No updates yet.
              </div>
            </div>
          </div>
        </template>

        <div class="mb-16">
          <SectionHeader title="Project Photos" :subtitle="activeProjectPhotos.length > 0 ? 'Before &amp; after documentation' : 'Before &amp; after documentation (photos coming soon)'" />
          <div class="grid gap-6 sm:grid-cols-2">
            <template v-if="activeProjectPhotos.length > 0">
              <div v-for="photo in activeProjectPhotos" :key="photo.id" class="overflow-hidden rounded-2xl bg-gray-100">
                <img v-if="photo.imageLink" :src="photo.imageLink" :alt="photo.caption" class="h-56 w-full object-cover">
                <div v-else class="flex h-56 items-center justify-center">
                  <div class="text-center text-gray-400">
                    <p class="text-3xl">📷</p>
                    <p class="mt-2 text-sm font-medium">{{ photo.caption || photo.type }}</p>
                    <p class="text-xs">Photo coming soon</p>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex h-56 items-center justify-center rounded-2xl bg-gray-100">
                <div class="text-center text-gray-400">
                  <p class="text-3xl">🏚️</p>
                  <p class="mt-2 text-sm font-medium">Before — Roof Damage</p>
                  <p class="text-xs">Photo coming soon</p>
                </div>
              </div>
              <div class="flex h-56 items-center justify-center rounded-2xl bg-gray-100">
                <div class="text-center text-gray-400">
                  <p class="text-3xl">🏠</p>
                  <p class="mt-2 text-sm font-medium">After — Completed Repair</p>
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
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import StatCard from '../components/StatCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import SectionHeader from '../components/SectionHeader.vue'
import { useProjects } from '../composables/useProjects'
import { useTimeline } from '../composables/useTimeline'
import { usePhotos } from '../composables/usePhotos'

interface UpdateRow {
  date: string
  update: string
  projectTitle: string
}

const { projects, loading, error } = useProjects()
const { timeline } = useTimeline()
const { photos } = usePhotos()

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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
