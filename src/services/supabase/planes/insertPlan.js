import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const addPlan = async (nombre, quincenas, interes, multiplicador) => {
  const user = await getCurrent();
  
  const { data, error } = await supa
    .from("planes")
    .insert([
      { 
        user_id: user.id, 
        nombre, 
        quincenas: parseInt(quincenas), 
        interes: parseFloat(interes), 
        multiplicador: parseFloat(multiplicador) 
      }
    ]);

  if (error) throw error;
  return data;
};