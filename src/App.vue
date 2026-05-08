<script setup>
import { computed, onMounted, ref } from 'vue'
import { getProjectsData } from './services/projectsService'

const activeSection = ref('home')
const data = ref({ projects: [], activities: [], contact: {} })
const selectedProjectId = ref('')

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'current-projects', label: 'Current Projects' },
  { id: 'completed-projects', label: 'Completed Projects' },
  { id: 'future-projects', label: 'Future Projects' },
  { id: 'project-details', label: 'Project Details' },
  { id: 'receipts-and-reports', label: 'Receipts and Reports' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact', label: 'Contact' }
]

const currentProjects = computed(() => data.value.projects.filter((project) => project.status === 'current'))
const completedProjects = computed(() => data.value.projects.filter((project) => project.status === 'completed'))
const futureProjects = computed(() => data.value.projects.filter((project) => project.status === 'future'))

const selectedProject = computed(() => {
  return data.value.projects.find((project) => project.id === selectedProjectId.value)
})

const allReceipts = computed(() =>
  data.value.projects.flatMap((project) =>
    project.receiptLinks.map((receipt) => ({
      projectTitle: project.title,
      ...receipt
    }))
  )
)

const allUpdates = computed(() =>
  data.value.projects
    .flatMap((project) =>
      project.updatesTimeline.map((update) => ({
        projectTitle: project.title,
        ...update
      }))
    )
    .sort((left, right) => right.date.localeCompare(left.date))
)

const totalRaised = computed(() =>
  data.value.projects.reduce((sum, project) => sum + project.raisedAmount, 0)
)

const totalGoal = computed(() =>
  data.value.projects.reduce((sum, project) => sum + project.goalAmount, 0)
)

onMounted(async () => {
  data.value = await getProjectsData()

  if (data.value.projects.length > 0) {
    selectedProjectId.value = data.value.projects[0].id
  }
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)
}

function openProjectDetails(projectId) {
  selectedProjectId.value = projectId
  activeSection.value = 'project-details'
}
</script>

