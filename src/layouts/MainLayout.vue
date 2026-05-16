<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    <header class="sticky top-0 z-10 border-b bg-white shadow-sm">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/logo.png" alt="Islamic Center of Moscow" class="h-10 w-10 object-contain">
          <div class="flex flex-col leading-tight">
            <span class="text-lg font-bold text-gray-900">Islamic Center of Moscow</span>
            <span class="text-xs font-medium text-green-700">Community Projects &amp; Transparency</span>
          </div>
        </RouterLink>

        <div class="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <RouterLink to="/" exact-active-class="text-green-700 font-semibold" active-class="" class="hover:text-green-700">Home</RouterLink>
          <RouterLink to="/projects" active-class="text-green-700 font-semibold" class="hover:text-green-700">Projects</RouterLink>
          <RouterLink to="/transparency" active-class="text-green-700 font-semibold" class="hover:text-green-700">Transparency</RouterLink>
          <RouterLink to="/activities" active-class="text-green-700 font-semibold" class="hover:text-green-700">Activities</RouterLink>
          <RouterLink to="/contact-us" active-class="text-green-700 font-semibold" class="hover:text-green-700">Contact Us</RouterLink>
        </div>

        <button class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden" aria-label="Toggle menu" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <div v-if="mobileMenuOpen" class="border-t bg-white px-6 py-4 md:hidden">
        <div class="flex flex-col gap-4 text-sm font-medium text-gray-600">
          <RouterLink to="/" exact-active-class="text-green-700 font-semibold" active-class="" class="hover:text-green-700" @click="mobileMenuOpen = false">Home</RouterLink>
          <RouterLink to="/projects" active-class="text-green-700 font-semibold" class="hover:text-green-700" @click="mobileMenuOpen = false">Projects</RouterLink>
          <RouterLink to="/transparency" active-class="text-green-700 font-semibold" class="hover:text-green-700" @click="mobileMenuOpen = false">Transparency</RouterLink>
          <RouterLink to="/activities" active-class="text-green-700 font-semibold" class="hover:text-green-700" @click="mobileMenuOpen = false">Activities</RouterLink>
          <RouterLink to="/contact-us" active-class="text-green-700 font-semibold" class="hover:text-green-700" @click="mobileMenuOpen = false">Contact Us</RouterLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t bg-white">
      <div class="mx-auto max-w-7xl px-6 py-8">
        <div class="flex flex-col items-center gap-4 text-center text-sm text-gray-500 md:flex-row md:justify-between md:text-left">
          <p class="font-semibold text-gray-700">Islamic Center of Moscow</p>
          <div class="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <RouterLink to="/contact-us" class="hover:text-green-700">Contact Us</RouterLink>
            <RouterLink to="/privacy" class="hover:text-green-700">Privacy Policy</RouterLink>
            <span>&copy; {{ currentYear }} Islamic Center of Moscow. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const mobileMenuOpen = ref(false)
const route = useRoute()
const currentYear = new Date().getFullYear()

watch(route, () => {
  mobileMenuOpen.value = false
})
</script>
