import type { Project } from '../types'
import { parseCsv } from './csv'

function isValidStatus(s: string): s is Project['status'] {
  return s === 'active' || s === 'completed' || s === 'future'
}

export async function fetchProjects(): Promise<Project[]> {
  const url = import.meta.env.VITE_PROJECTS_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())

  return rows
    .map((row): Project | null => {
      const id = (row['id'] ?? '').trim()
      const status = (row['status'] ?? '').trim()
      if (!id || !isValidStatus(status)) return null

      const coverImage = (row['coverImage'] ?? '').trim() || undefined
      const gofundmeLink = (row['gofundmeLink'] ?? '').trim() || undefined

      return {
        id,
        title: (row['title'] ?? '').trim(),
        status,
        shortDescription: (row['shortDescription'] ?? '').trim(),
        goal: Number(row['goal']) || 0,
        raised: 0,
        coverImage,
        gofundmeLink,
      }
    })
    .filter((p): p is Project => p !== null)
}
