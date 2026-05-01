<script setup>
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 py-6 border-b border-zinc-800/50">

      <div>
        <h1 class="text-white text-xl font-semibold">Reportes</h1>
        <p class="text-zinc-500 text-sm">Resumen general de tus préstamos</p>
      </div>

    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-2 py-6">

      <!-- Total prestado -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Total prestado</p>
        <h3 class="text-3xl text-white font-semibold mt-2">$0</h3>
      </div>

      <!-- Total recuperado -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Total recuperado</p>
        <h3 class="text-3xl text-zinc-200 font-semibold mt-2">$0</h3>
      </div>

      <!-- Ganancia -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Ganancia</p>
        <h3 class="text-3xl text-zinc-200 font-semibold mt-2">$0</h3>
      </div>

      <!-- Morosos -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Clientes morosos</p>
        <h3 class="text-3xl text-zinc-200 font-semibold mt-2">0</h3>
      </div>

    </div>

    <!-- TABLA -->
    <div class="px-2 pb-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50">

        <table class="min-w-full text-sm text-zinc-400">
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Cliente
              </th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Monto
              </th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Total a pagar
              </th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Pagado
              </th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Restante
              </th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">
                Estado
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-800/50">

            <tr class="hover:bg-zinc-800/20 transition-colors">
              <td class="py-3 px-6 text-white font-medium">
                Juan Pérez
              </td>
              <td class="py-3 px-6">$2,000</td>
              <td class="py-3 px-6">$2,800</td>
              <td class="py-3 px-6">$1,400</td>
              <td class="py-3 px-6">$1,400</td>
              <td class="py-3 px-6 text-zinc-300">
                Activo
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>

  </section>
</template>