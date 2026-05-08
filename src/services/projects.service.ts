import type { Project } from '../data/projects'
import { parseCsv } from './csv'

function isValidStatus(s: string): s is Project['status'] {
  return s === 'active' || s === 'completed' || s === 'future'
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(import.meta.env.VITE_PROJECTS_CSV_URL)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())

  return rows
    .map((row): Project | null => {
      const id = (row['id'] ?? '').trim()
      const status = (row['status'] ?? '').trim()
      if (!id || !isValidStatus(status)) return null

      return {
        id,
        title: (row['title'] ?? '').trim(),
        status,
        shortDescription: (row['shortDescription'] ?? '').trim(),
        goal: Number(row['goal']) || 0,
        raised: 0,
      }
    })
    .filter((p): p is Project => p !== null)
}
