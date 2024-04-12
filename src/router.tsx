
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './layouts/AuthLayout';
import { ErrorPage } from './pages/ErrorPage';
import { LoginPage } from './pages/auth/LoginPage';
import { Main } from './layouts/Main';
import { Dashboard } from './pages/dashboard/Dashboard';
// import { Main } from "./layouts/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LoginPage />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
        ]
    }

]);

export const Router = () => {
    return <RouterProvider router={router} fallbackElement={<LoginPage />} />
}