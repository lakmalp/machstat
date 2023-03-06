import { useEffect } from "react"
import { useAuth } from "../_contexts/AuthContext"

export default function AuthenticatedLayout({ children }) {
    let { currentUser } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50" >
            {children}
        </div>
    )
}