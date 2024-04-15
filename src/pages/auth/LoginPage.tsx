
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Navigate } from "react-router-dom"
import axios from "axios";
import { Button } from "@material-tailwind/react";
import authService from "../../services/authService";
import { PageTitle } from '../../components/reusables/PageTitle';
import { useForm } from "react-hook-form";
import { Flip, toast } from 'react-toastify';
import { useAppDispatch } from "../../hooks/hooks";
import { storeUser } from "../../redux/slices/userSlice";
import LoaderSpinner from "../../components/reusables/LoaderSpinner";

export const LoginPage = () => {
    PageTitle('Login');

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    const [isLoading, setIsLoading] = useState<string>("idle");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useAppDispatch();

    const user = localStorage.getItem("user");

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        clearErrors("email");
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        clearErrors("password");
    }

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    const handleLogin = async () => {
        setIsLoading("loading")
        console.log("handleLogin");
        try {
            const response = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

            if(response.status === 204) {
                const { data: { user } } = await authService.login({ email, password });
                dispatch(storeUser(user))
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
                    // console.log("422 ",err.response?.data, err.response?.data?.message);
                    toast.error(err.response?.data?.message, {
                        position: "top-right",
                        transition: Flip,
                    });
                }
            }
        } finally { setIsLoading("idle") }
    }

    return (
        <>
            <main
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div className="w-full px-8">

                    <div className="relative -mt-16 block lg:hidden">
                        <h1
                            className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                        >
                            <span>Manage &amp; track your expenses </span>
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                            nam dolorum aliquam, quibusdam aperiam voluptatum.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleLogin)} className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email/Username
                            </label>
                            <input
                                type="text"
                                placeholder="Enter a valid email address or username"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                {...register("email", {
                                    required: "Your email address or username is required",
                                })}
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="col-span-6 w-full">
                            {errors.email && errors.email.type === "required" && (
                                <p className="errorMsg text-red-500">Your email address or username is required.</p>
                            )}
                        </div>
                        <div className="mt-4 col-span-6 ">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <a href="#" className="text-xs text-gray-600 hover:underline">Forget Password?</a>
                            </div>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                {...register("password", {
                                    required: "Your password is required",
                                })}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="col-span-6 w-full">
                            {errors.email && errors.email.type === "required" && (
                                <p className="errorMsg text-red-500">Your password is required.</p>
                            )}
                        </div>
                        <div className="mt-6 col-span-6 sm:flex sm:items-center sm:gap-4">

                            <Button
                                size="lg"
                                variant="filled"
                                className="flex items-center justify-center gap-3"
                                fullWidth
                                type="submit"
                                placeholder={undefined}>
                                {isLoading === "loading" && (
                                    <LoaderSpinner />
                                )}
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}