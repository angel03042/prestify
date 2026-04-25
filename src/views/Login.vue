<!-- views/auth/LoginView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>

<template>
  <AuthLayout>

    <template #header>
      <span class="font-bold text-white tracking-wider text-lg uppercase mb-8">Prestify</span>
    </template>

    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido de nuevo!</h1>
      <p class="text-gray-400 text-sm">
        ¡Te extrañamos! Por favor, ingresa tus datos.
      </p>
    </div>

    <form class="space-y-5">
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Correo</label>
        <input type="email" placeholder="Ingrese su correo"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <div class="flex items-center justify-between text-xs">
        <label class="flex items-center gap-2 text-gray-500">
          <input type="checkbox">
          Recuérdame
        </label>
        <!-- <a href="/password" class="text-indigo-600 font-semibold">
          Recuperar contraseña
        </a> -->
      </div>

      <button class="w-full bg-indigo-500 text-white py-3 rounded-xl">
        Iniciar sesión
      </button>
    </form>

    <p class="text-center text-xs text-gray-400 mt-8">
      No tienes una cuenta?
      <router-link to="/registrarse" class="text-indigo-600 font-bold">
        Registrarse
      </router-link>
    </p>

  </AuthLayout>
</template>