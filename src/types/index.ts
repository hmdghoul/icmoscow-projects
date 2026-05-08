export interface Project {
  id: string
  title: string
  status: 'active' | 'completed' | 'future'
  shortDescription: string
  goal: number
  raised: number
  coverImage?: string
  gofundmeLink?: string
}

export const PROJECT_STATUS_LABELS: Record<Project['status'], string> = {
  active: 'Active',
  completed: 'Completed',
  future: 'Future',
}

export const PROJECT_STATUS_BADGE: Record<Project['status'], string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  future: 'bg-yellow-100 text-yellow-800',
}
