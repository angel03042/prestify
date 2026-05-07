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

// --- CÁLCULOS PARA KPIs ---

// Total de capital entregado
const totalPrestado = computed(() => {
  return prestamos.value.reduce((acc, curr) => acc + (curr.monto || 0), 0)
})

// Total recuperado (lo que los clientes ya pagaron)
const totalRecuperado = computed(() => {
  return prestamos.value.reduce((acc, curr) => {
    // Calculamos cuánto ha pagado basándonos en cuotas realizadas
    const pagado = curr.pagos_realizados * curr.pagos_quincenal
    return acc + pagado
  }, 0)
})

// Ganancia proyectada (Diferencia entre total a pagar y monto base)
const gananciaEstimada = computed(() => {
  return prestamos.value.reduce((acc, curr) => {
    const interes = curr.total_pagar - curr.monto
    return acc + interes
  }, 0)
})

// Conteo de morosos (ejemplo: status 'Atrasado' o saldo > 0 y fecha vencida)
const morosos = computed(() => {
  return prestamos.value.filter(p => p.status === 'Vencido').length
})

onMounted(cargarReportes)
</script>

<template>
  <section class="flex flex-col overflow-auto bg-neutral-900">
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 px-4 py-6 border-b border-zinc-800/50">
      <div>
        <h1 class="text-white text-xl font-semibold">Reportes</h1>
        <p class="text-zinc-500 text-sm">Resumen general de tus préstamos</p>
      </div>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 px-4 py-6">
      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Total prestado</p>
        <h3 class="text-3xl text-white font-semibold mt-2">${{ totalPrestado.toLocaleString() }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Total recuperado</p>
        <h3 class="text-3xl text-emerald-500 font-semibold mt-2">${{ totalRecuperado.toLocaleString() }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Ganancia Proyectada</p>
        <h3 class="text-3xl text-indigo-400 font-semibold mt-2">${{ gananciaEstimada.toLocaleString() }}</h3>
      </div>

      <div class="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50">
        <p class="text-xs text-zinc-500 uppercase font-bold">Morosos</p>
        <h3 class="text-3xl text-red-500 font-semibold mt-2">{{ morosos }}</h3>
      </div>
    </div>

    <!-- TABLA -->
    <div class="px-4 pb-6">
      <div class="overflow-hidden border border-zinc-800/50 rounded-2xl bg-zinc-900/50">
        <table class="min-w-full text-sm text-zinc-400">
          <thead>
            <tr class="bg-zinc-800/30 text-left">
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Cliente</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Inversión</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Total a pagar</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Cuota Q.</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Progreso</th>
              <th class="py-4 px-6 text-[11px] text-zinc-500 uppercase font-bold">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/50">
            <tr v-for="item in prestamos" :key="item.id" class="hover:bg-zinc-800/20 transition-colors">
              <td class="py-3 px-6 text-white font-medium">
                {{ item.clientes?.nombre }} {{ item.clientes?.apellido }}
              </td>
              <td class="py-3 px-6">${{ item.monto.toLocaleString() }}</td>
              <td class="py-3 px-6 text-indigo-300">${{ item.total_pagar.toLocaleString() }}</td>
              <td class="py-3 px-6">${{ item.pagos_quincenal.toLocaleString() }}</td>
              <td class="py-3 px-6">
                {{ item.pagos_realizados }} / {{ item.quincenas }}
              </td>
              <td class="py-3 px-6">
                <span :class="item.status === 'Pagado' ? 'text-emerald-500' : 'text-amber-500'">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>