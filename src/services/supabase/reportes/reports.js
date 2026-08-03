import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const getReportData = async () => {
  const user = await getCurrent();

  let { data: prestamos, error } = await supa
    .from("prestamos")
    .select(`
      *,
      clientes!prestamos_cliente_id_fkey (
        nombre,
        apellido,
        telefono,
        created_at
      )
    `) // <--- Agregamos !nombre_de_la_llave_foranea
    .eq("user_id", user.id);

  if (error) throw error;
  return prestamos;
};