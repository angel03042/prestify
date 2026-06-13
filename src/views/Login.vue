<!-- views/auth/LoginView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { loginService } from '@/services/auth/login.js';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const message = ref('')

const handleSubmit = async () => {
  if (loading.value) return // Evita múltiples clics accidentales
  
  loading.value = true
  message.value = ''
  
  try {
    const response = await loginService(form.email, form.password)

    router.push('/dashboard')
  } catch (error) {
    if (error.message.includes('Invalid login credentials')) {
      message.value = 'El correo o la contraseña son incorrectos.'
    } else {
      message.value = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

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

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Correo</label>
        <input v-model="form.email" type="email" placeholder="Ingrese su correo"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Contraseña</label>
        <input v-model="form.password" type="password" placeholder="Ingrese su contraseña"
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

      <p v-if="message" class="text-red-500 text-xs">{{ message }}</p>
      <button :disabled="loading" type="submit" :class="loading ? 'opacity-70' : 'opacity-100'" class="w-full bg-indigo-500 text-white py-3 rounded-xl">
        {{ loading ? "Iniciando sesion..." : "Iniciar sesión" }}
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