<script setup>
import Sidebar from '@/components/dashboard/Sidebar.vue'
import Navbar from '@/components/dashboard/Navbar.vue'
</script>

<template>
  <div class="bg-neutral-900 min-h-screen grid grid-cols-[auto_1fr]">

    <!-- Sidebar fijo -->
    <Sidebar />

    <div class="flex flex-col h-screen">

      <!-- Navbar fijo -->
      <Navbar />

      <!-- Contenido dinámico -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>