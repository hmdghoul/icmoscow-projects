/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECTS_CSV_URL: string
  readonly VITE_DONATIONS_CSV_URL: string
  readonly VITE_EXPENSES_CSV_URL: string
  readonly VITE_TIMELINE_CSV_URL: string
  readonly VITE_PHOTOS_CSV_URL: string
  readonly VITE_ACTIVITIES_CSV_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
