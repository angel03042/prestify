import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const readPlan = async () => {
  const user = await getCurrent();
  let { data: planes, error } = await supa.from("planes").select("*");

  if (error) throw console.log("Ocurrio un: ", error);

  return planes;
};
