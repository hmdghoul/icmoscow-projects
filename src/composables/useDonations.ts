import { ref } from 'vue'
import type { Donation } from '../services/donations.service'
import { fetchDonations } from '../services/donations.service'

const donationsRef = ref<Donation[]>([])
const loadingRef = ref(true)
const errorRef = ref<string | null>(null)
let fetchPromise: Promise<void> | null = null

function load(): void {
  if (fetchPromise !== null) return
  fetchPromise = fetchDonations()
    .then((data) => {
      donationsRef.value = data
    })
    .catch(() => {
      donationsRef.value = []
      errorRef.value = 'Unable to load donations. Please check your connection and try again.'
    })
    .finally(() => {
      loadingRef.value = false
    })
}

export function useDonations() {
  load()
  return { donations: donationsRef, loading: loadingRef, error: errorRef }
}
