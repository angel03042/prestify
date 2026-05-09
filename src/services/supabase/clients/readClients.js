import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const readClients = async () => {
  const user = await getCurrent();

  if (!user) throw new Error("No hay una sesión activa");

  let { data: clientes, error } = await supa
    .from("clientes")
    .select(`
      id, 
      nombre, 
      apellido, 
      telefono, 
      credito, 
      status,
      prestamos (
        monto,
        status
      )
    `)
    .eq("user_id", user.id)
    .eq("prestamos.status", "Activo")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return clientes;
};
