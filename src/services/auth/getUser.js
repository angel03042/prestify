import { supa } from "@/lib/supabase.js";

export const getCurrent = async () => {
  const {data: { user }, error} = await supa.auth.getUser();

  if(error || !user){
    return null;
  }

  const { data: perfil, error: perfilError } = await supa
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if(perfilError){
    return { user };
  }

  return {
    ...user,
    ...perfil
  };
};
