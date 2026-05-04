import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const updatePlan = async ( id, nombre, quincenas, interes, multiplicador,) => {
  const user = await getCurrent();
  const { data, error } = await supa
    .from("planes")
    .update({ nombre, quincenas: parseInt(quincenas), interes: parseFloat(interes), multiplicador: parseFloat(multiplicador) })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw error;

  return data;
};
