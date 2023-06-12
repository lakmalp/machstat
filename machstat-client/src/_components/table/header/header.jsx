import { faCaretDown, faCaretLeft, faCaretRight, faChartBar, faChevronDown, faClose, faCog, faTableList } from "@fortawesome/free-solid-svg-icons";
import { } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({ columns, columnOrder, moveColumn, hideColumn, visibleColumns }) {
    return (
        <>
            <div className='w-full flex items-center bg-gray-100 rounded-lg h-12 mb-1'>
                <div className='w-12 flex items-center justify-center'>
                    <button className=" rounded-full hover:bg-gray-200 h-6 w-6 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClose} className=" text-gray-500 fa-xs " />
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    {columnOrder.filter((col, pos) => (pos > 11 || !visibleColumns.includes(col))).map((column, i) => {
                        return (
                            <div className="mr-4">
                                <button className="text-xs shadow rounded p-1 bg-gray-50 hover:bg-gray-100">+ {columns.filter(col => col.name === column)[0].label}</button>
                                {/* <input key={i} id={column} type="checkbox" className="rounded-full border-gray-400" />
                                <label for={column} className="ml-1 text-xs">{columns.filter(col => col.name === column)[0].label}</label> */}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='w-full flex items-center bg-gray-100 rounded-t-lg h-7'>
                <div className='w-12 flex items-center justify-center'>
                    <button className=" rounded-full hover:bg-gray-200 h-6 w-6 flex items-center justify-center">
                        <FontAwesomeIcon icon={faCog} className=" text-gray-500 fa-xs " />
                    </button>
                </div>
                <div className="w-full grid grid-cols-12 gap-4 items-center bg-gray-100 rounded-tr-lg pr-2">
                    {columnOrder.filter((col, pos) => (pos <= 11 && visibleColumns.includes(col))).map((column, i) => {
                        return (
                            <div className={`col-span-${columns.filter(col => col.name === column)[0].colSpan} flex items-center`}>
                                <div key={column} className={`text-${columns.filter(col => col.name === column)[0].textAlign}  text-xs font-semibold text-gray-500 `}>{columns.filter(col => col.name === column)[0].label}</div>
                                <div className="flex items-center ml-2">
                                    <FontAwesomeIcon icon={faCaretLeft} className=" text-gray-300 hover:text-gray-500 fa-sm " onClick={() => moveColumn("L", column)} />
                                    <FontAwesomeIcon icon={faCaretRight} className=" text-gray-300 hover:text-gray-500 fa-sm " onClick={() => moveColumn("R", column)} />
                                    <FontAwesomeIcon icon={faClose} className=" text-gray-300 hover:text-gray-500 fa-sm ml-2" onClick={() => hideColumn(column)} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}