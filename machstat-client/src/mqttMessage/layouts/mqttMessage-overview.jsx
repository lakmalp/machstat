import { StatusIndicator } from "../../_components";
import { useMqttMessageService } from "../util/mqttMessage-service"
import Table from "../../_components/table/table";

export default function MqttMessageOverview() {

    const {
        sidebarButtons,
        filterValues,
        sidebarInquireEnabled,
        setSelectAllChecked,
        setFilterValues,
        localData,
        serverData,
        rowCheckboxClicked,
        selectedRows
    } = useMqttMessageService();

    const columns = [
        { name: "guid", type: "text", label: "GUID", colSpan: "3", textAlign: "left" },
        { name: "body", type: "text", label: "Message Body", colSpan: "5", textAlign: "left" },
        { name: "received_at", type: "text", label: "Received At", colSpan: "3", textAlign: "left" },
        { name: "processed", type: "option", label: "Processed", colSpan: "2", textAlign: "left" }
    ];

    return (
        <div className="h-full w-4/5 bg-white">
            <Table
                sidebarButtons={sidebarButtons}
                sidebarInquireEnabled={sidebarInquireEnabled}
                columns={columns}
                localData={localData}
                serverData={serverData}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                selectedRows={selectedRows}
                rowCheckboxClicked={rowCheckboxClicked}
                setSelectAllChecked={setSelectAllChecked}
            />
        </div>
    )
}