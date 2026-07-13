import { getProductsCount } from "@/services/apiProducts";
import { useQuery } from "@tanstack/react-query";

export default function usePcount() {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["productsCount"],
        queryFn: getProductsCount,
    });

    return {
        count: data?.count ?? 0,
        error,
        isLoading,
    };
}