import { useState } from "react";
import { TableSidebar } from "..";
import DataSection from "./data-section/data-section";
import Filter from "./filter/filter";
import Header from "./header/header";

export default function Table({sidebarButtons, sidebarInquireEnabled, columns, localData, serverData, filterValues, setFilterValues, selectedRows, rowCheckboxClicked, setSelectAllChecked}) {
    const [columnOrder, setColumnOrder] = useState(columns.map(col => col.name));
    const [visibleColumns, setVisibleColumns] = useState(columns.filter((col, i) => i <= 11).map(col => col.name));

    const moveColumn = (direction, colName) => {
        switch (direction) {
            case "L":
                var idx = columnOrder.indexOf(colName);
                if (idx > 0) {
                    var target = columnOrder[idx-1];
                    var _cols = [...columnOrder];
                    _cols[idx] = target;
                    _cols[idx-1] = colName;
                    setColumnOrder(_cols);
                }
                break;
        
            default:
                var idx = columnOrder.indexOf(colName);
                if (idx < (columnOrder.length-1)) {
                    var target = columnOrder[idx + 1];
                    var _cols = [...columnOrder];
                    _cols[idx] = target;
                    _cols[idx + 1] = colName;
                    setColumnOrder(_cols);
                }
                break;
        }
    }

    const hideColumn = (colName) => {
        let _visibleColumns = [...visibleColumns];
        var i = _visibleColumns.indexOf(colName);
        _visibleColumns.splice(i, 1)
        setVisibleColumns([..._visibleColumns]);
    }

    return (
        <>
        <div className="w-full flex items-start">
            <TableSidebar sidebarButtons={sidebarButtons} className="rounded-lg py-1 bg-gray-100 px-1 " inquireEnabled={sidebarInquireEnabled} />
            <div className="w-full pl-2 font-inter">
                <Header columns={columns} columnOrder={columnOrder} moveColumn={moveColumn} hideColumn={hideColumn} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
                <Filter columns={columns} columnOrder={columnOrder} visibleColumns={visibleColumns} data={serverData} filterData={filterValues} setFilterData={setFilterValues} selectAllRows={setSelectAllChecked} />
                <DataSection columns={columns} columnOrder={columnOrder} visibleColumns={visibleColumns} data={localData} onRowChecked={rowCheckboxClicked} selectedRows={selectedRows} />
            </div>
        </div>
        {/* {
            JSON.stringify(columnOrder.filter((col, pos) => (pos <= 11 && visibleColumns.includes(col))))
        } */}
        </>
    )
}