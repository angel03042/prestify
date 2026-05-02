import { supa } from "@/lib/supabase.js";

export const signOutService = async () => {
  const { error } = await supa.auth.signOut();

  if(error){
    console.error(error)
    return
  }
};
