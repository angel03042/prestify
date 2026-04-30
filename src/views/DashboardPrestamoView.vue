<script setup>
import ModalVerPrestamo from '@/components/dashboard/ModalVerPrestamo.vue'
import ModalPagoPrestamo from '@/components/dashboard/ModalPagoPrestamo.vue'
import ModalDeletePrestamo from '@/components/dashboard/ModalDeletePrestamo.vue'
import ModalNewPrestamo from '@/components/dashboard/ModalNewPago.vue'
import { ref } from 'vue'

const showModal = ref(false)
const isViewOpen = ref(false)
const isDeleteOpen = ref(false)
const isPagoOpen = ref(false)
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">
    
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 py-6 border-b border-zinc-800/50">
      
      <!-- BUSCADOR -->
      <div class="relative flex items-center w-full max-w-md group">
        <div class="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>
        </div>
        <input type="text" placeholder="Buscar préstamos..."
          class="w-full pl-10 pr-4 h-11 bg-zinc-800/40 border border-zinc-700/50 rounded-xl outline-none text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-800/60 transition-all"/>
      </div>

      <!-- BOTÓN -->
      <button @click="showModal = true"
        class="bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95">
        Nuevo Préstamo
      </button>
    </div>

    <!-- TABLA -->
    <div class="px-2 py-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50">
        
        <table class="min-w-full text-sm text-zinc-400">
          
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase">Cliente</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase">Monto</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase">Restante</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase">Fecha</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase">Estado</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase text-right">Acciones</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-800/50">
            
            <tr class="hover:bg-zinc-800/20 group transition-colors">
              
              <td class="py-4 px-6 text-white font-medium">
                Angel Francisco Benitez Ramirez
              </td>

              <td class="py-4 px-6 text-white">$2,000</td>

              <td class="py-4 px-6 text-zinc-300">$1,200</td>

              <td class="py-4 px-6 text-zinc-400">29 Abr 2026</td>

              <td class="py-4 px-6 text-emerald-400 font-medium">
                Activo
              </td>

              <td class="py-4 px-6">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  
                  <!-- VER -->
                  <button @click="isViewOpen = true" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg" title="Ver">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>

                  <!-- REGISTRAR PAGO -->
                  <button @click="isPagoOpen = true" class="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>

                  <!-- ELIMINAR -->
                  <button @click="isDeleteOpen = true" class="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                  </button>

                </div>
              </td>

            </tr>

          </tbody>
        </table>

      </div>
    </div>

  </section>
  <ModalVerPrestamo v-if="isViewOpen" @close="isViewOpen = false"/>
  <ModalPagoPrestamo v-if="isPagoOpen" @close="isPagoOpen = false"/>
  <ModalDeletePrestamo v-if="isDeleteOpen" @close="isDeleteOpen = false"/>
  <ModalNewPrestamo v-if="showModal" @close="showModal = false"/>
</template>