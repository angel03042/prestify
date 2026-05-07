<script setup>
import { readClients } from '@/services/supabase/clients/readClients.js';
import { readPlan } from '@/services/supabase/planes/readPlan.js'

import { insertPrestamo } from '@/services/supabase/prestamos/insertPrestamo.js'

import { ref, onMounted, reactive, computed } from 'vue';

const emit = defineEmits(['close', 'inserts-close']);

const form = reactive({
  cliente_id: '',
  plan_id: '',
  monto: 0
})

const clientes = ref([]);
const planes = ref([]);

const loading = ref(false)

const addPrestamo = async () => {
  if (!form.cliente_id || !form.plan_id || form.monto <= 0) {
    alert("Por favor completa todos los campos");
    return;
  }

  loading.value = true;
  try {
    await insertPrestamo(
      form.cliente_id, 
      form.monto, 
      totalAPagar.value, 
      planSeleccionado.value.quincenas, 
      cuotaQuincenal.value
    );
    
    // Limpiar formulario
    Object.assign(form, {
      cliente_id: '',
      plan_id: '',
      monto: 0
    });

    emit('inserts-close'); // Este evento debe recargar tu tabla de préstamos
    emit('close');
  } catch (error) {
    alert(error.message);
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}

onMounted( async () => {
  try {
    const [resClientes, resPlanes] = await Promise.all([readClients(), readPlan()])
    clientes.value = resClientes;
    planes.value = resPlanes;
  } catch (error) {
    console.error('Ocurrio un: ', error)
  }
})

const clientesInactivos = computed(() => {
  return clientes.value.filter(cliente => cliente.status === 'Inactivo')
})

const clienteSeleccionado = computed(() => {
  return clientes.value.find(p => p.id === form.cliente_id)
})

const validarMonto = () => {
  if (!clienteSeleccionado.value) return

  const max = clienteSeleccionado.value.credito

  if (Number(form.monto) > max) {
    form.monto = max
  }
}

// Lógica de cálculo
const planSeleccionado = computed(() => {
  return planes.value.find(p => p.id === form.plan_id);
});

const totalAPagar = computed(() => {
  if (!form.monto || !planSeleccionado.value) return 0;
  return form.monto * planSeleccionado.value.multiplicador;
});

const cuotaQuincenal = computed(() => {
  if (!totalAPagar.value || !planSeleccionado.value) return 0;
  return totalAPagar.value / planSeleccionado.value.quincenas;
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    <div class="relative w-full max-w-xl bg-[#1e1e1e] border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      <!-- Cerrar -->
      <button @click="$emit('close')" class="absolute top-5 right-5 text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>

      <!-- Título -->
      <h2 class="text-white text-2xl font-semibold mb-6">Registrar préstamo</h2>

      <form @submit.prevent="addPrestamo" class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Cliente -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Cliente</label>
          <select v-model="form.cliente_id" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
            <option value="" disabled>Seleccione un cliente</option>
            <option v-for="cliente in clientesInactivos" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }} {{ cliente.apellido }}</option>
          </select>
        </div>

        <!-- Monto -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Monto prestado <span v-if="form.cliente_id" class="text-green-400 ml-4">${{ clienteSeleccionado?.credito }}</span></label>
          <input v-model="form.monto" @input="validarMonto" type="number" placeholder="0.00" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Quincenas</label>
          <select v-model="form.plan_id" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
            <option value="" disabled>Seleccione una opcion</option>
            <option v-for="plan in planes" :key="plan.id" :value="plan.id">{{ plan.nombre }}</option>
          </select>
        </div>

        <!-- pagos -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Pagos quincenales</label>
          <input :value="cuotaQuincenal.toFixed(2)" type="text" placeholder="Auto calculado" class="bg-zinc-800/30 border border-zinc-700 text-zinc-400 rounded-lg px-4 py-2.5 cursor-not-allowed" disabled>
        </div>

        <!-- Total -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Total a pagar</label>
          <input :value="totalAPagar.toFixed(2)" type="text" placeholder="Auto calculado" class="bg-zinc-800/30 border border-zinc-700 text-zinc-400 rounded-lg px-4 py-2.5 cursor-not-allowed" disabled>
        </div>

        <!-- Botones -->
        <div class="md:col-span-2 mt-4 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
            Cancelar
          </button>

          <button :disabled="loading" type="submit" class="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
            Registrar préstamo
          </button>
        </div>

      </form>
    </div>
  </div>
</template>