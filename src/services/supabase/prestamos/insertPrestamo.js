import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const insertPrestamo = async (cliente_id, monto, total_pagar, quincenas, pagos_quincenal) => {
  const user = await getCurrent();
  
  // 1. Obtener el crédito actual para restar
  const { data: clienteActual, error: errorFetch } = await supa
    .from("clientes")
    .select("credito")
    .eq("id", cliente_id)
    .single();

  if (errorFetch) throw errorFetch;

  if (clienteActual.credito < monto) {
    throw new Error("El cliente no tiene suficiente crédito disponible.");
  }

  // 2. Insertar el préstamo INCLUYENDO cliente_id
  const { data: dtPrestamo, error: errorPrestamo } = await supa
    .from("prestamos")
    .insert([
      {
        user_id: user.id,
        cliente_id: cliente_id, // <--- Nueva columna vinculada
        monto: parseFloat(monto),
        total_pagar: parseFloat(total_pagar),
        quincenas: parseInt(quincenas),
        pagos_quincenal: parseFloat(pagos_quincenal),
        saldo_pendiente: parseFloat(total_pagar),
        pagos_realizados: 0,
        status: 'Activo'
      },
    ])
    .select();

  if (errorPrestamo) throw errorPrestamo;

  // 3. Actualizar al cliente (Restar crédito y cambiar status)
  // Aunque el préstamo tiene el cliente_id, el cliente aún necesita 
  // saber que está "Activo" para que no aparezca en tu lista de "Inactivos"
  const nuevoCredito = clienteActual.credito - parseFloat(monto);

  const { error: dtError } = await supa
    .from("clientes")
    .update({ 
      status: 'Activo',
      credito: nuevoCredito
    })
    .eq("id", cliente_id)
    .eq("user_id", user.id);

  if (dtError) throw dtError;

  return dtPrestamo[0];
};