import { useEffect } from "react";
import { useAuth } from "../_contexts/AuthContext";
import { MessageBoxServiceProvider } from "../_contexts/MessageBoxContext";
import { PageStateServiceProvider } from "../_contexts/PageStateContext";
import { MessageBox } from "../_components/message-box/message-box";
import Overlay from "../_components/overlay/overlay";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50" >
            <PageStateServiceProvider>
                <MessageBoxServiceProvider>
                    <Overlay />
                    <MessageBox />
                    {children}
                </MessageBoxServiceProvider>
            </PageStateServiceProvider>
        </div>
    )
}