import { useEffect } from "react"
import { useAuth } from "../_contexts/AuthContext"
import { MessageBoxServiceProvider } from "../_contexts/MessageBoxContext"
import { OverlayServiceProvider } from "../_contexts/OverlayContext"

export default function AuthenticatedLayout({ children }) {
    let { currentUser } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50" >
            <OverlayServiceProvider>
                <MessageBoxServiceProvider>
                    {children}
                </MessageBoxServiceProvider>
            </OverlayServiceProvider>
        </div>
    )
}