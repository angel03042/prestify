<script setup>
import ModalVerPrestamo from '@/components/dashboard/ModalVerPrestamo.vue'
import ModalPagoPrestamo from '@/components/dashboard/ModalPagoPrestamo.vue'
import ModalDeletePrestamo from '@/components/dashboard/ModalDeletePrestamo.vue'
import ModalNewPrestamo from '@/components/dashboard/ModalNewPrestamo.vue'

import { readPrestamo } from '@/services/supabase/prestamos/readPrestamo.js'

// Añadimos computed a las importaciones
import { ref, onMounted, computed } from 'vue'

const listaPrestamos = ref([]);
const clienteSeleccionado = ref(null)
const clientePagoSeleccionado = ref(null)

const isViewOpen = ref(false)
const showModal = ref(false)
const isDeleteOpen = ref(false)
const isPagoOpen = ref(false)

const cargando = ref(true);

// Variable para enlazar con el input del buscador
const filtroBusqueda = ref('');

// Propiedad computada para filtrar los préstamos por el nombre del cliente
const prestamosFiltrados = computed(() => {
  if (!filtroBusqueda.value) return listaPrestamos.value;
  
  const termino = filtroBusqueda.value.toLowerCase();
  return listaPrestamos.value.filter(prestamo => {
    // Unimos nombre y apellido (usando opcional chaining por si acaso) para buscar en ambos
    const nombreCompleto = `${prestamo.clientes?.nombre || ''} ${prestamo.clientes?.apellido || ''}`.toLowerCase();
    return nombreCompleto.includes(termino);
  });
});

const cargarPrestamos = async () => {
  cargando.value = true
  try {
    listaPrestamos.value = await readPrestamo();
  } catch (error) {
    console.error('Ocurrio un error: ', error)
  } finally {
    cargando.value = false;
  }
}

const abrirModalPrestamo = (cliente) => {
  isViewOpen.value = true;
  clienteSeleccionado.value = cliente
}

const abrirModalPago = (cliente) => {
  isPagoOpen.value = true
  clientePagoSeleccionado.value = cliente
}

onMounted(cargarPrestamos)
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900 h-full">
    
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-6 border-b border-zinc-800/50">
      
      <div class="relative flex items-center w-full max-w-md group">
        <div class="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.34-4.34" /></svg>
        </div>
        <input v-model="filtroBusqueda" type="text" placeholder="Buscar préstamos..."
          class="w-full pl-10 pr-4 h-11 bg-zinc-800/40 border border-zinc-700/50 rounded-xl outline-none text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-800/60 transition-all"/>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button @click="showModal = true"
          class="w-full md:w-auto bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5">
          Nuevo Préstamo
        </button>
      </div>
    </div>

    <div class="px-2 py-6">
      <div class="overflow-x-auto custom-scrollbar border border-zinc-800/50 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        
        <table class="min-w-max w-full text-sm text-zinc-400">
          
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">Cliente</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">Monto</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">Quincenas</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">Fecha</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold">Estado</th>
              <th class="py-4 px-6 text-zinc-500 text-[11px] uppercase tracking-wider font-bold text-right">Acciones</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-800/50">
            
            <tr v-for="prestamo in prestamosFiltrados" :key="prestamo.id" class="hover:bg-zinc-800/20 group transition-colors">
              <td class="py-3 px-6 text-white font-medium whitespace-nowrap">
                {{ prestamo.clientes?.nombre }} {{ prestamo.clientes?.apellido }}
              </td>
              <td class="py-3 px-6 text-white whitespace-nowrap">${{ Number(prestamo.monto).toLocaleString() }}</td>
              <td class="py-3 px-6 text-zinc-300 whitespace-nowrap">{{ prestamo.quincenas }}</td>
              <td class="py-3 px-6 text-zinc-400 whitespace-nowrap">{{ new Date(prestamo.created_at).toLocaleDateString('es-MX') }}</td>
              <td class="py-3 px-6 font-medium whitespace-nowrap" :class="prestamo.status === 'Liquidado' ? 'text-emerald-400' : 'text-orange-400'">
                {{ prestamo.status }}
              </td>
              <td class="py-3 px-6">
                <div class="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                  
                  <button @click="abrirModalPrestamo(prestamo)" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all" title="Ver">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>

                  <button @click="abrirModalPago(prestamo)" class="p-2 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all" title="Registrar Pago">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>

                </div>
              </td>

            </tr>
            <tr v-if="cargando" v-for="list in 3">
              <td class="py-4 px-6"><span class="block h-6 w-44 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-6 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-16 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-10 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-2 px-6">
                <div class="flex justify-end gap-6">
                  <span class="block h-6 w-6 animate-pulse bg-zinc-700 rounded"></span>
                  <span class="block h-6 w-6 animate-pulse bg-zinc-700 rounded"></span>
                </div>
              </td>
            </tr>
            
            <tr v-if="prestamosFiltrados.length === 0 && !cargando">
              <td colspan="6" class="py-10 text-center text-zinc-500">
                No se encontraron préstamos.
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>

  </section>
  <ModalVerPrestamo v-if="isViewOpen" :prestamo="clienteSeleccionado" @close="isViewOpen = false"/>
  <ModalPagoPrestamo v-if="isPagoOpen" :prestamo="clientePagoSeleccionado" @close="isPagoOpen = false" @pago-registrado="cargarPrestamos"/>
  <ModalDeletePrestamo v-if="isDeleteOpen" @close="isDeleteOpen = false"/>
  <ModalNewPrestamo v-if="showModal" @close="showModal = false" @inserts-close="cargarPrestamos"/>
</template>