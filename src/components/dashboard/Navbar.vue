<script setup>
import { getCurrent } from '@/services/auth/getUser.js'
import { ref, onMounted } from 'vue';

const user = ref(null);

// Estado reactivo para controlar el menú desplegable del usuario
const isDropdownOpen = ref(false);

// Definimos el evento que avisará al layout que queremos abrir el menú
defineEmits(['toggle-sidebar']);

onMounted(async () => {
  const data = await getCurrent();
  user.value = data;
});
</script>

<template>
  <nav class="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-zinc-800 bg-neutral-900 z-40">
    
    <div class="flex items-center gap-3 text-zinc-300">
      <button @click="$emit('toggle-sidebar')" class="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
      </button>
      
      <span class="text-sm text-zinc-500 hidden xs:block">Dashboard</span>
    </div>

    <div v-if="user" class="flex items-center gap-2 sm:gap-4">
      
      <div class="relative h-full flex items-center">
        
        <div @click="isDropdownOpen = !isDropdownOpen" class="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-zinc-800 transition-colors">
          <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">
            {{ user.nombre?.charAt(0).toUpperCase() }}{{ user.apellido?.charAt(0).toUpperCase() }}
          </div>
          
          <span class="hidden sm:block text-sm font-medium text-zinc-300">
            {{ user.nombre }} {{ user.apellido }}
          </span>

          <svg class="w-4 h-4 text-zinc-500 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <div v-if="isDropdownOpen" class="absolute top-full right-0 mt-1 w-48 z-50 pt-1">
          
          <div class="fixed inset-0 z-40" @click="isDropdownOpen = false"></div>
          
          <div class="relative z-50 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1">
            <div class="px-4 py-2">
              <p class="text-[10px] font-bold text-zinc-500 uppercase">Cuenta</p>
              <p class="text-xs text-zinc-300 truncate">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-zinc-500 text-xs animate-pulse">
      Cargando perfil...
    </div>
  </nav>
</template>