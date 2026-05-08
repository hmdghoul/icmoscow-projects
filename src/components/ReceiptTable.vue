<template>
  <div class="overflow-x-auto rounded-xl border border-gray-100">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
        <tr>
          <th class="px-4 py-3">Item</th>
          <th class="px-4 py-3">Amount</th>
          <th class="px-4 py-3">Date</th>
          <th class="px-4 py-3">Receipt</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100 bg-white">
        <tr v-for="expense in expenses" :key="expense.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-900">{{ expense.item }}</td>
          <td class="px-4 py-3 font-medium text-gray-900">{{ formatCurrency(expense.amount) }}</td>
          <td class="px-4 py-3 text-gray-500">{{ formatDate(expense.date) }}</td>
          <td class="px-4 py-3">
            <a v-if="expense.receiptLink" :href="expense.receiptLink" target="_blank" rel="noopener noreferrer" class="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 hover:underline">
              View Receipt
            </a>
            <span v-else class="text-gray-400">—</span>
          </td>
        </tr>
        <tr v-if="expenses.length === 0">
          <td colspan="4" class="px-4 py-6 text-center text-gray-400">No expenses recorded yet.</td>
        </tr>
      </tbody>
      <tfoot v-if="showTotal && expenses.length > 0" class="bg-gray-50">
        <tr>
          <td class="px-4 py-3 font-semibold text-gray-700">Total</td>
          <td class="px-4 py-3 font-bold text-gray-900">{{ formatCurrency(total) }}</td>
          <td colspan="2" />
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Expense } from '../services/expenses.service'
import { formatCurrency, formatDate } from '../utils/format'

const props = defineProps<{
  expenses: Expense[]
  showTotal?: boolean
}>()

const total = computed(() => props.expenses.reduce((sum, e) => sum + e.amount, 0))
</script>
