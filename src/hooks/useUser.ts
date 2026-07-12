import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export default function useUser() {
    const {isLoading, isError, data: user} = useQuery({
        queryFn: getCurrentUser,
        queryKey: ['user']
    })
    const Auth = user?.role === "authenticated"
    return {isLoading, isError, user, Auth}
}