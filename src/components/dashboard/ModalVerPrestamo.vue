<script setup>
import { verPrestamo } from '@/services/supabase/prestamos/verPrestamo.js'
import { computed } from 'vue'

const props = defineProps({
  cliente: Object
})

defineEmits(['close'])
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

      <h2 class="text-white text-2xl font-semibold mb-6">Detalle del préstamo</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        
        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Cliente</span>
          <span class="text-white font-medium">{{ cliente.nombre }} {{ cliente.apellido }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Prestamo</span>
          <span class="text-white font-medium">$ {{ Number(cliente.prestamos?.monto).toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Total a pagar</span>
          <span class="text-white font-medium">$ {{ Number(cliente.prestamos?.total_pagar).toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Quincenas</span>
          <span class="text-white font-medium">{{ cliente.prestamos?.quincenas }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Saldo restante</span>
          <span class="text-amber-400 font-medium">$ {{ Number(cliente.prestamos?.saldo_pendiente).toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Pagos</span>
          <span class="text-white">$ {{ Number(cliente.prestamos?.pagos_quincenal).toLocaleString() }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Fecha</span>
          <span class="text-white">{{ new Date(cliente.created_at).toLocaleDateString('es-MX', {year: 'numeric', month: 'long',day: 'numeric'}) }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-zinc-500">Estado</span>
          <span class="text-emerald-400 font-medium">{{ cliente.prestamos.status }}</span>
        </div>

      </div>

      <!-- Footer -->
      <div class="mt-8 flex">
        <button @click="$emit('close')" class="w-full bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
          Cerrar
        </button>
      </div>

    </div>
  </div>
</template>