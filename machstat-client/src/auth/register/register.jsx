import GuestLayout from "../../_containers/guest-layout";
import { ServiceProvider } from "./context/register-service";
import RegisterForm from "./layouts/register-form";

export default function Register(props) {
    return (
        <GuestLayout>
            <ServiceProvider>
                <RegisterForm />
            </ServiceProvider>
        </GuestLayout>
    )
}