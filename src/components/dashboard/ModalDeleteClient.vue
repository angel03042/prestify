<script setup>
import { deleteClient } from '@/services/supabase/clients/deleteClients.js';
import { updateStatusClient } from '@/services/supabase/clients/updateClients.js';
import { ref } from 'vue'

const props = defineProps({
    cliente: Object
});

const mensajeEliminar = ref(`¿Está seguro que desea eliminar al cliente "${props.cliente?.nombre} ${props.cliente?.apellido}"? Esta acción no se puede deshacer. Los clientes con préstamos activos o historial de préstamos no pueden ser eliminados.`);
const mensajeBloquear = ref(`El cliente "${props.cliente?.nombre} ${props.cliente?.apellido}" no podrá solicitar nuevos préstamos mientras permanezca bloqueado. Sus préstamos activos e historial permanecerán sin cambios y podrá seguir registrando pagos.`);
const mensajeDesbloquear = ref(`El cliente "${props.cliente?.nombre} ${props.cliente?.apellido}" podrá solicitar nuevos préstamos y continuar con sus actividades normalmente.`);

const emit = defineEmits(['close', 'client-deleted']);
const loading = ref(false);

const tienePrestamoActivo = props.cliente?.prestamos?.some(
  prestamo => prestamo.status === 'Activo'
);

const confirmDelete = async (status) => {
  if (!props.cliente?.id) return;

  loading.value = true;

  try {
    if (status === 'Activo') {
      // Activo -> Bloqueado
      await updateStatusClient(props.cliente.id, 'Bloqueado');

    } else if (status === 'Bloqueado') {
      // ¿Tiene algún préstamo activo?
      const tienePrestamoActivo = props.cliente?.prestamos?.some(
        prestamo => prestamo.status === 'Activo'
      );

      if (tienePrestamoActivo) {
        // Si tiene préstamo activo, vuelve a Activo
        await updateStatusClient(props.cliente.id, 'Activo');
      } else {
        // Si no tiene préstamo activo (aunque tenga historial), pasa a Inactivo
        await updateStatusClient(props.cliente.id, 'Inactivo');
      }

    } else {
      // Inactivo -> Eliminar
      await deleteClient(props.cliente.id);
    }

    emit('client-deleted');
    emit('close');

  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("No se pudo eliminar el cliente");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-neutral-900 border border-zinc-800 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
    
    <div class="flex justify-center mb-6">
      <div class="w-16 h-16 rounded-[1.5rem] flex items-center justify-center" :class="{
        'text-red-500 bg-red-500/10': props.cliente.status === 'Inactivo',
        'text-amber-500 bg-amber-500/10': props.cliente.status === 'Activo',  
        'text-emerald-500 bg-emerald-500/10': props.cliente.status === 'Bloqueado',
      }">
        <template v-if="props.cliente.status === 'Inactivo'">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
        </template>
        <template v-if="props.cliente.status === 'Activo'">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </template>
        <template v-if="props.cliente.status === 'Bloqueado'">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect width="18" height="12" x="3" y="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 9.33-2.5"/></svg>
        </template>
      </div>
    </div>

    <div class="text-center space-y-2 mb-8">
      <h3 class="text-xl font-bold text-white tracking-tight">¿{{ props.cliente?.status === 'Activo' ? 'Bloquear' : props.cliente?.status === 'Bloqueado' ? 'Desbloquear' : 'Eliminar' }} cliente?</h3>
      <p class="text-sm text-zinc-500 leading-relaxed px-2">
        {{ props.cliente?.status === 'Activo' ? mensajeBloquear : props.cliente?.status === 'Bloqueado' ? mensajeDesbloquear : mensajeEliminar }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <button :disabled="loading" @click="confirmDelete(props.cliente.status)" class="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-sm hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20">
        Sí, {{ props.cliente?.status === 'Activo' ? 'bloquear' : props.cliente?.status === 'Bloqueado' ? 'desbloquear' : 'eliminar' }} cliente
      </button>
      <button @click="$emit('close')" class="w-full py-4 text-zinc-500 font-bold text-sm hover:text-white transition-all" onclick="toggleModal('modal-delete-product')">
        Cancelar
      </button>
    </div>

  </div>
    </div>
</template>