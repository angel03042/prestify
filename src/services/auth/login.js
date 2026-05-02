import { supa } from "@/lib/supabase.js";

export const loginService = async (email, password) => {
  try {
    const { data, error } = await supa.auth.signInWithPassword({
      email,
      password,
    });

    if(error) throw error

    console.log(data)
  } catch (error) {
    console.error('Error al iniciar sesion: ', error)
    throw error
  }
};
