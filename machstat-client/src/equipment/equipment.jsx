import AuthenticatedLayout from "../_containers/authenticated-layout";
import { EquipmentServiceProvider } from "./util/equipment-service";
import EquipmentDialog from "./layouts/equipment-dialog";
import EquipmentOverview from "./layouts/equipment-overview";

export default function Equipment(props) {
    return (
        <AuthenticatedLayout>
            <EquipmentServiceProvider>
                <EquipmentDialog />
                <EquipmentOverview />
            </EquipmentServiceProvider>
        </AuthenticatedLayout>
    )
}