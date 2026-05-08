import { ref, watchEffect } from 'vue'
import type { Project } from '../types'
import { fetchProjects } from '../services/projects.service'
import { useDonations } from './useDonations'
import type { Donation } from '../services/donations.service'

const rawProjectsRef = ref<Project[]>([])
const projectsRef = ref<Project[]>([])
const loadingRef = ref(true)
const errorRef = ref<string | null>(null)
let initialized = false

const { donations } = useDonations()

watchEffect(() => {
  projectsRef.value = applyDonations(rawProjectsRef.value, donations.value)
})

function applyDonations(projects: Project[], donationList: Donation[]): Project[] {
  return projects.map((p) => ({
    ...p,
    raised: donationList
      .filter((d) => d.projectId === p.id)
      .reduce((sum, d) => sum + d.amount, 0),
  }))
}

function load(): void {
  if (initialized) return
  initialized = true

  fetchProjects()
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
