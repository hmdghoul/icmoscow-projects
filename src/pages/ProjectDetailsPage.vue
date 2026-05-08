<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-16">
      <div v-if="!project" class="py-24 text-center">
        <p class="text-6xl font-bold text-gray-200">404</p>
        <h1 class="mt-4 text-2xl font-bold text-gray-900">Project Not Found</h1>
        <p class="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
        <RouterLink to="/projects" class="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700">
          Back to Projects
        </RouterLink>
      </div>

      <template v-if="project">
        <div class="mb-4">
          <RouterLink to="/projects" class="text-sm text-green-700 hover:underline">
            ← All Projects
          </RouterLink>
        </div>

        <div class="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="badgeClass">{{ statusLabel }}</span>
            <h1 class="mt-3 text-4xl font-bold text-gray-900">{{ project.title }}</h1>
            <p class="mt-3 max-w-2xl text-lg text-gray-600">{{ project.shortDescription }}</p>
          </div>
          <a v-if="project.status === 'active'" href="#" class="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
            Donate via GoFundMe
          </a>
        </div>

        <div class="mb-10 grid gap-6 sm:grid-cols-3">
          <StatCard label="Goal" :value="formatCurrency(project.goal)" sub-label="Total project budget" />
          <StatCard label="Raised" :value="formatCurrency(project.raised)" sub-label="Donations received" accent />
          <StatCard label="Remaining" :value="formatCurrency(remaining)" sub-label="Still needed" />
        </div>

        <div class="mb-10 rounded-2xl bg-white p-6 shadow-sm">
          <p class="mb-3 text-sm font-semibold text-gray-700">Funding Progress</p>
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
                <tr v-for="(donation, index) in project.donationSources" :key="index" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-900">{{ donation.source }}</td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(donation.amount) }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ formatDate(donation.date) }}</td>
                </tr>
                <tr v-if="project.donationSources.length === 0">
                  <td colspan="3" class="px-4 py-6 text-center text-gray-400">No donations recorded yet.</td>
                </tr>
              </tbody>
              <tfoot v-if="project.donationSources.length > 0" class="bg-gray-50">
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
          <ReceiptTable :expenses="project.expenses" :show-total="true" />
        </div>

        <div class="mb-10">
          <SectionHeader title="Project Timeline" subtitle="Updates and milestones" />
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <Timeline :entries="project.timeline" />
          </div>
        </div>

        <div class="mb-10">
          <SectionHeader title="Photo Gallery" subtitle="Documentation photos (coming soon)" />
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div v-for="label in photoLabels" :key="label" class="flex h-40 items-center justify-center rounded-xl bg-gray-100">
              <div class="text-center text-gray-400">
                <p class="text-2xl">📷</p>
                <p class="mt-1 text-xs font-medium">{{ label }}</p>
                <p class="text-xs">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="project.status === 'active'" class="rounded-2xl bg-gradient-to-r from-green-600 to-green-800 p-10 text-center text-white">
          <h2 class="text-2xl font-bold">Help Us Reach Our Goal</h2>
          <p class="mt-3 text-green-100">
            We need {{ formatCurrency(remaining) }} more to complete this project. Every contribution makes a real difference.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-4">
            <a href="#" class="rounded-lg bg-white px-6 py-3 font-semibold text-green-800 transition-colors hover:bg-green-50">
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
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import StatCard from '../components/StatCard.vue'
import ProgressBar from '../components/ProgressBar.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import Timeline from '../components/Timeline.vue'
import { getProjectById } from '../data/projects'
import type { Project } from '../data/projects'

const route = useRoute()
const project = computed<Project | undefined>(() => getProjectById(route.params.id as string))

const remaining = computed(() =>
  project.value ? project.value.goal - project.value.raised : 0,
)

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

const badgeClass = computed(() =>
  project.value ? badgeClasses[project.value.status] : '',
)

const statusLabel = computed(() =>
  project.value ? statusLabels[project.value.status] : '',
)

const photoLabels = ['Before', 'During (1)', 'During (2)', 'After']

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
