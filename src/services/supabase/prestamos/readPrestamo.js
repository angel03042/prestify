import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const readPrestamo = async () => {
  const user = await getCurrent();
  
  // Consultamos PRESTAMOS y traemos el CLIENTE relacionado
  let { data, error } = await supa
    .from("prestamos")
    .select(`
      *,
      clientes (
        nombre,
        apellido,
        credito
      )
    `)
    .eq("user_id", user.id)
    .eq("status", "Activo") // Solo préstamos que no se han pagado
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};