import AuthenticatedLayout from "../_containers/authenticated-layout";
import { ServiceProvider } from "./context/home-service";
import HomePage from "./layouts/home-page";

export default function Home(props) {
    return (
        <AuthenticatedLayout>
            <ServiceProvider>
                <HomePage />
            </ServiceProvider>
        </AuthenticatedLayout>
    )
}