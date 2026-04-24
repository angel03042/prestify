<!-- layouts/AuthLayout.vue -->
<template>
  <section class="relative bg-black min-h-screen flex flex-col p-8 overflow-hidden">

    <!-- Botón regresar -->
    <!-- <a href="/" class="absolute text-white text-sm font-medium flex items-center gap-2 hover:text-neutral-300 transition mb-4">
      ← Home page
    </a> -->

    <div class="flex-grow flex flex-col items-center justify-center">

      <!-- Logo -->
      <div class="flex items-center mb-8">
        <!-- <div class="w-8 h-8 flex items-center justify-center">
          ⚡
        </div> -->
        <span class="font-bold text-white tracking-wider text-lg uppercase">Prestify</span>
      </div>

      <!-- Card -->
      <div class="bg-white p-10 md:p-12 rounded-[2.5rem] shadow w-full max-w-[480px]">
        <slot />
      </div>

    </div>
  </section>
</template>