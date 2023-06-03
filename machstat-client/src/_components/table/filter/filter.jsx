import FilterBox from "./filter-box/filter-box";
import FilterComboBox from "./filter-combo-box/filter-combo-box";

export default function Filter({ columns, data, filterData, setFilterData, selectAllRows }) {
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
                            columns.map(column => {
                                switch (column.type) {
                                    case "text":
                                        return <FilterBox
                                            key={column.name}
                                            name={column.name}
                                            value={filterData[column.name]}
                                            setValue={setFilterData}
                                            className={`col-span-${column.colSpan}`}
                                        />;

                                    case "dropdown":
                                        return <FilterComboBox
                                            key={column.name}
                                            name={column.name}
                                            value={filterData[column.name]}
                                            items={Array.isArray(data) && [null, ...data.map(item => _getValue(item, column.name))]}
                                            setValue={setFilterData}
                                            className={`col-span-${column.colSpan}`}
                                        />;

                                        case "option":
                                            return <FilterBox
                                                key={column.name}
                                                name={column.name}
                                                value={filterData[column.name]}
                                                setValue={setFilterData}
                                                className={`col-span-${column.colSpan}`}
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