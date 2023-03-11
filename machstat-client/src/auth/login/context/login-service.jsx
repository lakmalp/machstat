import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth, errorCodes } from '../../../_contexts/AuthContext';

const ServiceContext = React.createContext();

export function useService() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }) {
    const navigate = useNavigate();
    const { login, processing, currentUser, errorMessages, successMessages } = useAuth();
    let location = useLocation();

    const value = {
        currentUser,
        errorCodes,
        errorMessages,
        successMessages,
        login: async (email, password) => {
            await login(email, password);
            const origin = location.state?.from?.pathname || '/dashboard';
            navigate(origin);
        },
        processing
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}