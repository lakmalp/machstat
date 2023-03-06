import { Link, redirect } from "react-router-dom";
import { useAuth } from "../../_contexts/AuthContext";

export default function HomePage() {
    const { logout } = useAuth();

    const signout = async () => {
        await logout();
    }

    return (
        <>
            <h1>Logged in!</h1>
            <button onClick={e => signout()} className="border rounded shadow py-1 px-2 mt-6 bg-gray-100 hover:bg-white font-inter" >Log out</button>
        </>
    )
}