import { supa } from "@/lib/supabase.js";

export const registerService = async (nombre, apellido, email, password, terminos) => {
  try {
    const { data: authData, error: authError } = await supa.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    
    const user = authData.user;

    const { data: userData, error: dbError } = await supa
      .from("usuarios")
      .insert([{ id: user.id, nombre, apellido, correo: email, acepta_terminos: terminos }])
      .select();

    if (dbError) throw dbError;

    return { authData, userData }

  } catch (error) {
    console.error("Error en el registro: ", error.message);
    throw error;
  }
};
