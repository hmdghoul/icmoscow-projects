import { ref } from 'vue'
import type { Photo } from '../services/photos.service'
import { fetchPhotos } from '../services/photos.service'

const photosRef = ref<Photo[]>([])
const loadingRef = ref(true)
const errorRef = ref<string | null>(null)
let fetchPromise: Promise<void> | null = null

function load(): void {
  if (fetchPromise !== null) return
  fetchPromise = fetchPhotos()
    .then((data) => {
      photosRef.value = data
    })
    .catch(() => {
      photosRef.value = []
      errorRef.value = 'Unable to load photos. Please check your connection and try again.'
    })
    .finally(() => {
      loadingRef.value = false
    })
}

export function usePhotos() {
  load()
  return { photos: photosRef, loading: loadingRef, error: errorRef }
}
