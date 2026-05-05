import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const insertPrestamo = async (cliente_id, monto, total_pagar, quincenas, pagos_quincenal) => {
  const user = await getCurrent();
  
  const { data: clienteActual, error: errorFetch } = await supa
    .from("clientes")
    .select("credito")
    .eq("id", cliente_id)
    .single();

  if (errorFetch) throw errorFetch;

  if (clienteActual.credito < monto) {
    throw new Error("El cliente no tiene suficiente crédito disponible.");
  }

  const { data: dtPrestamo, error: errorPrestamo } = await supa
    .from("prestamos")
    .insert([
      {
        user_id: user.id,
        monto: parseFloat(monto),
        total_pagar: parseFloat(total_pagar),
        quincenas: parseInt(quincenas),
        pagos_quincenal: parseFloat(pagos_quincenal),
      },
    ])
    .select();

  if (errorPrestamo) throw errorPrestamo;

  const nuevoPrestamoId = dtPrestamo[0].id;
  const nuevoCredito = clienteActual.credito - parseFloat(monto);

  const { error: dtError } = await supa
    .from("clientes")
    .update({ 
      prestamo_id: nuevoPrestamoId, 
      status: 'Activo',
      credito: nuevoCredito
    })
    .eq("id", cliente_id)
    .eq("user_id", user.id);

  if (dtError) throw dtError;

  return dtPrestamo[0];
};