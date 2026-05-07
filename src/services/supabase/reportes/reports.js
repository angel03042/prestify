import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const getReportData = async () => {
  const user = await getCurrent();

  // Traemos los préstamos y anidamos la info del cliente
  // Nota: Si la relación es 1:1 desde clientes, la consulta puede variar.
  // Aquí asumo que prestamos tiene los datos base.
  let { data: prestamos, error } = await supa
    .from("prestamos")
    .select(`
      id,
      monto,
      total_pagar,
      pagos_realizados,
      pagos_quincenal,
      quincenas,
      status,
      saldo_pendiente,
      clientes (
        nombre,
        apellido
      )
    `)
    .eq("user_id", user.id);

  if (error) throw error;
  return prestamos;
};