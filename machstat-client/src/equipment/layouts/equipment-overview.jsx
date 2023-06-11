import { StatusIndicator } from "../../_components";
import { useEquipmentService } from "../util/equipment-service"
import Table from "../../_components/table/table";

export default function EquipmentOverview() {

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
    } = useEquipmentService();

    const columns = [
        { name: "code", type: "text", label: "Code", colSpan: "5", textAlign: "left" },
        { name: "description", type: "text", label: "Description", colSpan: "4", textAlign: "left" },
        { name: "equipment_type.code", type: "dropdown", label: "Equipment Type", colSpan: "3", textAlign: "left" }
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