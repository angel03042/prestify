import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const updatePrestamo = async (id, montoPagado, metodo_pago, pagosActuales, quincenasTotales, saldoActual) => {
  
  const pActuales = parseInt(pagosActuales);
  const qTotales = parseInt(quincenasTotales);
  const sActual = parseFloat(saldoActual);
  const mPagado = parseFloat(montoPagado);

  if (pActuales >= qTotales || sActual <= 0.01) {
    throw new Error("Este préstamo ya ha sido liquidado.");
  }

  const user = await getCurrent();

  const pagosRealizados = pActuales + 1;
  const nuevoSaldoPendiente = sActual - mPagado;
  const saldoFinalFijo = parseFloat(nuevoSaldoPendiente.toFixed(2));
  const nuevoEstado = saldoFinalFijo <= 0 ? 'Pagado' : 'Activo';

  const { data: dtPrestamo, error: errorPrestamo } = await supa
    .from("prestamos")
    .update({ 
      pagado: mPagado, 
      metodo_pago, 
      pagos_realizados: pagosRealizados, 
      saldo_pendiente: saldoFinalFijo,
      status: nuevoEstado 
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (errorPrestamo) throw errorPrestamo;

  if (nuevoEstado === 'Pagado') {
    
    const { data: cliente, error: errorCliente } = await supa
      .from("clientes")
      .select("id, credito")
      .eq("prestamo_id", id)
      .eq("user_id", user.id)
      .single();

    if (cliente && !errorCliente) {
      const montoARestaurar = dtPrestamo[0].monto; 
      const creditoRestaurado = parseFloat(cliente.credito) + parseFloat(montoARestaurar);

      await supa
        .from("clientes")
        .update({ 
          credito: creditoRestaurado,
          status: 'Inactivo', 
          prestamo_id: null 
        })
        .eq("id", cliente.id);
    }
  }

  return dtPrestamo;
};