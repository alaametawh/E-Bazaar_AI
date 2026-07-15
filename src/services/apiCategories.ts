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



export async function deleteCategory({ id }: { id: string }) {
    const { data, error } = await supabase
        .from("category")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(error.message);
    }

    return data;
}




type newCategory = {
    name: string;
};

export async function createCategory(newCategory: newCategory) {
    const { data, error } = await supabase
        .from("category")
        .insert([newCategory])
        .select();

    if (error) throw new Error(error.message);

    return data;
}