import React from "react";
import { createBrowserRouter, Navigate, RouterProvider, useLocation } from "react-router-dom";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import Device from "./device/device";
import Node from "./node/node";
import Home from "./home/home";
import RouterError from "./routerError/routerError";
import Loader from "./_components/loader/loader";
import { useAuth } from "./_contexts/AuthContext";
import MqttMessage from "./mqttMessage/mqttMessage";
import Company from "./company/company";
import Site from "./site/site";

const ProtectedRoute = ({ children }) => {
    const {currentUser, processing} = useAuth();
    let location = useLocation();

    if (processing) {
        return <div className="min-h-screen flex justify-center items-center">
            <Loader label="please wait..." />
        </div>
    } else {
        if (currentUser) {
            return children
        } else {
            return <Navigate to="/login" replace state={{ from: location }} />
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
        {
            path: "/devices",
            element: <ProtectedRoute><Device /></ProtectedRoute>
        },
        {
            path: "/nodes",
            element: <ProtectedRoute><Node /></ProtectedRoute>
        },
        {
            path: "/mqttMessages",
            element: <ProtectedRoute><MqttMessage /></ProtectedRoute>
        },
        {
            path: "/companies",
            element: <ProtectedRoute><Company /></ProtectedRoute>
        },
        {
            path: "/sites",
            element: <ProtectedRoute><Site /></ProtectedRoute>
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}