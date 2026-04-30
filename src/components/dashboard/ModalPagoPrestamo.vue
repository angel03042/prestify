<script setup>
import { ref } from 'vue'

defineEmits(['close'])

const monto = ref('')
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

      <form @submit.prevent="" class="grid gap-6">

        <div  class="grid grid-cols-2 gap-6">
            <!-- Cliente -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Cliente</span>
                <span class="text-white font-medium">Juan Pérez</span>
            </div>

            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Pago</span>
                <span class="text-green-400 font-medium">$ 275</span>
            </div>

            <!-- Deuda actual -->
            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Saldo pendiente</span>
                <span class="text-amber-400 font-medium">$1,200</span>
            </div>

            <div class="flex flex-col gap-1">
                <span class="text-zinc-500 text-sm">Pagos realizados</span>
                <span class="text-blue-400 font-medium">2/8</span>
            </div>
        </div>
        
        

        <!-- Monto -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Monto a pagar</label>
          <input 
            v-model="monto"
            type="number" 
            placeholder="0.00"
            class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-zinc-600"
          >
        </div>

        <!-- Método -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Método de pago</label>
          <select class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
            <option>Efectivo</option>
            <option>Transferencia</option>
          </select>
        </div>

        <!-- Botones -->
        <div class="mt-4 flex gap-3">
          <button @click="$emit('close')" type="button"
            class="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
            Cancelar
          </button>

          <button type="submit"
            class="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98]">
            Registrar Pago
          </button>
        </div>

      </form>

    </div>
  </div>
</template>