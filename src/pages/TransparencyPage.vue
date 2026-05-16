<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-12">
        <p class="text-sm font-semibold uppercase tracking-wide text-green-700">Full Accountability</p>
        <h1 class="mt-2 text-4xl font-bold text-gray-900">Financial Transparency</h1>
        <p class="mt-3 max-w-2xl text-lg text-gray-600">
          Every donation and every expense is recorded here. Our community deserves to know exactly how funds are collected and spent.
        </p>
      </div>

      <LoadingSpinner v-if="isLoading" message="Loading financial data…" />

      <div v-else-if="combinedError" class="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p class="font-semibold text-red-800">Unable to load transparency data</p>
        <p class="mt-1 text-sm text-red-600">{{ combinedError }}</p>
      </div>

      <template v-else>
        <div class="mb-12 grid gap-6 sm:grid-cols-3">
          <StatCard label="Total Raised" :value="formatCurrency(totalRaised)" sub-label="Across all projects" accent />
          <StatCard label="Total Expenses" :value="formatCurrency(totalExpenses)" sub-label="Verified with receipts" />
          <StatCard label="Current Balance" :value="formatCurrency(balance)" sub-label="Available for projects" />
        </div>

        <div class="mb-12">
          <SectionHeader title="Donation Sources" subtitle="All donations received across all projects" />
          <div class="overflow-x-auto rounded-xl border border-gray-100 mb-4">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th class="px-4 py-3">Source</th>
                  <th class="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="row in donationsBySource" :key="row.source" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-900">{{ row.source }}</td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(row.total) }}</td>
                </tr>
                <tr v-if="donationsBySource.length === 0">
                  <td colspan="2" class="px-4 py-6 text-center text-gray-400">No donations recorded yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="donationRows.length > 0">
            <div class="mb-4 grid gap-4 sm:grid-cols-3">
              <div v-for="(d, i) in top3DonationRows" :key="d.source + d.amount" class="rounded-xl border p-4" :class="RANK_STYLES[i].card">
                <p class="text-xs font-semibold uppercase tracking-wide" :class="RANK_STYLES[i].label">
                  {{ RANK_LABELS[i] }}
                </p>
                <p class="mt-1 text-xl font-bold text-gray-900">{{ formatCurrency(d.amount) }}</p>
                <p class="text-sm text-gray-600">{{ d.source }}</p>
                <p class="text-xs text-gray-400">{{ d.projectTitle }}</p>
                <p class="mt-1 text-xs text-gray-400">{{ formatDate(d.date) }}</p>
              </div>
            </div>
            <div class="overflow-x-auto rounded-xl border border-gray-100">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <tr>
                    <th class="px-4 py-3">Source</th>
                    <th class="px-4 py-3">Project</th>
                    <th class="px-4 py-3">Amount</th>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr v-for="(row, index) in pagedDonationRows" :key="index" class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-gray-900">{{ row.source }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ row.projectTitle }}</td>
                    <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(row.amount) }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ formatDate(row.date) }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ row.note }}</td>
                  </tr>
                </tbody>
                <tfoot class="bg-gray-50">
                  <tr>
                    <td colspan="2" class="px-4 py-3 font-semibold text-gray-700">Total Raised</td>
                    <td class="px-4 py-3 font-bold text-gray-900">{{ formatCurrency(totalRaised) }}</td>
                    <td />
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            <div v-if="totalDonationPages > 1" class="mt-3 flex items-center justify-between text-sm">
              <button :disabled="donationPage === 1" class="rounded px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40" @click="donationPage--">← Previous</button>
              <span class="text-xs text-gray-500">Page {{ donationPage }} of {{ totalDonationPages }}</span>
              <button :disabled="donationPage === totalDonationPages" class="rounded px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-40" @click="donationPage++">Next →</button>
            </div>
          </div>
        </div>

        <div class="mb-12">
          <SectionHeader title="Expenses &amp; Receipts" subtitle="All verified expenditures across all projects" />
          <ReceiptTable :expenses="allExpenses" :show-total="true" />
        </div>
      </template>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h3 class="font-bold text-blue-900">Privacy Protection</h3>
          <p class="mt-2 text-sm text-blue-800">
            All individual donors are kept strictly anonymous. Only donation amounts and source categories are shown publicly.
            No personal identifying information is stored or shared.
          </p>
        </div>
        <div class="rounded-2xl border border-green-100 bg-green-50 p-6">
          <h3 class="font-bold text-green-900">Our Commitment</h3>
          <p class="mt-2 text-sm text-green-800">
            The Islamic Center of Moscow is committed to full financial transparency. Receipts for all expenses are available
            for review by any community member upon request. Contact the board for access.
          </p>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import StatCard from '../components/StatCard.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useProjects } from '../composables/useProjects'
import { useDonations } from '../composables/useDonations'
import { useExpenses } from '../composables/useExpenses'
import { formatCurrency, formatDate } from '../utils/format'

const RANK_LABELS = ['1st', '2nd', '3rd'] as const
const RANK_STYLES = [
  { card: 'border-emerald-300 bg-emerald-100', label: 'text-emerald-800' },
  { card: 'border-green-300 bg-green-100',     label: 'text-green-800'   },
  { card: 'border-teal-300 bg-teal-100',       label: 'text-teal-800'    },
] as const

interface DonationRow {
  source: string
  projectTitle: string
  amount: number
  date: string
  note: string
}

const { projects, loading: projectsLoading, error: projectsError } = useProjects()
const { donations, loading: donationsLoading, error: donationsError } = useDonations()
const { expenses: allExpenses, loading: expensesLoading, error: expensesError } = useExpenses()

const isLoading = computed(() => projectsLoading.value || donationsLoading.value || expensesLoading.value)
const combinedError = computed(() => projectsError.value ?? donationsError.value ?? expensesError.value)

const projectTitleMap = computed<Record<string, string>>(() =>
  Object.fromEntries(projects.value.map((p) => [p.id, p.title])),
)

const donationRows = computed<DonationRow[]>(() =>
  donations.value.map((d) => ({
    source: d.source,
    projectTitle: projectTitleMap.value[d.projectId] ?? d.projectId,
    amount: d.amount,
    date: d.date,
    note: d.note,
  })),
)

const donationsBySource = computed(() => {
  const map = new Map<string, number>()
  for (const d of donations.value) {
    map.set(d.source, (map.get(d.source) ?? 0) + d.amount)
  }
  const result: { source: string; total: number }[] = []
  for (const [source, total] of map) result.push({ source, total })
  return result
})

const top3DonationRows = computed(() =>
  [...donationRows.value].sort((a, b) => b.amount - a.amount).slice(0, 3),
)

const PAGE_SIZE = 10
const donationPage = ref(1)

const sortedDonationRows = computed(() =>
  [...donationRows.value].sort((a, b) => b.date.localeCompare(a.date)),
)

const totalDonationPages = computed(() => Math.max(1, Math.ceil(sortedDonationRows.value.length / PAGE_SIZE)))

const pagedDonationRows = computed(() => {
  const start = (donationPage.value - 1) * PAGE_SIZE
  return sortedDonationRows.value.slice(start, start + PAGE_SIZE)
})

const totalRaised = computed(() => donationRows.value.reduce((sum, d) => sum + d.amount, 0))
const totalExpenses = computed(() => allExpenses.value.reduce((sum, e) => sum + e.amount, 0))
const balance = computed(() => totalRaised.value - totalExpenses.value)
</script>
