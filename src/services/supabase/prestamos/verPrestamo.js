import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const verPrestamo = async (id) => {
  const user = await getCurrent();
  let { data: clientes, error } = await supabase
    .from("clientes")
    .select(`*,prestamos(*)`)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  return clientes;
};
