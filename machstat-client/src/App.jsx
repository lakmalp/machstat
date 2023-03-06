import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import Home from "./home/home";
import RouterError from "./routerError/routerError";
import { useAuth } from "./_contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const {currentUser, processing} = useAuth();

    if (processing) {
        return <div>Processing...</div>
    } else {
        if (currentUser) {
            return children
        } else {
            return <Navigate to="/login" replace />
        }
    }
}

export default function App() {
    
    const router = createBrowserRouter([
        {
            index: true,
            element:
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>,
            errorElement: <RouterError />,
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}