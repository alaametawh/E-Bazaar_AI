import supabase from "./supabase";

export async function getCategoryCount() {
    const { data, count, error } = await supabase
        .from("category")
        .select("*", { count: "exact" });

    if (error) {
        throw new Error("Category table error");
    }

    return {
        data,
        count: count ?? 0,
    };
}