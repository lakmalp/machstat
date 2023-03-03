import React, { useContext } from 'react';
import { useAuth } from '../../../_contexts/AuthContext';

const ServiceContext = React.createContext();

export function useService() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }) {
    const { login: authLogin, register: authRegister, currentUser: currentUser, errorMessages: authErrorMessages, successMessages: authSuccessMessages } = useAuth();    

    const value = {
        currentUser,
        authErrorMessages,
        authSuccessMessages,
        authLogin,
        authRegister
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}