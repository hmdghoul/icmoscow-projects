import { parseCsv } from './csv'

export interface Donation {
  id: string
  projectId: string
  source: string
  amount: number
  date: string
  note: string
}

export async function fetchDonations(): Promise<Donation[]> {
  const url = import.meta.env.VITE_DONATIONS_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())
  return rows
    .map((row): Donation => ({
      id: (row['id'] ?? '').trim(),
      projectId: (row['projectId'] ?? '').trim(),
      source: (row['source'] ?? '').trim(),
      amount: Number(row['amount']) || 0,
      date: (row['date'] ?? '').trim(),
      note: (row['note'] ?? '').trim(),
    }))
    .filter((d) => d.id && d.projectId)
}
