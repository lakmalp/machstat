import { StatusIndicator } from "../../_components";
import { useJobCardService } from "../util/jobCard-service"
import Table from "../../_components/table/table";

export default function JobCardOverview() {

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
    } = useJobCardService();

    const columns = [
        { name: "description", type: "text", label: "Description", colSpan: "1", textAlign: "left" },
        { name: "schedule_date", type: "text", label: "Schedule Date", colSpan: "1", textAlign: "left" },
        { name: "actual_date", type: "text", label: "Actual Date", colSpan: "1", textAlign: "left" },
        { name: "site.code", type: "dropdown", label: "Site", colSpan: "1", textAlign: "left" },
        { name: "work_start_time", type: "text", label: "Work Start Time", colSpan: "2", textAlign: "left" },
        { name: "work_completed_time", type: "text", label: "Work Completed Time", colSpan: "2", textAlign: "left" },
        { name: "time_taken", type: "text", label: "Time Taken", colSpan: "1", textAlign: "left" },
        { name: "machine_shutoff_at", type: "text", label: "Machine Shutoff At", colSpan: "2", textAlign: "left" },
        { name: "machine_started_at", type: "text", label: "Machine Started At", colSpan: "2", textAlign: "left" },
        { name: "status", type: "text", label: "Status", colSpan: "1", textAlign: "left" },
        { name: "notes", type: "text", label: "Notes", colSpan: "1", textAlign: "left" },
        { name: "owner_user.name", type: "dropdown", label: "Owner", colSpan: "1", textAlign: "left" },
        { name: "authorizer_user.name", type: "dropdown", label: "Authorizer", colSpan: "1", textAlign: "left" },
        { name: "is_manual", type: "text", label: "Is Manual", colSpan: "1", textAlign: "left" }
    ];

    return (
        <div className=" h-full w-full bg-white">
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