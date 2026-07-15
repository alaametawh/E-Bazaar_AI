import supabase from "./supabase";

export async function submitForm(userData: { name: string; number: string; address: string }, cartItems: any[], total: number) {
    const formatted_order = cartItems.map(item => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price
    }));

    const { data, error } = await supabase
        .from("orders")
        .insert({ user_name: userData.name, user_number: userData.number, user_add: userData.address, order: formatted_order, total_price: total });

    if (error) {
        throw new Error("failed to submit order form");
    }

    return {
        data : data,
    };
}