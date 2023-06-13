import { useRef } from "react";
import FilterBox from "./filter-box/filter-box";
import FilterComboBox from "./filter-combo-box/filter-combo-box";

export default function Filter({ columns, visibleColumns, data, filterData, setFilterData, selectAllRows }) {
    var totalColCount = 0;
    const _getValue = (data, field) => {
        const keys = field.split(".");
        try {
            return keys.reduce((acc, curr, i) => {
                if (i === 0) {
                    return data[curr];
                }
                return acc[curr];
            }, "")
        } catch (e) {
            return "";
        }
    }

    return (
        <>
            <form>
                <div className='flex items-center bg-gray-100 h-9 pr-2'>
                    <div className='w-12 h-9 flex justify-center items-center'>
                        <input onChange={() => selectAllRows(prev => !prev)} type="checkbox" className="rounded-full border-gray-400 " />
                    </div>
                    <div className="w-full grid grid-cols-12 gap-4 items-center border-b h-9 bg-gray-100">
                        {
                            Array.isArray(visibleColumns) &&
                            visibleColumns
                                .map((column, i) => {
                                    if ((totalColCount + parseInt(columns.filter(col => col.name === column)[0].colSpan)) > 12) {
                                        console.log(totalColCount);
                                        return null;
                                    } else {
                                        totalColCount += parseInt(columns.filter(col => col.name === column)[0].colSpan);
                                    }
                                    switch (columns.filter(col => col.name === column)[0].type) {
                                        case "text":
                                            return <FilterBox
                                                key={column}
                                                name={column}
                                                value={filterData[column]}
                                                setValue={setFilterData}
                                                className={`col-span-${columns.filter(col => col.name === column)[0].colSpan}`}
                                            />;

                                        case "dropdown":
                                            return <FilterComboBox
                                                key={column}
                                                name={column}
                                                value={filterData[column]}
                                                items={Array.isArray(data) && [null, ...data.map(item => _getValue(item, column))]}
                                                setValue={setFilterData}
                                                className={`col-span-${columns.filter(col => col.name === column)[0].colSpan}`}
                                            />;

                                        case "option":
                                            return <FilterBox
                                                key={column}
                                                name={column}
                                                value={filterData[column]}
                                                setValue={setFilterData}
                                                className={`col-span-${columns.filter(col => col.name === column)[0].colSpan}`}
                                            />;

                                        default:
                                            break;
                                    }
                                })
                        }
                    </div>
                </div>
            </form>
        </>
    );
}