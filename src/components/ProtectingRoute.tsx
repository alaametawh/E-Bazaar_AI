import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

export default function ProtectingRoute({ children }: { children: React.ReactNode }) {
    const { isLoading, isError, Auth } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !Auth) {
            navigate("/login");
        }
    }, [isLoading, Auth, navigate]);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        navigate("/notfound");
    }
    if (Auth) {
        return children;
    }
}
