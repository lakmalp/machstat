import React from "react";

export default function DataSection({ columns, visibleColumns, data, onRowChecked, selectedRows }) {
    return (
        Array.isArray(data) && data.map((row, i) => {
            return (
                <div key={i} className='flex items-center h-9 hover:bg-gray-50 transition-colors pr-2'>
                    <div className='w-12 h-9 flex justify-center items-center border-b'>
                        <input
                            id={i}
                            onChange={(e) => onRowChecked(row.id)}
                            type="checkbox"
                            className="col-span-1 rounded-full border-gray-400 "
                            checked={selectedRows.filter(item => (item.id == row.id))[0].checked}
                        />
                    </div>
                    <div key={i} className="w-full grid grid-cols-12 gap-4 items-center border-b h-9">
                        {
                            Array.isArray(visibleColumns) && visibleColumns.map(column => {
                                return (
                                    <div key={column} className={`text-${columns.filter(col => col.name === column)[0].textAlign} col-span-${columns.filter(col => col.name === column)[0].colSpan} text-sm text-gray-800 font-roboto-mono`}>
                                        <ColumnData columnMeta={columns.filter(col => col.name === column)[0]} data={row} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        })
    );
}

const ColumnData = ({ columnMeta, data }) => {
    const _getValue = (_data, _column) => {
        const keys = _column.name.split(".");
        let ret = "";
        try {
            ret = keys.reduce((acc, curr, i) => {
                if (i === 0) {
                    return _data[curr];
                }
                return acc[curr];
            }, "")
        } catch (e) {
            ret = "";
        }
        return ret;
    }

    let Comp;

    if (columnMeta.hasOwnProperty("render")) {
        Comp = React.cloneElement(columnMeta.render, {value: _getValue(data, columnMeta)});
    } else {
        Comp = <>{_getValue(data, columnMeta)}</>;
    }

    return Comp;
}