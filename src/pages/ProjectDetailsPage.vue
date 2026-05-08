<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-16">
      <LoadingSpinner v-if="loading" message="Loading project…" />

      <div v-else-if="error" class="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p class="font-semibold text-red-800">Unable to load project</p>
        <p class="mt-1 text-sm text-red-600">{{ error }}</p>
        <RouterLink to="/projects" class="mt-4 inline-block text-sm text-green-700 hover:underline">
          ← Back to Projects
        </RouterLink>
      </div>

      <div v-else-if="!project" class="py-24 text-center">
        <p class="text-6xl font-bold text-gray-200">404</p>
        <h1 class="mt-4 text-2xl font-bold text-gray-900">
          Project Not Found
        </h1>
        <p class="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
        <RouterLink to="/projects" class="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700">
          Back to Projects
        </RouterLink>
      </div>

      <template v-else>
        <div class="mb-4">
          <RouterLink to="/projects" class="text-sm text-green-700 hover:underline">
            ← All Projects
          </RouterLink>
        </div>

        <div v-if="project.coverImage && !coverImageError" class="mb-8 overflow-hidden rounded-2xl bg-gray-100">
          <img :src="resolveImageUrl(project.coverImage)" :alt="project.title" class="h-64 w-full object-cover sm:h-80" @error="coverImageError = true">
        </div>

        <div class="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="PROJECT_STATUS_BADGE[project.status]">{{ PROJECT_STATUS_LABELS[project.status] }}</span>
            <h1 class="mt-3 text-4xl font-bold text-gray-900">
              {{ project.title }}
            </h1>
            <p class="mt-3 max-w-2xl text-lg text-gray-600">
              {{ project.shortDescription }}
            </p>
          </div>
          <a v-if="project.gofundmeLink" :href="project.gofundmeLink" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
            Donate via GoFundMe
          </a>
        </div>

        <div class="mb-10 grid gap-6 sm:grid-cols-3">
          <StatCard label="Goal" :value="formatCurrency(project.goal)" sub-label="Total project budget" />
          <StatCard label="Raised" :value="formatCurrency(project.raised)" sub-label="Donations received" accent />
          <StatCard label="Remaining" :value="formatCurrency(remaining)" sub-label="Still needed" />
        </div>

        <div class="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <p class="mb-3 text-sm font-semibold text-gray-700">
            Funding Progress
          </p>
          <ProgressBar :raised="project.raised" :goal="project.goal" :show-label="true" />
        </div>

        <div class="mb-10">
          <SectionHeader title="Donation Sources" subtitle="Where funds have come from" />
          <div class="overflow-x-auto rounded-xl border border-gray-100">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th class="px-4 py-3">Source</th>
                  <th class="px-4 py-3">Amount</th>
                  <th class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="donation in projectDonations" :key="donation.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-900">{{ donation.source }}</td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(donation.amount) }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ formatDate(donation.date) }}</td>
                </tr>
                <tr v-if="projectDonations.length === 0">
                  <td colspan="3" class="px-4 py-6 text-center text-gray-400">No donations recorded yet.</td>
                </tr>
              </tbody>
              <tfoot v-if="projectDonations.length > 0" class="bg-gray-50">
                <tr>
                  <td class="px-4 py-3 font-semibold text-gray-700">Total</td>
                  <td class="px-4 py-3 font-bold text-gray-900">{{ formatCurrency(project.raised) }}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="mb-10">
          <SectionHeader title="Expenses &amp; Receipts" subtitle="All verified expenditures for this project" />
          <ReceiptTable :expenses="projectExpenses" :show-total="true" />
        </div>

        <div class="mb-10">
          <SectionHeader title="Project Timeline" subtitle="Updates and milestones" />
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <Timeline :entries="projectTimeline" />
          </div>
        </div>

        <div class="mb-10">
          <SectionHeader title="Photo Gallery" :subtitle="projectPhotos.length > 0 ? 'Project documentation photos' : 'Documentation photos (coming soon)'" />
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <template v-if="projectPhotos.length > 0">
              <div v-for="photo in projectPhotos" :key="photo.id" class="overflow-hidden rounded-xl bg-gray-100">
                <img v-if="photo.imageLink && !photoErrors[photo.id]" :src="resolveImageUrl(photo.imageLink)" :alt="photo.caption" loading="lazy" class="h-40 w-full object-cover" @error="photoErrors[photo.id] = true">
                <div v-else class="flex h-40 items-center justify-center">
                  <div class="text-center text-gray-400">
                    <svg class="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="mt-1 text-xs font-medium">{{ photo.caption || photo.type }}</p>
                  </div>
                </div>
                <p v-if="photo.imageLink && !photoErrors[photo.id] && photo.caption" class="px-2 py-1 text-center text-xs font-medium text-gray-600">
                  {{ photo.caption }}
                </p>
              </div>
            </template>
            <template v-else>
              <div v-for="label in photoLabels" :key="label" class="flex h-40 items-center justify-center rounded-xl bg-gray-100">
                <div class="text-center text-gray-400">
                  <svg class="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="mt-1 text-xs font-medium">{{ label }}</p>
                  <p class="text-xs">Coming soon</p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="project.status === 'active'" class="rounded-2xl bg-gradient-to-r from-green-600 to-green-800 p-10 text-center text-white">
          <h2 class="text-2xl font-bold">
            Help Us Reach Our Goal
          </h2>
          <p class="mt-3 text-green-100">
            We need {{ formatCurrency(remaining) }} more to complete this project. Every contribution makes a real difference.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-4">
            <a v-if="project.gofundmeLink" :href="project.gofundmeLink" target="_blank" rel="noopener noreferrer" class="rounded-lg bg-white px-6 py-3 font-semibold text-green-800 transition-colors hover:bg-green-50">
              Donate via GoFundMe
            </a>
            <RouterLink to="/transparency" class="rounded-lg border border-green-300 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
              View All Finances
            </RouterLink>
          </div>
        </div>
      </template>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import StatCard from '../components/StatCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import Timeline from '../components/Timeline.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useProjects } from '../composables/useProjects'
import { useDonations } from '../composables/useDonations'
import { useExpenses } from '../composables/useExpenses'
import { useTimeline } from '../composables/useTimeline'
import { usePhotos } from '../composables/usePhotos'
import type { Project } from '../types'
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_BADGE } from '../types'
import { formatCurrency, formatDate } from '../utils/format'
import { resolveImageUrl } from '../utils/image'

const route = useRoute()
const { projects, loading, error } = useProjects()
const { donations } = useDonations()
const { expenses } = useExpenses()
const { timeline } = useTimeline()
const { photos } = usePhotos()

const coverImageError = ref(false)
const photoErrors = reactive<Record<string, boolean>>({})

const project = computed<Project | undefined>(() =>
  projects.value.find((p) => p.id === (route.params.id as string)),
)

const projectDonations = computed(() =>
  donations.value.filter((d) => d.projectId === (route.params.id as string)),
)

const projectExpenses = computed(() =>
  expenses.value.filter((e) => e.projectId === (route.params.id as string)),
)

const projectTimeline = computed(() =>
  timeline.value.filter((t) => t.projectId === (route.params.id as string)),
)

const projectPhotos = computed(() =>
  photos.value.filter((ph) => ph.projectId === (route.params.id as string)),
)

const remaining = computed(() =>
  project.value ? Math.max(0, project.value.goal - project.value.raised) : 0,
)

const photoLabels = ['Before', 'During (1)', 'During (2)', 'After']
</script>
