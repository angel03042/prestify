<script setup>
import { signOutService } from '@/services/auth/signOut.js'
import router from '@/router/router.js';
import { useRouter } from 'vue-router';

const route = useRouter();

const signOut = async () => {
  try {
    await signOutService();
    route.replace('/'); 
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
}
</script>

<template>
    <nav class="group sticky top-0 flex flex-col justify-between items-start h-screen py-4 border-e border-zinc-800 w-20 hover:w-64 transition-all duration-300 ease-in-out z-50">
    
    <div class="w-full flex flex-col gap-8">
      <div class="flex items-center px-7 h-10 overflow-hidden">
             <svg class="min-w-[24px] w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span class="ml-4 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Prestify</span>
      </div>

      <div class="flex flex-col gap-2 px-3">
          
          <router-link to="/dashboard/home" class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden" active-class="bg-white/15 text-black">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-panel-left"><rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Inicio</span>
          </router-link>

          <router-link to="/dashboard/clientes" class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden" active-class="bg-white/15 text-black">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Clientes</span>
          </router-link>

          <router-link to="/dashboard/prestamos" class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden" active-class="bg-white/15 text-black">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><circle cx="18" cy="5" r="3"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Prestamos</span>
          </router-link>

          <router-link to="/dashboard/planes" class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden" active-class="bg-white/15 text-black">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 0 0 4h15a1 1 0 0 0 1-1v-4"/><rect width="3" height="3" x="15" y="10" rx="1"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Planes</span>
          </router-link>

          <router-link to="/dashboard/reportes" class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden" active-class="bg-white/15 text-black">
            <div class="min-w-[32px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3">
                <path d="M3 3v18h18"/>
                <path d="M18 17V9"/>
                <path d="M13 17V5"/>
                <path d="M8 17v-3"/>
              </svg>
            </div>
            <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Reportes
            </span>
          </router-link>
      </div>
    </div>

    <div class="w-full flex flex-col gap-2 px-3 pb-4">
        <!-- <div class="flex items-center p-3 rounded-xl text-zinc-400 hover:bg-zinc-800 cursor-pointer overflow-hidden transition-all duration-200">
            <div class="min-w-[32px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bolt"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Configuración</span>
        </div> -->
        
        <button @click="signOut" id="Sign-out" class="flex items-center p-3 rounded-xl text-red-500 hover:bg-red-500/10 cursor-pointer overflow-hidden transition-all duration-200">
            <div class="min-w-[32px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
            </div>
            <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Cerrar Sesión</span>
        </button>
    </div>
  </nav>
</template>