import { faCaretLeft, faCaretRight, faClose, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Header({ columns, moveColumn, hideColumn, showColumn, visibleColumns }) {
    var headerTotalColCount = 0;
    const [visibleColSpanSum, setVisibleColSpanSum] = useState(0);
    const [columnChooserOn, setColumnChooserOn] = useState(false);

    useEffect(() => {
        let _visibleColSpanSum = columns.reduce((acc, curr) => {
            if (visibleColumns.includes(curr.name)) {
                acc += parseInt(curr.colSpan);
            }
            return acc;
        }, 0)

        setVisibleColSpanSum(_visibleColSpanSum);
    }, [visibleColumns])

    return (
        <>
            <div className={'w-full flex items-center bg-gray-100 rounded-lg h-12 mb-1 ' + (columnChooserOn ? "" : "hidden")}>
                <div className='w-12 flex items-center justify-center'>
                    <button className={"rounded-full hover:bg-gray-200 h-6 w-6 flex items-center justify-center "} onClick={() => setColumnChooserOn(prev => !prev)}>
                        <FontAwesomeIcon icon={faClose} className=" text-gray-500 fa-xs " />
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    {
                        columns
                            .filter(col => {
                                return !visibleColumns.includes(col.name);
                            })
                            .map((column, i, arr) => {
                                return (
                                    <div key={i} className="mr-4">
                                        <button
                                            onClick={() => showColumn(column.name)}
                                            disabled={(12 - visibleColSpanSum) < (columns.filter(col => col.name === column.name)[0].colSpan)}
                                            className={"text-xs shadow rounded p-1 " + ((12 - visibleColSpanSum) >= (columns.filter(col => col.name === column.name)[0].colSpan) ? "hover:bg-gray-50 bg-gray-100" : "text-gray-400")}
                                        >
                                            <FontAwesomeIcon icon={faSquarePlus} className=" fa-sm " /> {columns.filter(col => col.name === column.name)[0].label}
                                        </button>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
            <div className='w-full flex items-center bg-gray-100 rounded-t-lg h-8 pt-1'>
                <div className='w-12 flex items-center justify-center'>
                    <button className={" rounded-full hover:bg-gray-200 h-6 w-6 flex items-center justify-center " + (columnChooserOn ? "hidden" : "")} onClick={() => setColumnChooserOn(prev => !prev)}>
                        <FontAwesomeIcon icon={faCog} className=" text-gray-500 fa-xs " />
                    </button>
                </div>
                <div className="w-full grid grid-cols-12 gap-4 items-center bg-gray-100 rounded-tr-lg pr-2">
                    {
                        Array.isArray(visibleColumns) &&
                        visibleColumns
                            .map((column, i) => {
                                if (parseInt(headerTotalColCount) + parseInt(columns.filter(col => col.name === column)[0].colSpan) > 12) {
                                    return null;
                                } else {
                                    headerTotalColCount = parseInt(headerTotalColCount) + parseInt(columns.filter(col => col.name === column)[0].colSpan);
                                }
                                return (
                                    <div key={i} className={`col-span-${columns.filter(col => col.name === column)[0].colSpan} flex items-center`}>
                                        <div key={column} className={`text-${columns.filter(col => col.name === column)[0].textAlign}  text-xs font-semibold text-gray-500 `}>{columns.filter(col => col.name === column)[0].label}</div>
                                        <div className="flex items-center ml-2">
                                            <FontAwesomeIcon icon={faCaretLeft} className=" text-gray-300 hover:text-gray-500 fa-sm " onClick={() => moveColumn("L", column)} />
                                            <FontAwesomeIcon icon={faCaretRight} className=" text-gray-300 hover:text-gray-500 fa-sm " onClick={() => moveColumn("R", column)} />
                                            <FontAwesomeIcon icon={faTrashCan} className=" text-gray-300 hover:text-gray-500 fa-sm ml-2" onClick={() => hideColumn(column)} />
                                        </div>
                                    </div>
                                )
                            })}
                </div>
            </div>
        </>
    );
}