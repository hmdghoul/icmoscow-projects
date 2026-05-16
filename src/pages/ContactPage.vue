<template>
  <MainLayout>
    <section class="bg-gradient-to-br from-green-700 to-green-900 px-6 py-16 text-white">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wider text-green-200">Get in Touch</p>
        <h1 class="mt-2 text-4xl font-bold">Contact Us</h1>
        <p class="mt-4 text-lg text-green-100">
          Have a question, suggestion, or feedback? Interested in supporting our projects, making a donation, or getting involved in the community? Send us a message and we will respond as soon as possible.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-2xl px-6 py-12">
      <div v-show="submitted" class="rounded-2xl border border-green-100 bg-green-50 p-10 text-center">
        <svg class="mx-auto mb-4 h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 class="text-2xl font-bold text-gray-900">Message Sent!</h2>
        <p class="mt-2 text-gray-600">Thank you for reaching out. We will respond as soon as possible.</p>
        <button class="mt-6 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700" @click="reset">
          Send Another Message
        </button>
      </div>

      <div v-show="!submitted" class="rounded-2xl bg-white p-8 shadow-sm">
        <iframe name="hidden_iframe" class="hidden" />

        <form method="POST" :action="GOOGLE_FORM_ACTION_URL" target="hidden_iframe" novalidate @submit="handleSubmit">
          <div class="mb-5">
            <label for="name" class="mb-1.5 block text-sm font-semibold text-gray-700">
              Name <span class="text-red-500">*</span>
            </label>
            <input id="name" v-model="form.name" type="text" :name="ENTRY_ID_NAME" placeholder="Your full name" class="w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100" :class="errors.name ? 'border-red-400' : 'border-gray-300'">
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
          </div>

          <div class="mb-5">
            <label for="email" class="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
            <input id="email" v-model="form.email" type="email" :name="ENTRY_ID_EMAIL" placeholder="your@email.com (optional)" class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100">
          </div>

          <div class="mb-5">
            <label for="phone" class="mb-1.5 block text-sm font-semibold text-gray-700">Phone Number</label>
            <input id="phone" v-model="form.phone" type="tel" :name="ENTRY_ID_PHONE" placeholder="(208) 555-0000 (optional)" class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100">
          </div>

          <div class="mb-5">
            <label for="subject" class="mb-1.5 block text-sm font-semibold text-gray-700">
              Subject <span class="text-red-500">*</span>
            </label>
            <input id="subject" v-model="form.subject" type="text" :name="ENTRY_ID_SUBJECT" placeholder="What is this regarding?" class="w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100" :class="errors.subject ? 'border-red-400' : 'border-gray-300'">
            <p v-if="errors.subject" class="mt-1 text-xs text-red-600">{{ errors.subject }}</p>
          </div>

          <div class="mb-6">
            <label for="message" class="mb-1.5 block text-sm font-semibold text-gray-700">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea id="message" v-model="form.message" :name="ENTRY_ID_MESSAGE" rows="5" placeholder="Write your message here..." class="w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100" :class="errors.message ? 'border-red-400' : 'border-gray-300'" />
            <p v-if="errors.message" class="mt-1 text-xs text-red-600">{{ errors.message }}</p>
          </div>

          <button type="submit" class="w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScxt8kcqgHcou7DmDgv_5vNCbgeThQiVgqpMayByuIwF-rtlg/formResponse'
const ENTRY_ID_NAME = 'entry.2005620554'
const ENTRY_ID_EMAIL = 'entry.1045781291'
const ENTRY_ID_PHONE = 'entry.1166974658'
const ENTRY_ID_SUBJECT = 'entry.1459413662'
const ENTRY_ID_MESSAGE = 'entry.839337160'

const submitted = ref(false)

const form = reactive({ name: '', email: '', phone: '', subject: '', message: '' })
const errors = reactive({ name: '', subject: '', message: '' })

function handleSubmit(event: SubmitEvent) {
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.subject = form.subject.trim() ? '' : 'Subject is required.'
  errors.message = form.message.trim() ? '' : 'Message is required.'

  if (errors.name || errors.subject || errors.message) {
    event.preventDefault()
    return
  }

  submitted.value = true
}

function reset() {
  submitted.value = false
  Object.assign(form, { name: '', email: '', phone: '', subject: '', message: '' })
  Object.assign(errors, { name: '', subject: '', message: '' })
}
</script>
