import GuestLayout from "../../_containers/guest-layout";
import { ServiceProvider } from "./context/login-service";
import LoginForm from "./layouts/login-form";

export default function Login(props) {
    return (
        <GuestLayout>
            <ServiceProvider>
                <LoginForm />
            </ServiceProvider>
        </GuestLayout>
    )
}