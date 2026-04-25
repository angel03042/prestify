<!-- layouts/AuthLayout.vue -->
<template>
  <section class="relative px-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col overflow-hidden">

    <!-- Botón regresar -->
    <!-- <a href="/" class="absolute text-white text-sm font-medium flex items-center gap-2 hover:text-neutral-300 transition mb-4">
      ← Home page
    </a> -->

    <div class="flex-grow flex flex-col items-center justify-center">

      <!-- Logo -->
      <div class="flex items-center">
        <!-- <div class="w-8 h-8 flex items-center justify-center">
          ⚡
        </div> -->
        <slot name="header"></slot>
      </div>

      <!-- Card -->
      <div class="bg-white p-10 md:p-12 rounded-[2.5rem] shadow w-full max-w-[480px]">
        <slot />
      </div>

    </div>
  </section>
</template>