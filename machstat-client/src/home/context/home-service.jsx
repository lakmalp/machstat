import React, { useContext } from 'react';
import { useAuth } from '../../_contexts/AuthContext';

const ServiceContext = React.createContext();

export function useService() {
    return useContext(ServiceContext);
}

export function ServiceProvider({ children }) {
    const { logout, processing } = useAuth();
    const value = {
        logout, processing
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}