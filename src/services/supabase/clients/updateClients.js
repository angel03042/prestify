import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const updateClient = async (id, nombre, apellido, telefono, credito) => {
  const user = await getCurrent();
  
  const { data, error } = await supa
    .from("clientes")
    .update({ nombre, apellido, telefono, credito })
    .eq('id', id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  
  return data;
};

export const updateStatusClient = async (id, status) => {
  const user = await getCurrent();
  
  const { data, error } = await supa
    .from("clientes")
    .update({ status })
    .eq('id', id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;
  
  return data;
};