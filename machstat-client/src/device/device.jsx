import AuthenticatedLayout from "../_containers/authenticated-layout";
import { ServiceProvider } from "./context/device-service";
import DeviceOverview from "./layouts/devices-overview";

export default function Device(props) {
    return (
        <AuthenticatedLayout>
            <ServiceProvider>
                <DeviceOverview />
            </ServiceProvider>
        </AuthenticatedLayout>
    )
}