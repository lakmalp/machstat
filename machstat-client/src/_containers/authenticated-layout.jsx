export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {children}
        </div>
    )
}