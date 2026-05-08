import { parseCsv } from './csv'

export interface Expense {
  id: string
  projectId: string
  item: string
  amount: number
  date: string
  receiptLink: string
  note: string
}

export async function fetchExpenses(): Promise<Expense[]> {
  const url = import.meta.env.VITE_EXPENSES_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())
  return rows
    .map((row): Expense => ({
      id: (row['id'] ?? '').trim(),
      projectId: (row['projectId'] ?? '').trim(),
      item: (row['item'] ?? '').trim(),
      amount: Number(row['amount']) || 0,
      date: (row['date'] ?? '').trim(),
      receiptLink: (row['receiptLink'] ?? '').trim(),
      note: (row['note'] ?? '').trim(),
    }))
    .filter((e) => e.id && e.projectId)
}
