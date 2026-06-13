<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/dashboard/Sidebar.vue'
import Navbar from '@/components/dashboard/Navbar.vue'

// Estado global para controlar el menú en móviles
const isSidebarOpen = ref(false)
</script>

<template>
  <div class="bg-neutral-900 min-h-screen relative md:grid md:grid-cols-[auto_1fr]">

    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="flex flex-col h-screen min-w-0">

      <Navbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <main class="custom-scrollbar flex-1 overflow-y-auto p-4 sm:p-6">
        <router-view />
      </main>

    </div>
  </div>
</template>