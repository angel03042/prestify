<script setup></script>

<template>
  <section class="space-y-10 p-2">
    <div>
      <h1 class="flex items-center gap-2 text-2xl font-semibold text-white">
        Hola, <span>Usuario</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-sparkles text-amber-300"
        >
          <path
            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"
          />
        </svg>
      </h1>
      <p class="text-zinc-400 mt-1">
        Aquí tienes un resumen de tus prestamos hoy
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div
        class="group border border-zinc-700/50 rounded-2xl p-6 hover:border-zinc-400 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <span
            class="p-2 bg-zinc-700/30 rounded-lg text-zinc-400 group-hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-wallet"
            >
              <path
                d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
              />
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
          </span>
        </div>
        <p class="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Total Recuperado
        </p>
        <h3 class="text-4xl font-bold text-white mt-1">$0</h3>
      </div>

      <div
        class="group border border-zinc-700/50 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-hand-coins"
            >
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
              <path
                d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-5.4a2 2 0 0 0-1.2-3.3c-.6 0-1.1.2-1.5.7L15 14"
              />
              <path d="M11 9c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z" />
              <path d="M7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
            </svg>
          </span>
        </div>
        <p class="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Total prestado
        </p>
        <h3 class="text-4xl font-bold text-amber-500 mt-1">$0</h3>
      </div>

      <div
        class="group border border-zinc-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-receipt"
            >
              <path
                d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"
              />
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
              <path d="M12 17.5V6.5" />
            </svg>
          </span>
        </div>
        <p class="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Por cobrar
        </p>
        <h3 class="text-4xl font-bold text-blue-500 mt-1">$0</h3>
      </div>

      <div
        class="group border border-zinc-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
      >
        <div class="flex items-center justify-between mb-4">
          <span class="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
        </div>
        <p class="text-xs uppercase tracking-widest text-zinc-500 font-bold">
          Clientes
        </p>
        <h3 class="text-4xl font-bold text-emerald-500 mt-1">0</h3>
      </div>
    </div>

    <div>
      <h2
        class="text-sm uppercase tracking-[0.2em] font-bold text-zinc-500 mb-5"
      >
        Operaciones
      </h2>
      <div class="flex flex-wrap gap-4">
        <router-link
          to="/dashboard/clientes"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
          Nuevo cliente
        </router-link>

        <router-link
          to="/dashboard/prestamos"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-white text-sm font-semibold border border-zinc-700 hover:bg-zinc-700 transition-all active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-banknote"
          >
            <rect width="20" height="12" x="2" y="6" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
          Registrar prestamo
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div class="bg-neutral-900 border border-zinc-800 rounded-2xl p-7">
        <h3 class="text-white font-bold mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-history text-zinc-500"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
          </svg>
          Actividad del Sistema
        </h3>

        <div
          class="relative space-y-6 before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-zinc-700 before:via-zinc-800 before:to-transparent"
        >
          <div class="relative flex items-center justify-between pl-8 group">
            <span
              class="absolute left-0 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 group-hover:border-white transition-colors"
            ></span>
            <div class="flex flex-col">
              <span class="text-sm text-zinc-200 font-medium"
                >Prestamo de $500 a “Juan Perez”</span
              >
              <span class="text-xs text-zinc-500">Logística e inventario</span>
            </div>
            <span class="text-[10px] uppercase font-bold text-zinc-600"
              >hace 2h</span
            >
          </div>

          <div class="relative flex items-center justify-between pl-8 group">
            <span
              class="absolute left-0 w-4 h-4 rounded-full bg-red-500/20 border-2 border-red-500/50"
            ></span>
            <div class="flex flex-col">
              <span class="text-sm text-zinc-200 font-medium"
                >Cliente con pago atrasado</span
              >
              <span class="text-xs text-red-500/70 font-medium"
                >Requiere atención</span
              >
            </div>
            <span class="text-[10px] uppercase font-bold text-zinc-600"
              >ayer</span
            >
          </div>

          <div class="relative flex items-center justify-between pl-8 group">
            <span
              class="absolute left-0 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600"
            ></span>
            <div class="flex flex-col">
              <span class="text-sm text-zinc-200 font-medium"
                >Pago recibido de "Maria Lopez"</span
              >
              <span class="text-xs text-zinc-500">Comprobante generado</span>
            </div>
            <span class="text-[10px] uppercase font-bold text-zinc-600"
              >2 días</span
            >
          </div>
        </div>
      </div>

      <div
        class="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl"
      >
        <div class="relative z-10">
          <div
            class="mb-4 inline-flex px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider"
          >
            Actualizacion | Proximamente
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">
            Como van tus prestamos hoy?
          </h3>
          <p class="text-indigo-100 text-sm leading-relaxed max-w-[280px]">
            Visualiza reportes detallados de ganancias, clientes y pagos.
          </p>
        </div>

        <router-link to="/dashboard/reportes"
          class="relative z-10 mt-8 self-start px-6 py-2.5 rounded-xl bg-white text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition-all shadow-lg"
        >
          Ver reportes
        </router-link>

        <div
          class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
        ></div>
        <div class="absolute right-4 top-4 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-globe"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path
              d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
