<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
</script>

<template>
  <AuthLayout>

    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">¡Regístrate!</h1>
      <p class="text-gray-400 text-sm">
        Crea tu cuenta ingresando tus datos.
      </p>
    </div>

    <!-- Formulario -->
    <form class="space-y-5">

      <div class="flex gap-4 flex-col md:flex-row">
        <!-- Nombre -->
        <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Nombre</label>
            <input type="text" placeholder="Ingrese su nombre" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
        </div>

        <!-- Apellido -->
        <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Apellido</label>
            <input type="text" placeholder="Ingrese su apellido" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
        </div>
      </div>

      <!-- Correo -->
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Correo</label>
        <input type="email" placeholder="Ingrese su correo"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <!-- Password -->
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <!-- Términos -->
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <input type="checkbox">
        <span>Acepto términos y condiciones</span>
      </div>

      <!-- Botón -->
      <button class="w-full bg-indigo-500 text-white py-3 rounded-xl">
        Registrarse
      </button>

    </form>

    <!-- Footer -->
    <p class="text-center text-xs text-gray-400 mt-8">
      ¿Ya tienes una cuenta?
      <router-link to="/" class="text-indigo-600 font-bold">
        Iniciar sesión
      </router-link>
    </p>

  </AuthLayout>
</template>