import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../_api/axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const errorCodes = {
    Unauthenticated: "Unauthenticated",
    Unauthorised: "Unauthorised"
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [errorMessages, setErrorMessages] = useState({});
    const [successMessages, setSuccessMessages] = useState({});
    const [processing, setProcessing] = useState(true);
    // const location = useLocation();

    useEffect(() => {
        (async () => {
            setProcessing(true);
            await axios.get('/sanctum/csrf-cookie');
            try {
                setCurrentUser();
                let res = await axios.get('/api/user');
                setCurrentUser(res.data);
            } catch (e) {
                if (e.response) {
                    setErrorMessages({ [errorCodes.Unauthorised]: e.response.data.message });
                } else {
                    console.log(e)
                }
            } finally {
                setProcessing(false);
            }
        })();
    }, [])

    const register = async (name, email, password, password_confirmation) => {
        try {
            setProcessing(true)
            setErrorMessages({});
            setSuccessMessages({});
            let res = await axios.post('register', { name, email, password, password_confirmation });
            setCurrentUser(res.data);
        } catch (e) {
            setSuccessMessages({});
        } finally {
            setProcessing(false);
        }
    }

    const login = async (email, password) => {
        try {
            setProcessing(true)
            await axios.post('/login', { email, password });
            let res = await axios.get('/api/user');
            setCurrentUser(res.data);
            // const origin = location.state?.from?.pathname || '/';
            // navigate(origin);
        } catch (e) {
            setCurrentUser()
            setSuccessMessages({});
            setErrorMessages(e.response.data.errors);
        } finally {
            setProcessing(false);
        }
    }

    const logout = async () => {
        try {
            setProcessing(true)
            await axios.post('/logout');
            setCurrentUser();

        } catch (e) {
            setSuccessMessages({});
            setErrorMessages(e.response.message);
        } finally {
            setProcessing(false);
        }
    }

    const value = {
        processing,
        currentUser,
        errorMessages,
        successMessages,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
