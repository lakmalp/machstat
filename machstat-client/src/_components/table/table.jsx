import { TableSidebar } from "..";
import DataSection from "./data-section/data-section";
import Filter from "./filter/filter";
import Header from "./header/header";

export default function Table({sidebarButtons, sidebarInquireEnabled, columns, localData, serverData, filterValues, setFilterValues, selectedRows, rowCheckboxClicked, setSelectAllChecked}) {
    return (
        <div className="w-full flex items-start">
            <TableSidebar sidebarButtons={sidebarButtons} className="rounded-lg py-1 bg-gray-100 px-1 " inquireEnabled={sidebarInquireEnabled} />
            <div className="w-full pl-2 font-inter">
                <Header columns={columns} />
                <Filter columns={columns} data={serverData} filterData={filterValues} setFilterData={setFilterValues} selectAllRows={setSelectAllChecked} />
                <DataSection columns={columns} data={localData} onRowChecked={rowCheckboxClicked} selectedRows={selectedRows} />
            </div>
        </div>
    )
}