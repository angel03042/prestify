import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const readPrestamo = async () => {
  const user = await getCurrent();
  let { data, error } = await supa
    .from("clientes")
    .select(`*,prestamos (*)`)
    .eq("user_id", user.id)
    .eq("status", "Activo")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data
};
