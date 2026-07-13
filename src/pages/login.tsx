import { useForm } from "react-hook-form";
import { Lock, Mail} from 'lucide-react';
import useLogin from "../hooks/useLogin";


type LoginFormValues = {
    email: string;
    password: string;
};

export default function Login() {
    const  {mutate} = useLogin();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>();

    function onSubmit(data: LoginFormValues) {
        mutate({email: data.email, password: data.password});
    }

    return (
        <div className=" font-default text-text flex flex-col justify-center items-center min-h-[calc(100vh-100px)]">
            <h1 className="text-4xl text-accent font-bold mb-3">E-Bazaar</h1>
            <p className=" text-text/60 font-bold text-sm mb-6">E-Bazaar Management System - Employee Login</p>
            <form className="bg-[#292825] p-6 rounded-2xl border border-accent w-110" onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="email"> <span className="flex items-center mb-1"> <Mail className="inline-block mr-2" /> Email </span></label>

                    <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="email" id="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address",
                        },
                    })} />

                    {errors.email && <span className="text-red-500 font-bold">{errors.email.message}</span>}
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    <label htmlFor="password"> <span className="flex items-center mb-1"> <Lock className="inline-block mr-2" /> Password </span></label>

                    <input className="text-text bg-bg/70 placeholder:text-text/50 border border-accent focus:outline-none focus:ring-2 focus:ring-accent p-1.5 pl-4 rounded-xl" type="password" id="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {value: 6,message: "Password must be at least 6 characters long",}
                    })} />

                    {errors.password && <span className="text-red-500 font-bold">{errors.password.message}</span>}
                </div>

                <button  className=" hover:bg-bg/50 w-full border p-2.5 rounded-2xl mt-1.5 bg-bg cursor-pointer border-accent" type="submit">Login</button>
            </form>
        </div>
    )
}