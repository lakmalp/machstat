import { useEffect } from "react";
import { useAuth } from "../_contexts/AuthContext";
import { MessageBoxServiceProvider } from "../_contexts/MessageBoxContext";
import { PageStateServiceProvider } from "../_contexts/PageStateContext";
import { MessageBox } from "../_components/message-box/message-box";
import Overlay from "../_components/overlay/overlay";
import { Link } from "react-router-dom";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50" >
            <PageStateServiceProvider>
                <MessageBoxServiceProvider>
                    <div className="text-center py-3 bg-gray-100 mb-1">
                        <Link to="/companies" className="text-sky-600 px-3 mx-3 p-1 rounded-full hover:bg-white">Companies</Link>|
                        <Link to="/sites" className="text-sky-600 px-3 mx-3 p-1 rounded-full hover:bg-white">Sites</Link>|
                        <Link to="/devices" className="text-sky-600 px-3 mx-3 p-1 rounded-full hover:bg-white">Devices</Link>|
                        <Link className="text-sky-600 px-3 mx-3 p-1 rounded-full hover:bg-white" to="/nodes">Nodes</Link>|
                        <Link className="text-sky-600 px-3 mx-3 p-1 rounded-full hover:bg-white" to="/mqttMessages">MQTT Messages</Link>
                    </div>
                    <Overlay />
                    <MessageBox />
                    {children}
                </MessageBoxServiceProvider>
            </PageStateServiceProvider>
        </div>
    )
}