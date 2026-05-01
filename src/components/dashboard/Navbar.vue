<script setup>
</script>

<template>
    <nav class="h-14 px-6 flex items-center justify-between border-b border-zinc-800 bg-neutral-900">

  <div class="flex items-center gap-3 text-zinc-300">
    <span class="text-sm text-zinc-500">Dashboard</span>
    <!-- <span class="text-zinc-600">/</span>
    <span class="font-medium text-white">Inicio</span> -->
  </div>

  <!-- <div class="hidden md:flex items-center w-full max-w-md">
    <div class="relative w-full">
      <input 
        type="text"
        placeholder="Buscar clientes..."
        class="w-full bg-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
      />
      <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"/>
      </svg>
    </div>
  </div> -->

  <div class="flex items-center gap-2 sm:gap-4">

    <!-- <button class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all" title="Ayuda">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
    </button> -->

    <!-- <button class="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"/>
      </svg>
      <span class="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-neutral-900"></span>
    </button> -->

    <div class="relative group h-full flex items-center">
      <div class="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-zinc-800 transition-colors">
        <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
          AF
        </div>
        <span class="hidden sm:block text-sm font-medium text-zinc-300">
          Angel Francisco
        </span>
        <svg class="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <div class="absolute top-full right-0 mt-1 w-48 hidden group-hover:block z-50 pt-1">
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1">
          <div class="px-4 py-2">
            <p class="text-[10px] font-bold text-zinc-500 uppercase">Cuenta</p>
            <p class="text-xs text-zinc-300 truncate">angelbenitezramirez0@gmail.com</p>
          </div>
          <!-- <router-link to="/dashboard/perfil" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Mi Perfil
          </router-link>
          <router-link to="/dashboard/ajustes" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3" stroke-width="2"/></svg>
            Ajustes
          </router-link> -->
          <!-- <div class="h-px bg-zinc-800 my-1"></div> -->
        </div>
      </div>
    </div>

  </div>
</nav>
</template>