<script setup>
import { getReportData } from '@/services/supabase/reportes/reports.js'
import { generateReceiptPDF } from '@/utils/generateReceipt.js'
import { toastSuccess, toastError } from "@/utils/alertas.js";
import { ref, onMounted, computed } from 'vue'

const prestamos = ref([])
const cargando = ref(true)

const loading = ref(false)

const cargarReportes = async () => {
  try {
    prestamos.value = await getReportData()
  } catch (error) {
    console.error('Error al cargar reportes:', error)
  } finally {
    cargando.value = false
  }
}

// KPI 1: Total de capital entregado (Inversión inicial)
const totalPrestado = computed(() => {
  return prestamos.value.reduce((acc, curr) => acc + (curr.monto || 0), 0)
})

// KPI 2: Total recuperado (Capital + Interés que ya entró a caja)
const totalRecuperado = computed(() => {
  return prestamos.value.reduce((acc, curr) => {
    return acc + (curr.pagos_realizados * curr.pagos_quincenal)
  }, 0)
})

// KPI 3: Ganancia Proyectada (Lo que ganarás cuando todos terminen de pagar)
const gananciaProyectada = computed(() => {
  return prestamos.value.reduce((acc, curr) => {
    return acc + (curr.total_pagar - curr.monto)
  }, 0)
})

// KPI 4: GANANCIA OBTENIDA (El interés real cobrado hasta hoy)
const gananciaReal = computed(() => {
  return prestamos.value.reduce((acc, curr) => {
    const interesTotal = curr.total_pagar - curr.monto;
    const interesPorQuincena = interesTotal / curr.quincenas;
    const ganado = interesPorQuincena * curr.pagos_realizados;
    return acc + ganado;
  }, 0).toFixed(2); // Forzamos 2 decimales al final
});

const descargar = async (p, c) => {
  if (!p || !c) return;

  loading.value = true;

  try {
    generateReceiptPDF(p, c);
    toastSuccess("Recibo descargado correctamente");
  } catch (error) {
    console.error(error);
    toastError("Error al descargar el recibo");
  } finally {
    loading.value = false;
  }
};
onMounted(cargarReportes)
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900 h-full">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4 py-6 border-b border-zinc-800/50">
      <div class="text-left w-full">
        <h1 class="text-white text-xl font-semibold">Reportes</h1>
        <p class="text-zinc-500 text-sm">Resumen financiero detallado</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-4 py-6">
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total Prestado</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-white font-semibold mt-2">${{ totalPrestado.toLocaleString() }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total (Recuperado)</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-blue-400 font-semibold mt-2">${{ Number(totalRecuperado).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Interés Proyectado</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-indigo-400 font-semibold mt-2">${{ gananciaProyectada.toLocaleString() }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 border-l-emerald-500/50 border-l-4 shadow-sm">
        <p class="text-xs text-emerald-500 uppercase font-bold tracking-wider">Ganancia Real (Cobrada)</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-emerald-400 font-semibold mt-2">${{ Number(gananciaReal).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</h3>
      </div>
    </div>

    <div class="px-4 pb-6">
      <div class="overflow-x-auto custom-scrollbar border border-zinc-800/50 rounded-2xl bg-zinc-900/50 backdrop-blur-sm">
        <table class="min-w-max w-full text-sm text-zinc-400">
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Cliente</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Monto</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Total a pagar</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Cuota Q.</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Progreso</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider">Estatus</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/50">
            <tr v-for="item in prestamos" :key="item.id" class="hover:bg-zinc-800/20 transition-colors">
              <td class="py-3 px-6 text-white font-medium whitespace-nowrap">
                {{ item.clientes?.nombre }} {{ item.clientes?.apellido }}
              </td>
              <td class="py-4 px-6 whitespace-nowrap">${{ Number(item.monto).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6 text-emerald-400/80 whitespace-nowrap">${{ Number(item.total_pagar).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6 font-medium whitespace-nowrap">${{ Number(item.pagos_quincenal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6 whitespace-nowrap">
                <span class="bg-zinc-800 px-2 py-1 rounded text-zinc-300 text-xs font-mono">
                  {{ item.pagos_realizados }} / {{ item.quincenas }}
                </span>
              </td>
              <td class="py-4 px-6 font-medium whitespace-nowrap">
                 <span :class="item.status === 'Pagado' ? 'text-emerald-500' : 'text-amber-500'">
                  {{ item.status }}
                </span>
              </td>
              <td class="py-4 px-6 text-right">
                <button class="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all" title="Descargar Reporte" @click="descargar(item, item.clientes)" :disabled="loading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 12v6"/><path d="M9 15l3 3 3-3"/>
                  </svg>
                </button>
              </td>
            </tr>
            
            <tr v-if="cargando" v-for="list in 3">
              <td class="py-4 px-6"><span class="block h-6 w-44 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-20 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-20 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-16 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-16 animate-pulse bg-zinc-700 rounded"></span></td>
            </tr>
            
            <tr v-if="prestamos.length === 0 && !cargando">
              <td colspan="6" class="py-10 text-center text-zinc-500">
                No hay datos financieros para mostrar.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>