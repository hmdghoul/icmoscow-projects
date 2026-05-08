import { ref } from 'vue'
import type { Activity } from '../services/activities.service'
import { fetchActivities } from '../services/activities.service'

const activitiesRef = ref<Activity[]>([])
const loadingRef = ref(true)
const errorRef = ref<string | null>(null)
let fetchPromise: Promise<void> | null = null

function load(): void {
  if (fetchPromise !== null) return
  fetchPromise = fetchActivities()
    .then((data) => {
      activitiesRef.value = data
    })
    .catch(() => {
      activitiesRef.value = []
      errorRef.value = 'Unable to load activities. Please check your connection and try again.'
    })
    .finally(() => {
      loadingRef.value = false
    })
}

export function useActivities() {
  load()
  return { activities: activitiesRef, loading: loadingRef, error: errorRef }
}
