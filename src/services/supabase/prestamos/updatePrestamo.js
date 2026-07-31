import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const updatePrestamo = async (id, montoPagado, metodo_pago, pagosActuales, quincenasTotales, saldoActual, statusCliente) => {
  
  const pActuales = parseInt(pagosActuales);
  const qTotales = parseInt(quincenasTotales);
  const sActual = parseFloat(saldoActual);
  const mPagado = parseFloat(montoPagado);

  // Validación de seguridad
  if (pActuales >= qTotales || sActual <= 0) {
    throw new Error("Este préstamo ya ha sido liquidado.");
  }

  const user = await getCurrent();
  const pagosRealizados = pActuales + 1;

  // LÓGICA ANTI-DECIMALES:
  // Si es el último pago O si lo que paga es casi igual al saldo (diferencia menor a 1 peso)
  // forzamos el saldo pendiente a 0 para absorber esos .04 o .33 sobrantes.
  let nuevoSaldoPendiente = sActual - mPagado;

  if (pagosRealizados === qTotales || nuevoSaldoPendiente < 1.00) {
    nuevoSaldoPendiente = 0;
  } else {
    // Si no es el último, redondeamos normal a 2 decimales
    nuevoSaldoPendiente = parseFloat(nuevoSaldoPendiente.toFixed(2));
  }

  const nuevoEstado = nuevoSaldoPendiente <= 0 ? 'Pagado' : 'Activo';

  const { data: dtPrestamo, error: errorPrestamo } = await supa
    .from("prestamos")
    .update({ 
      pagado: mPagado, 
      metodo_pago, 
      pagos_realizados: pagosRealizados, 
      saldo_pendiente: nuevoSaldoPendiente, // Aquí irá el 0 limpio
      status: nuevoEstado 
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (errorPrestamo) throw errorPrestamo;

  // Restaurar crédito al cliente si el estado es Pagado... (mantener tu lógica actual)
  if (nuevoEstado === 'Pagado') {
    const prestamoData = dtPrestamo[0];

    // Buscamos al cliente usando el cliente_id que ahora vive en el préstamo
    const { data: cliente, error: errorCliente } = await supa
      .from("clientes")
      .select("id, credito")
      .eq("id", prestamoData.cliente_id) // Relación directa
      .single();

    if (cliente && !errorCliente) {
      const creditoRestaurado = parseFloat(cliente.credito) + parseFloat(prestamoData.monto);

      if (statusCliente === 'Bloqueado') {
        await supa
        .from("clientes")
        .update({ 
          credito: creditoRestaurado,
        })
        .eq("id", cliente.id);
      } else {
        await supa
        .from("clientes")
        .update({ 
          credito: creditoRestaurado,
          status: 'Inactivo'
        })
        .eq("id", cliente.id);
      }      
    }
  }

  return dtPrestamo;
};