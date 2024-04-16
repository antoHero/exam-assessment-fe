
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
        try {
            const response = await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

            if(response.status === 204) {
                const { data: { data } } = await authService.login({ email, password });
                dispatch(storeUser(data))
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 422) {
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
                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl flex items-center space-x-6">
                            <span>Assessment </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Create accessible exams for your institution.
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