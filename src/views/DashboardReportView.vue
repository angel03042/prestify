<script setup>
import { getReportData } from '@/services/supabase/reportes/reports.js'
import { ref, onMounted, computed } from 'vue'

const prestamos = ref([])
const cargando = ref(true)

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

onMounted(cargarReportes)
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-6 border-b border-zinc-800/50">
      <div>
        <h1 class="text-white text-xl font-semibold">Reportes</h1>
        <p class="text-zinc-500 text-sm">Resumen financiero detallado</p>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-4 py-6">
      <!-- Total prestado -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total Prestado</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-white font-semibold mt-2">${{ totalPrestado.toLocaleString() }}</h3>
      </div>

      <!-- Total recuperado -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total (Recuperado)</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-blue-400 font-semibold mt-2">${{ Number(totalRecuperado).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</h3>
      </div>

      <!-- Ganancia Proyectada -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 shadow-sm">
        <p class="text-xs text-zinc-500 uppercase font-bold tracking-wider">Interés Proyectado</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-indigo-400 font-semibold mt-2">${{ gananciaProyectada.toLocaleString() }}</h3>
      </div>

      <!-- Ganancia Real (Obtenida) -->
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50 border-l-emerald-500/50 border-l-4 shadow-sm">
        <p class="text-xs text-emerald-500 uppercase font-bold tracking-wider">Ganancia Real (Cobrada)</p>
        <span v-if="cargando" class="block h-8 w-24 animate-pulse bg-zinc-700 rounded mt-2"></span>
        <h3 v-else class="text-3xl text-emerald-400 font-semibold mt-2">${{ gananciaReal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</h3>
      </div>
    </div>

    <!-- TABLA DE DETALLE (Igual a la anterior) -->
    <div class="px-4 pb-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50">
        <table class="min-w-full text-sm text-zinc-400">
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Cliente</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Monto</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Total a pagar</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Cuota Q.</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Progreso</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Estatus</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/50">
            <tr v-for="item in prestamos" :key="item.id" class="hover:bg-zinc-800/20 transition-colors">
              <td class="py-4 px-6 text-white font-medium">
                {{ item.clientes?.nombre }} {{ item.clientes?.apellido }}
              </td>
              <td class="py-4 px-6">${{ Number(item.monto).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6 text-emerald-400/80">${{ Number(item.total_pagar).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6 font-medium">${{ Number(item.pagos_quincenal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
              <td class="py-4 px-6">
                <span class="bg-zinc-800 px-2 py-1 rounded text-zinc-300 text-xs">
                  {{ item.pagos_realizados }} / {{ item.quincenas }}
                </span>
              </td>
              <td class="py-4 px-6 font-medium">
                 <span :class="item.status === 'Pagado' ? 'text-emerald-500' : 'text-amber-500'">
                  {{ item.status }}
                </span>
              </td>
            </tr>
            <!-- Estado de carga -->
            <tr v-if="cargando" v-for="list in 3">
              <td class="py-4 px-6"><span class="block h-6 w-44 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-20 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-12 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-10 animate-pulse bg-zinc-700 rounded"></span></td>
              <td class="py-4 px-6"><span class="block h-6 w-10 animate-pulse bg-zinc-700 rounded"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>