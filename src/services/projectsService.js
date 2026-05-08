import projectsData from '../data/projects.json'

export async function getProjectsData() {
  return structuredClone(projectsData)
}

// Replace getProjectsData implementation with Google Sheets API fetch when ready.
