<script setup>
import { getCurrent } from '@/services/auth/getUser.js'
import { ref, onMounted } from 'vue';

const user = ref(null);

onMounted(async () => {
  const data = await getCurrent();
  user.value = data;
});
</script>

<template>
  <nav class="h-14 px-6 flex items-center justify-between border-b border-zinc-800 bg-neutral-900">
    <div class="flex items-center gap-3 text-zinc-300">
      <span class="text-sm text-zinc-500">Dashboard</span>
    </div>

    <div v-if="user" class="flex items-center gap-2 sm:gap-4">
      
      <div class="relative group h-full flex items-center">
        <div class="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-zinc-800 transition-colors">
          <!-- Iniciales dinámicas (tomando la primera letra del nombre) -->
          <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
            {{ user.nombre?.charAt(0).toUpperCase() }}{{ user.apellido?.charAt(0).toUpperCase() }}
          </div>
          
          <!-- Nombre -->
          <span class="hidden sm:block text-sm font-medium text-zinc-300">
            {{ user.nombre }} {{ user.apellido }}
          </span>

          <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Menú desplegable -->
        <div class="absolute top-full right-0 mt-1 w-48 hidden group-hover:block z-50 pt-1">
          <div class="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1">
            <div class="px-4 py-2">
              <p class="text-[10px] font-bold text-zinc-500 uppercase">Cuenta</p>
              <!-- Correo -->
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