
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppNavbar } from "../components/protected/AppNavbar";
import { AppSidebar } from "../components/protected/AppSidebar";
import authService from "../services/authService";

export const AuthLayout: React.FC = () => {
    const user = localStorage.getItem("user");
    if(!user || user === null || user === undefined) {
        return <Navigate to="/"  />;
    }

    const handleLogout = async() => {
        try {
            return await authService.logout();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <div className="flex items-start justify-between">
                <div className="relative hidden h-screen shadow-lg lg:block w-80">
                    <AppSidebar handleLogout={handleLogout} />
                </div>
                <div className="flex flex-col w-full pl-0 md:space-y-4">
                    <AppNavbar handleLogout={handleLogout} />
                    <div className="h-screen pt-6 pb-24 p-4 overflow-auto md:pr-0 md:pl-0">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* <ResponsiveSidebar /> */}
        </main>
    )
}
