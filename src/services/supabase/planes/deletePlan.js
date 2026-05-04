import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const deletePlan = async (id) => {
  const user = await getCurrent();
  const { error } = await supa
    .from("planes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) throw error;

  return error;
};
