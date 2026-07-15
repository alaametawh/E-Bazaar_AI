import supabase from "./supabase";

export async function submitForm(userData: { name: string; email: string; address: string }, cartItems: any[], total: number) {
    const formatted_order = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
    }));

    const { data, error } = await supabase
        .from("orders")
        .insert({ user_name: userData.name, user_email: userData.email, user_address: userData.address, order: formatted_order, total_price: total });

    if (error) {
        throw new Error("failed to submit order form");
    }

    return {
        data : data,
    };
}