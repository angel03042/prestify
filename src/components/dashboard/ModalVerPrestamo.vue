<script setup>
import { computed, ref } from 'vue'
import { generateReceiptPDF } from '@/utils/generateReceipt.js'
import { toastSuccess, toastError } from "@/utils/alertas.js"

const props = defineProps({
  prestamo: Object
})

defineEmits(['close'])

const loading = ref(false)

// Opcional: Una pequeña validación para evitar errores de renderizado
const p = computed(() => props.prestamo);
const c = computed(() => props.prestamo?.clientes);

const descargar = async () => {
  if (!p.value || !c.value) return;

  loading.value = true;

  try {
    generateReceiptPDF(p.value, c.value);
    toastSuccess("Recibo generado correctamente");
  } catch (error) {
    toastError("Error al generar el recibo");
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    <div class="relative w-full max-w-lg bg-[#1e1e1e] border border-white/10 p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
      
      <!-- Botón Cerrar -->
      <button @click="$emit('close')" class="absolute top-5 right-5 text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>

      <h2 class="text-white text-2xl font-semibold mb-6">Detalle del préstamo</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        
        <!-- Cliente -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Cliente</span>
          <span class="text-white font-medium">
            {{ c?.nombre }} {{ c?.apellido }}
          </span>
        </div>

        <!-- Monto Prestado -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Monto prestado</span>
          <span class="text-white font-medium">
            $ {{ Number(p?.monto).toLocaleString() }}
          </span>
        </div>

        <!-- Total a Pagar -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Total a pagar</span>
          <span class="text-white font-medium">
            $ {{ Number(p?.total_pagar).toLocaleString() }}
          </span>
        </div>

        <!-- Cuotas / Quincenas -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Quincenas</span>
          <span class="text-white font-medium">
            {{ p?.pagos_realizados }} / {{ p?.quincenas }}
          </span>
        </div>

        <!-- Saldo Pendiente -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Saldo pendiente</span>
          <span class="text-amber-400 font-medium">
            $ {{ Number(p?.saldo_pendiente).toLocaleString() }}
          </span>
        </div>

        <!-- Pago Quincenal -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Cuota quincenal</span>
          <span class="text-white font-medium">
            $ {{ Number(p?.pagos_quincenal).toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </span>
        </div>

        <!-- Fecha de creación -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Fecha de registro</span>
          <span class="text-white">
            {{ new Date(p?.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) }}
          </span>
        </div>

        <!-- Estado del préstamo -->
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Estado</span>
          <span :class="p?.status === 'Pagado' ? 'text-emerald-400' : 'text-amber-400'" class="font-medium">
            {{ p?.status }}
          </span>
        </div>

      </div>

      <!-- Footer -->
      <div class="mt-8 flex gap-4">
        <button @click="$emit('close')" class="w-full bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
          Cerrar detalle
        </button>
        <button :disabled="loading" @click="descargar" class="w-full bg-neutral-200 text-black hover:bg-neutral-100 font-semibold py-3 rounded-xl transition-all">
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando...
          </span>
          <span v-else>Descargar recibo</span>
        </button>
      </div>

    </div>
  </div>
</template>