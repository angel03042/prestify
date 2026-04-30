<script setup>
import { ref } from 'vue';
import ModalAddPlan from '@/components/dashboard/ModalNewPlan.vue'

const showModal = ref(false);
const isDeleteModalOpen = ref(false);
const isUpdateModalOpen = ref(false);
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">

    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 py-6 border-b border-zinc-800/50">
      
      <div class="relative flex items-center w-full max-w-md group">
        <div class="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.34-4.34"/>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="Buscar planes..."
          class="w-full pl-10 pr-4 h-11 bg-zinc-800/40 border border-zinc-700/50 rounded-xl outline-none text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-800/60 transition-all"
        />
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button 
          @click="showModal = true"
          class="flex-1 md:flex-none bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          Nuevo Plan
        </button>
      </div>
    </div>

    <!-- Tabla -->
    <div class="px-2 py-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        
        <table class="min-w-full text-sm text-zinc-400">
          
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Nombre</th>
              <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Quincenas</th>
              <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Interés</th>
              <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Multiplicador</th>
              <th class="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-500 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-800/50">

            <!-- Ejemplo -->
            <tr class="hover:bg-zinc-800/20 transition-colors group">
              
              <td class="py-4 px-6 text-white font-semibold">Plan 6</td>

              <td class="py-4 px-6">6</td>

              <td class="py-4 px-6">23.25%</td>

              <td class="py-4 px-6 text-zinc-200">1.23x</td>

              <td class="py-4 px-6">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                  <!-- Editar -->
                  <button @click="isUpdateModalOpen = true" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>

                  <!-- Eliminar -->
                  <button @click="isDeleteModalOpen = true" class="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </button>

                </div>
              </td>

            </tr>

          </tbody>
        </table>

      </div>
    </div>

  </section>

  <!-- Aquí luego conectas tus modales -->
  <ModalAddPlan v-if="showModal" @close="showModal = false" />
  <!-- <ModalDeletePlan v-if="isDeleteModalOpen" @close="isDeleteModalOpen = false" /> -->
  <!-- <ModalUpdatePlan v-if="isUpdateModalOpen" @close="isUpdateModalOpen = false" /> -->

</template>