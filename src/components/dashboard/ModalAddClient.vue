<script setup>
import { clientsServices } from '@/services/supabase/clients/insertClients.js'
import { toastSuccess, toastError } from "@/utils/alertas.js";
import { reactive, ref } from 'vue'

const emit = defineEmits(['close', 'client-added']);

const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  credito: ''
})

const loading = ref(false)

const addClients = async () => {
  if (!form.nombre || !form.apellido) return;
  loading.value = true;
  try {
    await clientsServices(form.nombre, form.apellido, form.telefono, form.credito)
    emit('client-added');
    Object.assign(form, {
      nombre: '',
      apellido: '',
      telefono: '',
      credito: ''
    })
    toastSuccess("Cliente registrado correctamente");
    emit('client-added');
    emit('close');
  } catch (error) {
    toastError("Ocurrió un error");
    console.error('Ocurio un: ', error)
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <!-- Overlay de fondo: cubre toda la pantalla y oscurece el fondo -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    <!-- Contenedor del Modal -->
    <div class="relative w-full max-w-lg bg-[#1e1e1e] border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      <!-- Botón X de cierre -->
      <button @click="$emit('close')" class="absolute top-5 right-5 text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>

      <!-- Título -->
      <h2 class="text-white text-2xl font-semibold mb-6">Agregar nuevo cliente</h2>

      <form @submit.prevent="addClients" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Nombre -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Nombre</label>
          <input v-model="form.nombre" type="text" name="nombre" placeholder="Ej. Juan"class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600" required="">
        </div>

        <!-- Apellido -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Apellido</label>
          <input v-model="form.apellido" type="text" name="apellido" placeholder="Ej. Pérez"class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600" required="">
        </div>

        <!-- Teléfono -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Teléfono</label>
          <input v-model="form.telefono" type="tel" name="telefono" placeholder="+56 9..."class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600" required="">
        </div>

        <!-- Crédito -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Crédito</label>
          <input v-model="form.credito" type="number" name="credito" placeholder="0.00"class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-zinc-600" required="">
        </div>

        <!-- Botones de Acción -->
        <div class="md:col-span-2 mt-4 flex gap-3">
          <button @click="$emit('close')"type="button" class="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
            Cancelar
          </button>
          
          <button :disabled="loading" type="submit" class="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5 disabled:opacity-50">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Agregando...
            </span>
            <span v-else>Agregar</span>
          </button>
        </div>

      </form>
    </div>
  </div>
</template>