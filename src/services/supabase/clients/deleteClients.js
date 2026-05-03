import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const deleteClient = async (id) => {
  const user = await getCurrent();
  if (!user) throw new Error("Sesión no válida");

  const { error } = await supa
    .from("clientes")
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
};