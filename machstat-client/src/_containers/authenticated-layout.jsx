import { useEffect } from "react";
import { useAuth } from "../_contexts/AuthContext";
import { MessageBoxServiceProvider } from "../_contexts/MessageBoxContext";
import { PageStateServiceProvider } from "../_contexts/PageStateContext";
import { MessageBox } from "../_components/message-box/message-box";
import Overlay from "../_components/overlay/overlay";
import { NavLink } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
    const getClass = (isActive, isPending) => {
        return (isPending ? "pending" : isActive ? "text-sm text-orange-500 px-3 mx-3 p-1 border-2 border-orange-500 rounded-lg bg-orange-50 " : "text-sm text-gray-600 px-3 mx-3 p-1 rounded-full hover:bg-white")
    }
    return (
        <div className="min-h-screen bg-gray-50" >
            <PageStateServiceProvider>
                <MessageBoxServiceProvider>
                    <div className="text-center py-3 bg-white mb-1 font-dm-sans">
                        <NavLink to="/companies" className={({isActive, isPending}) => getClass(isActive, isPending)}>Companies</NavLink>|
                        <NavLink to="/equipmentTypes" className={({isActive, isPending}) => getClass(isActive, isPending)}>Equipment Types</NavLink>|
                        <NavLink className={({isActive, isPending}) => getClass(isActive, isPending)} to="/equipment">Equipment</NavLink>|
                        <NavLink to="/sites" className={({isActive, isPending}) => getClass(isActive, isPending)}>Sites</NavLink>|
                        <NavLink to="/devices" className={({isActive, isPending}) => getClass(isActive, isPending)}>Devices</NavLink>|
                        <NavLink className={({isActive, isPending}) => getClass(isActive, isPending)} to="/nodes">Nodes</NavLink>|
                        <NavLink className={({isActive, isPending}) => getClass(isActive, isPending)} to="/jobCards">Job Cards</NavLink>|
                        <NavLink className={({isActive, isPending}) => getClass(isActive, isPending)} to="/mqttMessages">MQTT Messages</NavLink>
                    </div>
                    <Overlay />
                    <MessageBox />
                    <div className="pl-2 pt-2">
                    {children}
                    </div>
                </MessageBoxServiceProvider>
            </PageStateServiceProvider>
        </div>
    )
}