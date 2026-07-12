import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import { login } from "../services/apiAuth";

type LoginData = {
    email: string;
    password: string;
};

export default function useLogin() {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: LoginData) => login(data),

        onSuccess: () => {
            navigate("/dashboard");
            toast.success("Login successful!");
        },

        onError: (error) => {
            toast.error("Login failed. Please check your credentials.");
            console.error("Login failed:", error);
        },
    });

    return { mutate, isPending };
}