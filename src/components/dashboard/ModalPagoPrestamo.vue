<script setup>
import { updatePrestamo } from '@/services/supabase/prestamos/updatePrestamo.js'
import { toastSuccess, toastError } from "@/utils/alertas.js";
import { ref, reactive, onMounted } from 'vue'

const props = defineProps({
  prestamo: Object // Recibe el objeto del préstamo directamente
})

const emit = defineEmits(['close', 'pago-registrado'])

const loading = ref(false)
const form = reactive({
  monto: 0,
  metodo_pago: 'Efectivo'
})

onMounted(() => {
  if (props.prestamo) {
    // Si falta solo 1 pago por realizar, sugerimos el saldo pendiente total 
    // para matar esos decimales de una vez.
    const esUltimoPago = (props.prestamo.pagos_realizados + 1) === props.prestamo.quincenas;
    
    if (esUltimoPago) {
      form.monto = props.prestamo.saldo_pendiente;
    } else {
      form.monto = props.prestamo.pagos_quincenal;
    }
  }
})

const addPago = async () => {
  if (form.monto <= 0 || !form.metodo_pago) return;
  
  loading.value = true;
  try {
    await updatePrestamo(
      props.prestamo.id, 
      form.monto, 
      form.metodo_pago, 
      props.prestamo.pagos_realizados, 
      props.prestamo.quincenas, 
      props.prestamo.saldo_pendiente,
      props.prestamo.clientes?.status
    )

    toastSuccess("Pago registrado correctamente");
    
    emit('pago-registrado');
    emit('close');
  } catch (error) {
    toastError("Error al registrar el pago");
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="relative w-full max-w-lg bg-[#1e1e1e] border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      <!-- Cerrar -->
      <button @click="$emit('close')" class="absolute top-5 right-5 text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>

      <h2 class="text-white text-2xl font-semibold mb-6">Registrar pago</h2>

      <form @submit.prevent="addPago" class="grid gap-6">
        <div class="grid grid-cols-2 gap-6">
            <!-- Cliente (Anidado) -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Cliente</span>
                <span class="text-white font-medium">
                  {{ prestamo.clientes?.nombre }} {{ prestamo.clientes?.apellido }}
                </span>
            </div>

            <!-- Cuota Fija -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Cuota quincenal</span>
                <span class="text-green-400 font-medium">
                  $ {{ Number(prestamo.pagos_quincenal).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </span>
            </div>

            <!-- Deuda actual -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Saldo pendiente</span>
                <span class="text-amber-400 font-medium">
                  $ {{ Number(prestamo.saldo_pendiente).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </span>
            </div>

            <!-- Progreso de pagos -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Pagos realizados</span>
                <span class="text-blue-400 font-medium">
                  {{ prestamo.pagos_realizados }} / {{ prestamo.quincenas }}
                </span>
            </div>
        </div>

        <!-- Monto a cobrar hoy -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Monto a pagar</label>
          <input v-model="form.monto" type="text" step="0.01" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500/50 outline-none">
        </div>

        <!-- Método -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Método de pago</label>
          <select v-model="form.metodo_pago" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 outline-none">
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <button :disabled="loading" type="submit" class="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50">
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
          <span v-else>Registrar pago</span>
        </button>
      </form>
    </div>
  </div>
</template>