import { parseCsv } from './csv'

export interface Photo {
  id: string
  projectId: string
  type: string
  imageLink: string
  caption: string
}

export async function fetchPhotos(): Promise<Photo[]> {
  const url = import.meta.env.VITE_PHOTOS_CSV_URL
  if (!url) return []

  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const rows = parseCsv(await response.text())
  return rows
    .map((row): Photo => ({
      id: (row['id'] ?? '').trim(),
      projectId: (row['projectId'] ?? '').trim(),
      type: (row['type'] ?? '').trim(),
      imageLink: (row['imageLink'] ?? '').trim(),
      caption: (row['caption'] ?? '').trim(),
    }))
    .filter((p) => p.id && p.projectId)
}
