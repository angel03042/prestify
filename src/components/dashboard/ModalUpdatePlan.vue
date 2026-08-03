<script setup>
import { updatePlan } from '@/services/supabase/planes/updatePlan.js'
import { ref, computed, reactive, onMounted } from 'vue';

const props = defineProps({
  planes: Object
})

const emit = defineEmits(['close', 'updated-close']);

const form = reactive({
  nombre: '',
  quincenas: '',
  interes: 0,
})

const loading = ref(false);

onMounted(() => {
  if(props.planes) {
    form.nombre = props.planes.nombre,
    form.quincenas = props.planes.quincenas,
    form.interes = props.planes.interes
  }
})

const multiplicador = computed(() => {
  const i = parseFloat(form.interes);
  if (isNaN(i) || i === 0) return '1.00';
  return (1 + (i / 100)).toFixed(2);
});

const update = async () => {
  loading.value = true
  try {
    await updatePlan(props.planes.id, form.nombre, form.quincenas, form.interes, multiplicador.value);
    Object.assign(form, {
      nombre: '',
      quincenas: '',
      interes: '',
    })
    emit('updated-close')
    emit('close')
  } catch (error) {
    console.error('Ocurrio un: ', error)
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    
    <div class="relative w-full max-w-lg bg-[#1e1e1e] border border-white/10 p-8 rounded-2xl shadow-2xl">
      
      <!-- Cerrar -->
      <button @click="$emit('close')" class="absolute top-5 right-5 text-zinc-500 hover:text-white p-2 hover:bg-white/5 rounded-lg transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>

      <!-- Título -->
      <h2 class="text-white text-2xl font-semibold mb-6">Actualizar plan de préstamo</h2>

      <form @submit.prevent="update" class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Nombre -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Nombre del plan</label>
          <input v-model="form.nombre" type="text" placeholder="Ej. Plan 12 quincenas" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
        </div>

        <!-- Quincenas -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Quincenas</label>
          <input v-model="form.quincenas" type="number" placeholder="Ej. 12" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
        </div>

        <!-- Interés -->
        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Interés (%)</label>
          <input v-model="form.interes" type="text" placeholder="Ej. 50" class="bg-zinc-800/50 border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
        </div>

        <!-- Multiplicador -->
        <div class="flex flex-col gap-2 md:col-span-2">
          <label class="text-zinc-400 text-sm font-medium ml-1">Multiplicador</label>
          <input :value="multiplicador" type="text" class="bg-zinc-800/30 border border-zinc-700 text-zinc-400 rounded-lg px-4 py-2.5 cursor-not-allowed" disabled>
          <span class="text-xs text-zinc-500 ml-1">
            Se calcula automáticamente (Ej: 1.5 = +50%)
          </span>
        </div>

        <!-- Botones -->
        <div class="md:col-span-2 mt-4 flex gap-3">
          <button type="button" @click="$emit('close')" class="flex-1 bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl hover:bg-zinc-700 hover:text-white transition-all">
            Cancelar
          </button>

          <button :disabled="loading" type="submit" class="flex-[2] bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-lg shadow-white/5">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Actualizando...
            </span>
            <span v-else>Actualizar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>