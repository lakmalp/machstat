import { Link } from "react-router-dom";
import { Button } from "../../_components";
import { useService } from '../context/home-service';

export default function HomePage() {
    const { processing, logout } = useService();

    const signout = async () => {
        await logout();
    }

    return (
        <>
            <h1>Logged in!</h1>
            <Link to="/devices" className="text-sky-600">Devices</Link> | 
            <Link className="text-sky-600" to="/nodes">Nodes</Link> | 
            <Link className="text-sky-600" to="/mqttMessages">MQTT Messages</Link>
            <Button caption="Log out" name="signout" onClick={() => signout()} key="signout" className="shadow px-6 h-8" processing={processing} disabled={processing} />
        </>
    )
}