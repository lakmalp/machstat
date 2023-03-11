import React, { useContext } from 'react';
import { useAuth } from '../../../_contexts/AuthContext';

const ServiceContext = React.createContext();

export function useService() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }) {
    const { register, currentUser, errorMessages, successMessages, processing } = useAuth();    

    const value = {
        currentUser,
        errorMessages,
        successMessages,
        register
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}