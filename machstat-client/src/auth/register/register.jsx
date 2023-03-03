import { ServiceProvider } from "./context/service";
import RegisterForm from "./layouts/form";

export default function Register(props) {
    return (
        <ServiceProvider>
            <RegisterForm />
        </ServiceProvider>
    )
}