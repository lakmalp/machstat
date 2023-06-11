import { StatusIndicator } from "../../_components";
import { useDeviceService } from "../util/device-service"
import Table from "../../_components/table/table";

export default function DeviceOverview() {

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
    } = useDeviceService();

    const columns = [
        { name: "name", type: "text", label: "Name", colSpan: "5", textAlign: "left" },
        { name: "node.guid", type: "text", label: "GUID", colSpan: "4", textAlign: "left" },
        { name: "node.status", type: "dropdown", label: "Status", colSpan: "3", textAlign: "left", render: <StatusIndicator /> }
    ];

    return (
        <div className=" h-full w-2/5 bg-white">
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