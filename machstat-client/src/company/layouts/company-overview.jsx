import { StatusIndicator } from "../../_components";
import { useCompanyService } from "../util/company-service"
import Table from "../../_components/table/table";

export default function CompanyOverview() {

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
    } = useCompanyService();

    const columns = [
        { name: "code", type: "text", label: "Code", colSpan: "4", textAlign: "left" },
        { name: "description", type: "text", label: "Description", colSpan: "8", textAlign: "left" }
    ];

    return (
        <div className=" h-full w-1/3 bg-white">
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