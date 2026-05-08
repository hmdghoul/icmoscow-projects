<template>
  <MainLayout>
    <div class="mx-auto max-w-7xl px-6 py-16">
      <div class="mb-10">
        <p class="text-sm font-semibold uppercase tracking-wide text-green-700">Islamic Center of Moscow</p>
        <h1 class="mt-2 text-4xl font-bold text-gray-900">Community Projects</h1>
        <p class="mt-3 max-w-2xl text-lg text-gray-600">
          Browse all active, completed, and planned projects. Each project includes full financial details and progress updates.
        </p>
      </div>

      <div class="mb-8 flex flex-wrap gap-2">
        <button
          v-for="opt in filterOptions" :key="opt.value" class="rounded-lg px-4 py-2 text-sm font-medium transition-colors" :class="selectedStatus === opt.value
            ? 'bg-green-600 text-white'
            : 'border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-700'" @click="selectedStatus = opt.value">
          {{ opt.label }}
          <span class="ml-1 rounded-full px-1.5 text-xs" :class="selectedStatus === opt.value ? 'bg-green-500' : 'bg-gray-100'">
            {{ opt.count }}
          </span>
        </button>
      </div>

      <div v-if="activeProjects.length > 0" class="mb-12">
        <SectionHeader title="Active Projects" subtitle="Currently underway — your support makes a difference" />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in activeProjects" :key="project.id" :project="project" />
        </div>
      </div>

      <div v-if="completedProjects.length > 0" class="mb-12">
        <SectionHeader title="Completed Projects" subtitle="Fully funded and finished — thank you, community!" />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in completedProjects" :key="project.id" :project="project" />
        </div>
      </div>

      <div v-if="futureProjects.length > 0" class="mb-12">
        <SectionHeader title="Future Projects" subtitle="Planned initiatives — watch this space for updates" />
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in futureProjects" :key="project.id" :project="project" />
        </div>
      </div>

      <div v-if="activeProjects.length === 0 && completedProjects.length === 0 && futureProjects.length === 0" class="py-16 text-center text-gray-400">
        No projects found for this filter.
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import SectionHeader from '../components/SectionHeader.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

type StatusFilter = 'all' | Project['status']

const selectedStatus = ref<StatusFilter>('all')

const filteredProjects = computed<Project[]>(() =>
  selectedStatus.value === 'all'
    ? projects
    : projects.filter((p) => p.status === selectedStatus.value),
)

const activeProjects = computed(() => filteredProjects.value.filter((p) => p.status === 'active'))
const completedProjects = computed(() => filteredProjects.value.filter((p) => p.status === 'completed'))
const futureProjects = computed(() => filteredProjects.value.filter((p) => p.status === 'future'))

const filterOptions = computed(() => [
  { value: 'all' as StatusFilter, label: 'All', count: projects.length },
  { value: 'active' as StatusFilter, label: 'Active', count: projects.filter((p) => p.status === 'active').length },
  { value: 'completed' as StatusFilter, label: 'Completed', count: projects.filter((p) => p.status === 'completed').length },
  { value: 'future' as StatusFilter, label: 'Future', count: projects.filter((p) => p.status === 'future').length },
])
</script>
