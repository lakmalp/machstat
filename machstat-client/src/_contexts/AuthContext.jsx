import React, { useContext, useEffect, useState } from 'react'
import axios from "../_api/axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [errorMessages, setErrorMessages] = useState();
    const [successMessages, setSuccessMessages] = useState();

    useEffect(() => {
        (async() => {
            await axios.get('/sanctum/csrf-cookie');
        })();
    },[])

    const register = async (name, email, password, password_confirmation) => {
        try {
            setErrorMessages("");
            setSuccessMessages("");
            let res = await axios.post('register', {name, email, password, password_confirmation});
            setCurrentUser(res.data);
        } catch (e) {
            setSuccessMessages("");
            // setErrorMessages(e.response.message);
        }
    }

    const login = async (email, password) => {
        try {
            let res = await axios.post('/login', {email, password});
            setCurrentUser(res.data);
        } catch (e) {
            setCurrentUser()
            setSuccessMessages("");
            setErrorMessages(e.response.message);
        }
    }

    const value = {
        currentUser,
        errorMessages,
        successMessages,
        login,
        register
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
