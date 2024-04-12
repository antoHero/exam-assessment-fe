
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@material-tailwind/react";
import { PageTitle } from '../../components/reusables/PageTitle';

export const LoginPage = () => {
    PageTitle('Login');

    return (
        <>
            <main
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
                <div className="w-full px-8">

                    <div className="relative -mt-16 block lg:hidden mt-8">
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
                    <form className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6 ">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
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
                                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="mt-6 col-span-6 sm:flex sm:items-center sm:gap-4">

                            <Button
                                size="lg"
                                variant="filled"
                                className="flex items-center justify-center gap-3"
                                fullWidth
                                type="submit"
                                placeholder={undefined}
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}