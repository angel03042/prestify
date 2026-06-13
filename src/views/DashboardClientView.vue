<script setup>
import ModalAddClient from '@/components/dashboard/ModalAddClient.vue';
import ModalUpdateClient from '@/components/dashboard/ModalUpdateClient.vue'
import ModalDelete from '@/components/dashboard/ModalDeleteClient.vue'

import { readClients } from '@/services/supabase/clients/readClients.js'

import { ref, onMounted, computed } from 'vue';

const filtroNombre = ref('');

const showModal = ref(false);
const isDeleteModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const clienteSeleccionado = ref(null);
const clienteAEliminar = ref(null);

const listaClientes = ref([]);
const cargando = ref(true);

const clientesFiltrados = computed(() => {
  if (!filtroNombre.value) return listaClientes.value;
  
  return listaClientes.value.filter(cliente => 
    cliente.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase()) ||
    cliente.apellido.toLowerCase().includes(filtroNombre.value.toLowerCase())
  );
});

const abrirModalUpdate = (cliente) => {
  clienteSeleccionado.value = cliente;
  isUpdateModalOpen.value = true
}

const abrirModalDelete = (cliente) => {
  clienteAEliminar.value = cliente;
  isDeleteModalOpen.value = true;
};

const cargarClientes = async () => {
  cargando.value = true;
  try {
    const data = await readClients();
    listaClientes.value = data;
  } catch (error) {
    console.error("Error al cargar clientes:", error);
  } finally {
    cargando.value = false;
  }
};

// 3. Ejecutar al cargar la página
onMounted(cargarClientes);
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900 h-full">
    
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-6 border-b border-zinc-800/50">
      
      <div class="relative flex items-center w-full max-w-md group">
        <div class="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.34-4.34" />
          </svg>
        </div>
        <input v-model="filtroNombre" class="w-full pl-10 pr-4 h-11 bg-zinc-800/40 border border-zinc-700/50 rounded-xl outline-none text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-800/60 transition-all" type="text" placeholder="Buscar clientes..."/>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <button @click="showModal = true" type="button" class="w-full md:w-auto flex-1 md:flex-none bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5">
          Agregar Cliente
        </button>
      </div>

    </div>

    <div class="px-2 py-6">
      <div class="overflow-x-auto custom-scrollbar border border-zinc-800/50 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        
        <table class="min-w-max w-full text-sm text-zinc-400">
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500">
                Información del Cliente
              </th>
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500">
                Telefono
              </th>
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500">
                Credito
              </th>
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500">
                Prestamo
              </th>
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500">
                Estado
              </th>
              <th class="py-4 px-6 font-bold uppercase tracking-wider text-[11px] text-zinc-500 text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-800/50">
            <tr v-for="cliente in clientesFiltrados" :key="cliente.id" class="hover:bg-zinc-800/20 transition-colors group">
              <td class="py-3 px-6">
                <p class="text-white font-semibold whitespace-nowrap">{{ cliente.nombre }} {{ cliente.apellido }}</p>
              </td>
              <td class="py-3 px-6 text-zinc-200 font-medium whitespace-nowrap">{{ cliente.telefono }}</td>
              <td class="py-3 px-6 text-emerald-500 font-medium whitespace-nowrap">$ {{ Number(cliente.credito).toLocaleString() }}</td>
              <td class="py-3 px-6 whitespace-nowrap">
                <span v-if="cliente.prestamos && cliente.prestamos.length > 0" class="text-zinc-100 font-medium">
                  $ {{ Number(cliente.prestamos[0].monto).toLocaleString() }}
                </span>
                <span v-else class="text-zinc-600 italic text-sm">
                  Sin deuda
                </span>
              </td>
              <td class="py-3 px-6 font-medium whitespace-nowrap" :class="cliente.status == 'Inactivo'? 'text-orange-400' : 'text-emerald-400 '">{{ cliente.status }}</td>
              
              <td class="py-3 px-6">
                <div class="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                  <button @click="abrirModalUpdate(cliente)" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </button>
                  <button @click="abrirModalDelete(cliente)" class="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="cargando" v-for="list in 3">
              <td class="py-4 px-6"><span class="block h-6 w-44 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-20 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-10 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-2 px-6">
                <div class="flex justify-end gap-6">
                  <span class="block h-6 w-6 animate-pulse bg-zinc-700 rounded"></span>
                  <span class="block h-6 w-6 animate-pulse bg-zinc-700 rounded"></span>
                </div>
              </td>
            </tr>

            <tr v-if="listaClientes.length === 0 && !cargando">
              <td colspan="6" class="py-10 text-center text-zinc-500">
                No se encontraron clientes.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <ModalAddClient v-if="showModal" @close="showModal = false" @client-added="cargarClientes"/>
  <ModalDelete v-if="isDeleteModalOpen" :cliente="clienteAEliminar" @close="isDeleteModalOpen = false" @client-deleted="cargarClientes"/>
  <ModalUpdateClient v-if="isUpdateModalOpen" :cliente="clienteSeleccionado" @close="isUpdateModalOpen = false" @client-updated="cargarClientes"/>
</template>