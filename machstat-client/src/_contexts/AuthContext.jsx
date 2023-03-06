import React, { useContext, useEffect, useState } from 'react';
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
    const [errorMessages, setErrorMessages] = useState();
    const [successMessages, setSuccessMessages] = useState();
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        (async () => {
            setProcessing(true)
            await axios.get('/sanctum/csrf-cookie');
            try {
                setCurrentUser();
                let res = await axios.get('/api/user');
                setCurrentUser(res.data);
            } catch (e) {
                if (e.response) {
                    setErrorMessages([{ code: errorCodes.Unauthorised, message: e.response.data.message }]);
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
            setErrorMessages("");
            setSuccessMessages("");
            let res = await axios.post('register', { name, email, password, password_confirmation });
            setCurrentUser(res.data);
        } catch (e) {
            setSuccessMessages("");
        }
    }

    const login = async (email, password) => {
        try {
            setProcessing(true)
            await axios.post('/login', { email, password });
            let res = await axios.get('/api/user');
            setCurrentUser(res.data);

        } catch (e) {
            setCurrentUser()
            setSuccessMessages("");
            setErrorMessages(e.response.message);
        } finally {
            setProcessing(false);
        }
    }

    const logout = async () => {
        try {
            setProcessing(true)
            let res = await axios.post('/logout');
            setCurrentUser();

        } catch (e) {
            setSuccessMessages("");
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
