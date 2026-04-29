<script setup></script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-2 py-6 border-b border-zinc-800/50">
      <div class="relative flex items-center w-full max-w-md group">
        <div class="absolute left-3 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.34-4.34" />
          </svg>
        </div>
        <input class="w-full pl-10 pr-4 h-11 bg-zinc-800/40 border border-zinc-700/50 rounded-xl outline-none text-sm text-white placeholder:text-zinc-500 focus:border-zinc-500 focus:bg-zinc-800/60 transition-all" type="text" placeholder="Buscar clientes..."/>
      </div>

      <div class="flex items-center gap-3 w-full md:w-auto">
        <!-- <button type="button" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-700 hover:text-white transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 13v4" /><path d="M15 5v4" /><path d="M3 3v16a2 2 0 0 0 2 2h16" /><rect x="7" y="13" width="9" height="4" rx="1" /><rect x="7" y="5" width="12" height="4" rx="1" /></svg>
          Categoría
        </button>

        <button type="button" class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-800 text-zinc-300 border border-zinc-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-700 hover:text-white transition-all active:scale-95">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"/>
          </svg>
          Filtrar
        </button> -->

        <button type="button" class="flex-1 md:flex-none bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5">
          Agregar Cliente
        </button>
      </div>
    </div>

    <div class="px-2 py-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        <table class="min-w-full text-sm text-zinc-400">
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
            <tr class="hover:bg-zinc-800/20 transition-colors group">
              <td class="py-2 px-6">
                <p class="text-white font-semibold">Angel Francisco Benitez Ramirez</p>
              </td>
              <td class="py-4 px-6 text-zinc-200 font-medium">9331244508</td>
              <td class="py-4 px-6 text-emerald-500 font-medium">$3,000</td>
              <td class="py-4 px-6">$1,500</td>
              <td class="py-4 px-6 text-emerald-400 font-medium">Corriente</td>
              <td class="py-4 px-6">
                <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onclick="openProductDrawer('edit', { id: ${p.id}, name: '${p.nombre}', categoria: '${p.categoria_id}', stock: '${p.stock}', precio: '${p.precio}', precio_venta: '${p.precio_venta}', ganancia: '${p.ganancia}', status: ${p.status}, imagen: '${p.imagen}' })" class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  </button>
                  <button onclick="prepareDelete('${p.id}', '${p.nombre}')" class="deleteProduct p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                  <button class="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Imprimir">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 6 2 18 2 18 9"></polyline>
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
