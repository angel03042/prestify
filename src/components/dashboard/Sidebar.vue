<script setup>
import router from '../../router/router';

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
          
          <router-link to="/dashboard/home" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-panel-left"><rect width="7" height="18" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Inicio</span>
          </router-link>

          <router-link to="/dashboard/clientes" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-search"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" x2="12" y1="22" y2="12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Clientes</span>
          </router-link>

          <router-link to="/dashboard/prestamos" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Prestamos</span>
          </router-link>

          <router-link to="/dashboard/tienda" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store">
                <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
                <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>
                <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>
                </svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Tienda</span>
          </router-link>

          <router-link to="/dashboard/catalogo" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
              <div class="min-w-[32px] flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
              </div>
              <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Catalogo</span>
          </router-link>

          <rouuter-link to="/dashboard/reportes" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
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
          </rouuter-link>

          <router-link to="/dashboard/historial" class="menu-btn flex items-center p-3 rounded-xl text-zinc-400 hover:bg-white hover:text-black transition-all duration-200 overflow-hidden">
            <div class="min-w-[32px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history">
                <path d="M3 3v5h5"/>
                <path d="M3.05 13a9 9 0 1 0 .5-4"/>
                <path d="M12 7v5l3 3"/>
              </svg>
            </div>
            <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Historial
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
        
        <button id="Sign-out" class="flex items-center p-3 rounded-xl text-red-500 hover:bg-red-500/10 cursor-pointer overflow-hidden transition-all duration-200">
            <div class="min-w-[32px] flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
            </div>
            <span class="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Cerrar Sesión</span>
        </button>
    </div>
  </nav>
</template>