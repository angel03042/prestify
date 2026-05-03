<script setup>
import { deleteClient } from '@/services/supabase/clients/deleteClients.js';
import { ref } from 'vue'

const props = defineProps({
    cliente: Object
});

const emit = defineEmits(['close', 'client-deleted']);
const loading = ref(false);

const confirmDelete = async () => {
  if (!props.cliente?.id) return;
  
  loading.value = true;
  try {
    await deleteClient(props.cliente.id);
    emit('client-deleted');
    emit('close');
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("No se pudo eliminar el cliente");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-neutral-900 border border-zinc-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
    
    <div class="flex justify-center mb-6">
      <div class="w-16 h-16 bg-red-500/10 rounded-[1.5rem] flex items-center justify-center text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
      </div>
    </div>

    <div class="text-center space-y-2 mb-8">
      <h3 class="text-xl font-bold text-white tracking-tight">¿Eliminar cliente?</h3>
      <p class="text-sm text-zinc-500 leading-relaxed px-2">
        Esta acción no se puede deshacer. El cliente se borrará permanentemente de tu inventario.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <button :disabled="loading" @click="confirmDelete" class="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-sm hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20">
        Sí, eliminar cliente
      </button>
      <button 
        @click="$emit('close')"
        class="w-full py-4 text-zinc-500 font-bold text-sm hover:text-white transition-all"
        onclick="toggleModal('modal-delete-product')"
      >
        Cancelar
      </button>
    </div>

  </div>
    </div>
</template>