<script setup>
defineEmits(['close']);
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

      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Cliente -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Cliente</label>
          <select class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
            <option>Seleccionar cliente</option>
            <option>Juan Pérez</option>
            <option>María López</option>
          </select>
        </div>

        <!-- Monto -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Monto prestado</label>
          <input 
            type="number"
            placeholder="0.00"
            class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          >
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Quincenas</label>
          <select class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
            <option>Seleccione una opcion</option>
            <option>6 pagos</option>
            <option>8 pagos</option>
            <option>10 pagos</option>
            <option>12 pagos</option>
            <option>14 pagos</option>
            <option>16 pagos</option>
          </select>
        </div>

        <!-- Interés -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Pagos quincenales</label>
          <input 
            type="number"
            placeholder="Auto calculado"
            class="bg-zinc-800/30 border border-zinc-700 text-zinc-400 rounded-lg px-4 py-2.5 cursor-not-allowed"
            disabled
          >
        </div>

        <!-- Total -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Total a pagar</label>
          <input 
            type="number"
            placeholder="Auto calculado"
            class="bg-zinc-800/30 border border-zinc-700 text-zinc-400 rounded-lg px-4 py-2.5 cursor-not-allowed"
            disabled
          >
        </div>

        <!-- Botones -->
        <div class="md:col-span-2 mt-4 flex gap-3">
          <button 
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all"
          >
            Cancelar
          </button>

          <button 
            type="submit"
            class="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5"
          >
            Registrar préstamo
          </button>
        </div>

      </form>
    </div>
  </div>
</template>