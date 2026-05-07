import { supa } from "@/lib/supabase.js";
import { getCurrent } from "@/services/auth/getUser.js";

export const resumenPrestamos = async () => {
    const user = await getCurrent();

    // 1. Obtener todos los préstamos con info de clientes
    const { data: prestamos, error: errorP } = await supa
        .from("prestamos")
        .select(`
            *,
            clientes (nombre, apellido)
        `)
        .eq("user_id", user.id);

    // 2. Obtener total de clientes
    const { count: totalClientes, error: errorC } = await supa
        .from("clientes")
        .select('*', { count: 'exact', head: true })
        .eq("user_id", user.id);

    if (errorP || errorC) throw (errorP || errorC);

    return {
        prestamos,
        totalClientes: totalClientes || 0
    };
}