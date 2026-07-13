import supabase from "./supabase";

export async function getProductsCount() {
    const { data, count, error } = await supabase
        .from("products")
        .select("*", { count: "exact" });

    if (error) {
        throw new Error("Product table error");
    }

    return {
        data,
        count: count ?? 0,
    };
}