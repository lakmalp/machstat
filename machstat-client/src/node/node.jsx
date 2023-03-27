import { MessageBox } from "../_components/message-box/message-box";
import AuthenticatedLayout from "../_containers/authenticated-layout";
import { NodeServiceProvider } from "./context/node-service";
import NodeDialog from "./layouts/node-dialog";
import NodeOverview from "./layouts/node-overview";

export default function Node(props) {
    return (
        <AuthenticatedLayout>
            <NodeServiceProvider>
                <MessageBox />
                <NodeDialog />
                <NodeOverview />
            </NodeServiceProvider>
        </AuthenticatedLayout>
    )
}