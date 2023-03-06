import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, errorCodes } from '../../../_contexts/AuthContext';

const ServiceContext = React.createContext();

export function useService() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }) {
    const navigate = useNavigate();
    const { login, currentUser: currentUser, errorMessages: authErrorMessages, successMessages: authSuccessMessages } = useAuth();

    const value = {
        currentUser,
        errorCodes,
        authErrorMessages,
        authSuccessMessages,
        authLogin: async (email, password) => {
            await login(email, password);
            navigate("/");
        },
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}