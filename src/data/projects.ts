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
