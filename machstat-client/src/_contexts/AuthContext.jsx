import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

        // const heartbeatHandle = setInterval(async () => {
        //     try {
        //         let res = await axios.get('/api/heartbeat');
        //     } catch (e) {
        //         navigate('/login');
        //     }
        // }, 5000);

        // return () => {
        //     clearInterval(heartbeatHandle);
        // };
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
            if (e.response.data.hasOwnProperty("errors")) {
                setErrorMessages(e.response.data.errors);
            } else {
                setErrorMessages({general: ["Server is not responding. Please contact Administrator."]})
            }
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
