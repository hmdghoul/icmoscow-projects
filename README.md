# Islamic Center of Moscow Projects Website

Vue 3 + Vite website for community projects and transparency reporting.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Data source structure

Current sample data is stored in:

- `/home/runner/work/icmoscow-projects/icmoscow-projects/src/data/projects.json`

Data loading is abstracted in:

- `/home/runner/work/icmoscow-projects/icmoscow-projects/src/services/projectsService.js`

Replace that service implementation later to load from Google Sheets.

## GitHub Pages

- Vite base path is configured for repository pages.
- GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
