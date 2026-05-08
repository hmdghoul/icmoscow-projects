import { parseCsv } from './csv'

export interface Activity {
  id: string
  category: string
  title: string
  description: string
  schedule: string
  location: string
}

export async function fetchActivities(): Promise<Activity[]> {
  const url = import.meta.env.VITE_ACTIVITIES_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())
  return rows
    .map((row): Activity => ({
      id: (row['id'] ?? '').trim(),
      category: (row['category'] ?? '').trim(),
      title: (row['title'] ?? '').trim(),
      description: (row['description'] ?? '').trim(),
      schedule: (row['schedule'] ?? '').trim(),
      location: (row['location'] ?? '').trim(),
    }))
    .filter((a) => a.id && a.category)
}
