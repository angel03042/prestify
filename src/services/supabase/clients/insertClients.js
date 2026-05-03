import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const clientsServices = async (nombre, apellido, telefono, credito) => {
  const user = await getCurrent();
  
  if (!user) throw new Error("No hay una sesión activa");

  const { data, error } = await supa
    .from("clientes")
    .insert([{ user_id: user.id, nombre, apellido, telefono, credito }])
    .select();

  if (error) {
    throw error;
  }

  return data;
};
