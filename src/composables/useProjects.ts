import { ref, watch } from 'vue'
import type { Project } from '../data/projects'
import { fetchProjects } from '../services/projects.service'
import { useDonations } from './useDonations'
import type { Donation } from '../services/donations.service'

const rawProjectsRef = ref<Project[]>([])
const projectsRef = ref<Project[]>([])
const loadingRef = ref(true)
const errorRef = ref<string | null>(null)
let fetchPromise: Promise<void> | null = null

function applyDonations(projects: Project[], donations: Donation[]): Project[] {
  return projects.map((p) => ({
    ...p,
    raised: donations
      .filter((d) => d.projectId === p.id)
      .reduce((sum, d) => sum + d.amount, 0),
  }))
}

function load(): void {
  if (fetchPromise !== null) return

  const { donations } = useDonations()

  watch([rawProjectsRef, donations], ([projects, donationList]) => {
    projectsRef.value = applyDonations(projects as Project[], donationList as Donation[])
  })

  fetchPromise = fetchProjects()
    .then((data) => {
      rawProjectsRef.value = data
    })
    .catch(() => {
      errorRef.value = 'Unable to load projects. Please check your connection and try again.'
    })
    .finally(() => {
      loadingRef.value = false
    })
}

export function useProjects() {
  load()
  return { projects: projectsRef, loading: loadingRef, error: errorRef }
}
