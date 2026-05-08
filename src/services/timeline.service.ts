import { parseCsv } from './csv'

export interface TimelineEntry {
  id: string
  projectId: string
  date: string
  title: string
  update: string
}

export async function fetchTimeline(): Promise<TimelineEntry[]> {
  const url = import.meta.env.VITE_TIMELINE_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())
  return rows
    .map((row): TimelineEntry => ({
      id: (row['id'] ?? '').trim(),
      projectId: (row['projectId'] ?? '').trim(),
      date: (row['date'] ?? '').trim(),
      title: (row['title'] ?? '').trim(),
      update: (row['update'] ?? '').trim(),
    }))
    .filter((e) => e.id && e.projectId)
}
