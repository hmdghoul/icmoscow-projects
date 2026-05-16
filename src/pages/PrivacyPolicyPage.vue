<template>
  <MainLayout>
    <section class="bg-gradient-to-br from-green-700 to-green-900 px-6 py-16 text-white">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-sm font-semibold uppercase tracking-wider text-green-200">Transparency & Trust</p>
        <h1 class="mt-2 text-4xl font-bold">Privacy Policy</h1>
        <p class="mt-4 text-lg text-green-100">Last updated: May 2025</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-12">
      <div class="rounded-2xl bg-white p-8 shadow-sm">

        <h2 class="mb-2 text-lg font-bold text-gray-900">Overview</h2>
        <p class="mb-4 leading-7 text-gray-600">
          This website is operated by the Islamic Center of Moscow to share project updates,
          donation progress, expenses, receipts, and general community information in an open
          and transparent manner. We are committed to being honest about how information is
          collected and used.
        </p>

        <h2 class="mb-2 mt-8 text-lg font-bold text-gray-900">Information We Share Publicly</h2>
        <p class="mb-4 leading-7 text-gray-600">
          This portal publishes the following types of information to promote community accountability:
        </p>
        <ul class="mb-4 list-disc pl-6 leading-7 text-gray-600">
          <li class="mb-1">Project descriptions, goals, and status updates</li>
          <li class="mb-1">Aggregated or publicly sourced donation totals</li>
          <li class="mb-1">Expense records and associated receipts</li>
          <li class="mb-1">Community activity announcements and event summaries</li>
        </ul>
        <p class="mb-4 leading-7 text-gray-600">
          We display public donation data (such as amounts raised through GoFundMe campaigns)
          as reported by those platforms. We do not intentionally publish private personal
          information of donors or community members.
        </p>

        <h2 class="mb-2 mt-8 text-lg font-bold text-gray-900">Contact Form</h2>
        <p class="mb-4 leading-7 text-gray-600">
          When you submit the <RouterLink to="/contact-us" class="text-green-700 hover:underline">Contact Us</RouterLink> form,
          the following information may be collected:
        </p>
        <ul class="mb-4 list-disc pl-6 leading-7 text-gray-600">
          <li class="mb-1"><strong>Required:</strong> Name, Subject, and Message</li>
          <li class="mb-1"><strong>Optional:</strong> Email address and phone number</li>
        </ul>
        <p class="mb-4 leading-7 text-gray-600">
          Form submissions are stored in Google Forms and the linked Google Sheet. This data
          is used solely to respond to your inquiry and is not shared with third parties
          outside of the Google services listed below.
        </p>

        <h2 class="mb-2 mt-8 text-lg font-bold text-gray-900">Third-Party Services</h2>
        <p class="mb-4 leading-7 text-gray-600">This website uses the following third-party services, each subject to their own privacy policies:</p>
        <ul class="mb-4 list-disc pl-6 leading-7 text-gray-600">
          <li class="mb-1"><strong>GoFundMe</strong> — fundraising campaigns and donation processing</li>
          <li class="mb-1"><strong>Google Forms &amp; Google Sheets</strong> — contact form collection and storage</li>
          <li class="mb-1"><strong>Google Drive</strong> — document and receipt storage</li>
          <li class="mb-1"><strong>GitHub Pages</strong> — website hosting</li>
          <li class="mb-1"><strong>Cloudflare</strong> — DNS and content delivery</li>
        </ul>
        <p class="mb-4 leading-7 text-gray-600">
          We encourage you to review the privacy policies of these services for details on how they handle your data.
        </p>

        <h2 class="mb-2 mt-8 text-lg font-bold text-gray-900">Cookies &amp; Tracking</h2>
        <p class="mb-4 leading-7 text-gray-600">
          This website does not use cookies or tracking scripts beyond what may be set by
          the third-party hosting and delivery services (GitHub Pages, Cloudflare) as part
          of their standard infrastructure operations.
        </p>

        <h2 class="mb-2 mt-8 text-lg font-bold text-gray-900">Contact Us</h2>
        <p class="mb-4 leading-7 text-gray-600">
          If you have questions or concerns about privacy on this website, please reach out
          through our <RouterLink to="/contact-us" class="text-green-700 hover:underline">Contact Us</RouterLink> page.
          We will do our best to address your inquiry promptly.
        </p>

      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
</script>
