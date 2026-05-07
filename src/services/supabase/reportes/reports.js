import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const getReportData = async () => {
  const user = await getCurrent();

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
      clientes!prestamos_cliente_id_fkey (
        nombre,
        apellido
      )
    `) // <--- Agregamos !nombre_de_la_llave_foranea
    .eq("user_id", user.id);

  if (error) throw error;
  return prestamos;
};