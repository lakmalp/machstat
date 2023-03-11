import AuthenticatedLayout from "../_containers/authenticated-layout";
import { ServiceProvider } from "./context/node-service";
import NodeDialog from "./layouts/node-dialog";
import NodeOverview from "./layouts/node-overview";

export default function Node(props) {
    return (
        <AuthenticatedLayout>
            <ServiceProvider>
                <NodeDialog></NodeDialog>
                <NodeOverview />
            </ServiceProvider>
        </AuthenticatedLayout>
    )
}