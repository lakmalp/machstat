import { useState } from "react";
import { TableSidebar } from "..";
import DataSection from "./data-section/data-section";
import Filter from "./filter/filter";
import Header from "./header/header";

export default function Table({ container, label, sidebarButtons, sidebarInquireEnabled, columns, localData, serverData, filterValues, setFilterValues, selectedRows, rowCheckboxClicked, setSelectAllChecked }) {
    let colCount = 0;
    const [visibleColumns, setVisibleColumns] = useState(JSON.parse(localStorage.getItem(container + ".visibleColumns")) ||
        columns
            .filter((col, i) => {
                if ((colCount + parseInt(col.colSpan)) <= 12) {
                    colCount += parseInt(col.colSpan);
                    return true;
                }
                return false;
            })
            .map(col => col.name)
    );

    const moveColumn = (direction, colName) => {
        switch (direction) {
            case "L":
                var idx = visibleColumns.indexOf(colName);
                if (idx > 0) {
                    var target = visibleColumns[idx - 1];
                    var _cols = [...visibleColumns];
                    _cols[idx] = target;
                    _cols[idx - 1] = colName;
                    setVisibleColumns(_cols);
                    localStorage.setItem(container + ".visibleColumns", JSON.stringify(_cols));
                }
                break;

            default:
                var idx = visibleColumns.indexOf(colName);
                if (idx < (visibleColumns.length - 1)) {
                    var target = visibleColumns[idx + 1];
                    var _cols = [...visibleColumns];
                    _cols[idx] = target;
                    _cols[idx + 1] = colName;
                    setVisibleColumns(_cols);
                    localStorage.setItem(container + ".visibleColumns", JSON.stringify(_cols));
                }
                break;
        }
    }

    const hideColumn = (colName) => {
        let _visibleColumns = [...visibleColumns];
        var i = _visibleColumns.indexOf(colName);
        _visibleColumns.splice(i, 1)
        setVisibleColumns([..._visibleColumns]);
        localStorage.setItem(container + ".visibleColumns", JSON.stringify(_visibleColumns));
    }

    const showColumn = (colName) => {
        let _visibleColumns = [...visibleColumns, colName];
        setVisibleColumns([..._visibleColumns]);
        localStorage.setItem(container + ".visibleColumns", JSON.stringify(_visibleColumns));
    }

    return (
        <>
            <h2 className="font-dm-sans text-lg py-2">{label}</h2>
            <div className="w-full flex items-start rounded-lg">
                <TableSidebar sidebarButtons={sidebarButtons} className="rounded-lg1 py-1 bg-gray-50 border-r1 px-1 " inquireEnabled={sidebarInquireEnabled} />
                <div className="w-full pl-2 font-inter">
                    <Header columns={columns} moveColumn={moveColumn} hideColumn={hideColumn} showColumn={showColumn} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
                    <Filter columns={columns} visibleColumns={visibleColumns} data={serverData} filterData={filterValues} setFilterData={setFilterValues} selectAllRows={setSelectAllChecked} />
                    <DataSection columns={columns} visibleColumns={visibleColumns} data={localData} onRowChecked={rowCheckboxClicked} selectedRows={selectedRows} />
                </div>
            </div>
        </>
    )
}