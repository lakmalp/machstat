import AuthenticatedLayout from "../_containers/authenticated-layout";
import { EquipmentTypeServiceProvider } from "./util/equipmentType-service";
import EquipmentTypeDialog from "./layouts/equipmentType-dialog";
import EquipmentTypeOverview from "./layouts/equipmentType-overview";

export default function EquipmentType(props) {
    return (
        <AuthenticatedLayout>
            <EquipmentTypeServiceProvider>
                <EquipmentTypeDialog />
                <EquipmentTypeOverview />
            </EquipmentTypeServiceProvider>
        </AuthenticatedLayout>
    )
}