<template>
  <div class="page">
    <header class="topbar">
      <div>
        <p class="eyebrow">Islamic Center of Moscow</p>
        <h1>Community Projects & Transparency</h1>
      </div>
      <nav class="nav" aria-label="Main sections">
        <button
          v-for="section in sections"
          :key="section.id"
          class="nav-button"
          :class="{ active: activeSection === section.id }"
          type="button"
          @click="activeSection = section.id"
        >
          {{ section.label }}
        </button>
      </nav>
    </header>

    <main>
      <section v-if="activeSection === 'home'" class="card">
        <h2>Home</h2>
        <p>
          Welcome to the Islamic Center of Moscow transparency portal. We share goals, donations,
          expenses, receipts, and progress updates for every community project.
        </p>
        <div class="stats-grid">
          <article class="stat">
            <h3>Total Raised</h3>
            <p>{{ formatCurrency(totalRaised) }}</p>
          </article>
          <article class="stat">
            <h3>Total Goal</h3>
            <p>{{ formatCurrency(totalGoal) }}</p>
          </article>
          <article class="stat">
            <h3>Active Projects</h3>
            <p>{{ currentProjects.length }}</p>
          </article>
        </div>
      </section>

      <section v-if="activeSection === 'current-projects'" class="card">
        <h2>Current Projects</h2>
        <div class="project-grid">
          <article v-for="project in currentProjects" :key="project.id" class="project-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <p><strong>Status:</strong> {{ project.status }}</p>
            <p><strong>Goal:</strong> {{ formatCurrency(project.goalAmount) }}</p>
            <p><strong>Raised:</strong> {{ formatCurrency(project.raisedAmount) }}</p>
            <p><strong>Remaining:</strong> {{ formatCurrency(project.remainingAmount) }}</p>
            <button type="button" class="action" @click="openProjectDetails(project.id)">
              View project details
            </button>
          </article>
        </div>
      </section>

      <section v-if="activeSection === 'completed-projects'" class="card">
        <h2>Completed Projects</h2>
        <div class="project-grid">
          <article v-for="project in completedProjects" :key="project.id" class="project-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <p><strong>Goal:</strong> {{ formatCurrency(project.goalAmount) }}</p>
            <p><strong>Raised:</strong> {{ formatCurrency(project.raisedAmount) }}</p>
            <button type="button" class="action" @click="openProjectDetails(project.id)">
              View project details
            </button>
          </article>
        </div>
      </section>

      <section v-if="activeSection === 'future-projects'" class="card">
        <h2>Future Projects</h2>
        <div class="project-grid">
          <article v-for="project in futureProjects" :key="project.id" class="project-card">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <p><strong>Goal:</strong> {{ formatCurrency(project.goalAmount) }}</p>
            <p><strong>Raised:</strong> {{ formatCurrency(project.raisedAmount) }}</p>
            <p><strong>Remaining:</strong> {{ formatCurrency(project.remainingAmount) }}</p>
            <button type="button" class="action" @click="openProjectDetails(project.id)">
              View project details
            </button>
          </article>
        </div>
      </section>

      <section v-if="activeSection === 'project-details'" class="card">
        <h2>Project Details</h2>
        <label class="field">
          <span>Select project</span>
          <select v-model="selectedProjectId">
            <option v-for="project in data.projects" :key="project.id" :value="project.id">
              {{ project.title }}
            </option>
          </select>
        </label>

        <article v-if="selectedProject" class="details">
          <h3>{{ selectedProject.title }}</h3>
          <p>{{ selectedProject.description }}</p>
          <p><strong>Status:</strong> {{ selectedProject.status }}</p>
          <p><strong>Goal amount:</strong> {{ formatCurrency(selectedProject.goalAmount) }}</p>
          <p><strong>Raised amount:</strong> {{ formatCurrency(selectedProject.raisedAmount) }}</p>
          <p><strong>Remaining amount:</strong> {{ formatCurrency(selectedProject.remainingAmount) }}</p>

          <h4>Donation sources</h4>
          <ul>
            <li v-for="source in selectedProject.donationSources" :key="source">{{ source }}</li>
          </ul>

          <h4>Expenses</h4>
          <ul>
            <li v-for="expense in selectedProject.expenses" :key="expense.label">
              {{ expense.label }} — {{ formatCurrency(expense.amount) }}
            </li>
          </ul>

          <h4>Receipt links</h4>
          <ul>
            <li v-for="receipt in selectedProject.receiptLinks" :key="receipt.url">
              <a :href="receipt.url" target="_blank" rel="noopener">{{ receipt.label }}</a>
            </li>
          </ul>

          <h4>Photos (before / during / after)</h4>
          <div class="photo-grid">
            <img
              v-for="(photo, index) in [
                ...selectedProject.photos.before,
                ...selectedProject.photos.during,
                ...selectedProject.photos.after
              ]"
              :key="`${photo}-${index}`"
              :src="photo"
              alt="Project progress photo"
            />
          </div>

          <h4>Updates timeline</h4>
          <ul>
            <li v-for="update in selectedProject.updatesTimeline" :key="`${update.date}-${update.text}`">
              <strong>{{ update.date }}:</strong> {{ update.text }}
            </li>
          </ul>

          <a class="action" :href="selectedProject.goFundMeLink" target="_blank" rel="noopener">
            GoFundMe campaign
          </a>
        </article>
      </section>

      <section v-if="activeSection === 'receipts-and-reports'" class="card">
        <h2>Receipts and Reports</h2>
        <p>Every linked receipt/report is grouped by project for easy auditing.</p>
        <ul>
          <li v-for="receipt in allReceipts" :key="`${receipt.projectTitle}-${receipt.url}`">
            <strong>{{ receipt.projectTitle }}:</strong>
            <a :href="receipt.url" target="_blank" rel="noopener">{{ receipt.label }}</a>
          </li>
        </ul>
      </section>

      <section v-if="activeSection === 'activities'" class="card">
        <h2>Activities</h2>
        <h3>Center Activities</h3>
        <ul>
          <li v-for="activity in data.activities" :key="`${activity.date}-${activity.title}`">
            <strong>{{ activity.date }} — {{ activity.title }}</strong>
            <p>{{ activity.description }}</p>
          </li>
        </ul>

        <h3>Project Updates Timeline</h3>
        <ul>
          <li v-for="update in allUpdates" :key="`${update.projectTitle}-${update.date}-${update.text}`">
            <strong>{{ update.date }} — {{ update.projectTitle }}</strong>
            <p>{{ update.text }}</p>
          </li>
        </ul>
      </section>

      <section v-if="activeSection === 'contact'" class="card">
        <h2>Contact</h2>
        <p><strong>Email:</strong> {{ data.contact.email }}</p>
        <p><strong>Phone:</strong> {{ data.contact.phone }}</p>
        <p><strong>Address:</strong> {{ data.contact.address }}</p>
      </section>
    </main>
  </div>
</template>
