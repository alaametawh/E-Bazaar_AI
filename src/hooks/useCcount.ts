import { getCategoryCount } from "@/services/apiCategories";
import { useQuery } from "@tanstack/react-query";

export default function usePcount() {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["categoriesCount"],
        queryFn: getCategoryCount,
    });

    return {
        count: data?.count ?? 0,
        error,
        isLoading,
    };
}