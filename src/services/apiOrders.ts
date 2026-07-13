import supabase from "./supabase";

export async function getOrdersCount() {
    const { data, count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact" });

    if (error) {
        throw new Error("Orders table error");
    }

    return {
        data,
        count: count ?? 0,
    };
}