
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { ProtectedLayout } from './layouts/ProtectedLayout';
import { ErrorPage } from './pages/ErrorPage';
import { LoginPage } from './pages/auth/LoginPage';
import { Main } from './layouts/Main';
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
    // {
    //     path: "/",
    //     element: <ProtectedLayout />,
    //     errorElement: <ErrorPage />,
    //     children: [
    //         {
    //             path: "/dashboard",
    //             element: <Dashboard />
    //         },
    //     ]
    // }

]);

export const Router = () => {
    return <RouterProvider router={router} fallbackElement={<LoginPage />} />
}