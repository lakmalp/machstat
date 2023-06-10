import { StatusIndicator } from "../../_components";
import { useSiteService } from "../util/site-service"
import Table from "../../_components/table/table";

export default function SiteOverview() {

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
    } = useSiteService();

    const columns = [
        { name: "code", type: "text", label: "Code", colSpan: "2", textAlign: "left" },
        { name: "description", type: "text", label: "Description", colSpan: "7", textAlign: "left" },
        { name: "site.company.code", type: "dropdown", label: "Company", colSpan: "3", textAlign: "left" }
    ];

    return (
        <div className=" h-full w-2/3 bg-white">
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