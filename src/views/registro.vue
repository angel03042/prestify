<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { registerService } from '@/services/auth/register.js'
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter();

const form = reactive({
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  terminos: false
})

const mensajeError = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  mensajeError.value = '';

  if (!form.terminos) {
    mensajeError.value = 'Debes aceptar los términos.';
    return;
  }

  try {
    // Llamamos al servicio con los datos de nuestro objeto reactivo
    await registerService(form.nombre, form.apellido, form.email, form.password, form.terminos);
    // alert('¡Registro exitoso!');
    Object.assign(form, {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      terminos: false
    })
    router.push('/');
  } catch (error) {
    mensajeError.value = error.message;
  } finally {
    loading.value = false;
  }
};

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
    <form @submit.prevent="handleSubmit" class="space-y-5">

      <div class="flex gap-4 flex-col md:flex-row">
        <!-- Nombre -->
        <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Nombre</label>
            <input v-model="form.nombre" type="text" placeholder="Ingrese su nombre" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
        </div>

        <!-- Apellido -->
        <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Apellido</label>
            <input v-model="form.apellido" type="text" placeholder="Ingrese su apellido" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
        </div>
      </div>

      <!-- Correo -->
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Correo</label>
        <input v-model="form.email" type="email" placeholder="Ingrese su correo"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <!-- Password -->
      <div>
        <label class="block text-xs font-bold text-gray-700 mb-2">Contraseña</label>
        <input v-model="form.password" type="password" placeholder="Ingrese su contraseña"
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
      </div>

      <!-- Términos -->
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <input v-model="form.terminos" type="checkbox">
        <span>Acepto términos y condiciones</span>
      </div>

      <!-- Mostrar error si existe -->
      <p v-if="mensajeError" class="text-red-500 text-xs">{{ mensajeError }}</p>

      <!-- Botón -->
      <button :disabled="loading" type="submit" class="w-full bg-indigo-500 text-white py-3 rounded-xl">
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