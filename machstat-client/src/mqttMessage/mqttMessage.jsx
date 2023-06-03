import AuthenticatedLayout from "../_containers/authenticated-layout";
import { MqttMessageServiceProvider } from "./util/mqttMessage-service";
import MqttMessageDialog from "./layouts/mqttMessage-dialog";
import MqttMessageOverview from "./layouts/mqttMessage-overview";

export default function MqttMessage(props) {
    return (
        <AuthenticatedLayout>
            <MqttMessageServiceProvider>
                <MqttMessageDialog />
                <MqttMessageOverview />
            </MqttMessageServiceProvider>
        </AuthenticatedLayout>
    )
}