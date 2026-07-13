import { getOrdersCount } from "@/services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export default function useOcount() {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["ordersCount"],
        queryFn: getOrdersCount,
    });

    return {
        count: data?.count ?? 0,
        error,
        isLoading,
    };
}