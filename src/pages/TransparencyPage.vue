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
          <div class="overflow-x-auto rounded-xl border border-gray-100">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th class="px-4 py-3">Source</th>
                  <th class="px-4 py-3">Project</th>
                  <th class="px-4 py-3">Amount</th>
                  <th class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="(row, index) in donationRows" :key="index" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-gray-900">{{ row.source }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ row.projectTitle }}</td>
                  <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(row.amount) }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ formatDate(row.date) }}</td>
                </tr>
                <tr v-if="donationRows.length === 0">
                  <td colspan="4" class="px-4 py-6 text-center text-gray-400">No donations recorded yet.</td>
                </tr>
              </tbody>
              <tfoot v-if="donationRows.length > 0" class="bg-gray-50">
                <tr>
                  <td colspan="2" class="px-4 py-3 font-semibold text-gray-700">Total Raised</td>
                  <td class="px-4 py-3 font-bold text-gray-900">{{ formatCurrency(totalRaised) }}</td>
                  <td />
                </tr>
              </tfoot>
            </table>
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
import { computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import StatCard from '../components/StatCard.vue'
import ReceiptTable from '../components/ReceiptTable.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { useProjects } from '../composables/useProjects'
import { useDonations } from '../composables/useDonations'
import { useExpenses } from '../composables/useExpenses'
import { formatCurrency, formatDate } from '../utils/format'

interface DonationRow {
  source: string
  projectTitle: string
  amount: number
  date: string
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
  })),
)

const totalRaised = computed(() => donationRows.value.reduce((sum, d) => sum + d.amount, 0))
const totalExpenses = computed(() => allExpenses.value.reduce((sum, e) => sum + e.amount, 0))
const balance = computed(() => totalRaised.value - totalExpenses.value)
</script>
