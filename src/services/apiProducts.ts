import supabase from "./supabase";


export async function getProductsCount() {
    const { data, count, error } = await supabase
        .from("products")
        .select("*, category(name)", { count: "exact" });

    if (error) {
        throw new Error("Product table error");
    }

    return {
        data,
        count: count ?? 0,
    };
}

export async function deleteProduct({ id }: { id: string }) {
    const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

type NewProduct = {
    name: string;
    description: string;
    price: number;
    img_url: string;
    sec_id: string;
    year: number;
};

export async function createProduct(newProduct: NewProduct) {
    const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select();

    if (error) throw new Error(error.message);

    return data;
}