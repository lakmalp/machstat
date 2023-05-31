import AuthenticatedLayout from "../_containers/authenticated-layout";
import { DeviceServiceProvider } from "./util/device-service";
import DeviceDialog from "./layouts/device-dialog";
import DeviceOverview from "./layouts/device-overview";

export default function Device(props) {
    return (
        <AuthenticatedLayout>
            <DeviceServiceProvider>
                <DeviceDialog />
                <DeviceOverview />
            </DeviceServiceProvider>
        </AuthenticatedLayout>
    )
}