import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusIndicator, TableSidebar } from "../../_components";
import { useNodeService } from "../context/node-service"

export default function NodeOverview() {
    const {
        sidebarButtons,
        sidebarClickHandler,
        statuses,
        filterValues,
        handleFilter,
        sidebarInquireEnabled,
        setSelectAllChecked,
        setFilterValues,
        localData,
        rowCheckboxClicked
    } = useNodeService();

    const deleteRecords = async () => {
        let response = await MessageBox.show({
            title: "Deletion of records",
            message: "The selected records will be deleted and cannot be recovered.",
            type: MessageBoxConstants.Type.Danger,
            buttons: MessageBoxConstants.Buttons.OkCancel
        });

        if (response === MessageBoxConstants.Result.Ok) {
            // proceed
        }
    }

    return (
        <div className=" h-full w-1/2 bg-white">
            <div className="text-lg text-center w-full pt-2 pb-1 mb-2 font-semibold border-b"></div>
            <div className="flex items-start">
                <TableSidebar sidebarButtons={sidebarButtons} className="rounded-lg py-1 bg-gray-100 px-1 " inquireEnabled={sidebarInquireEnabled} clickHandler={(action) => sidebarClickHandler(action)} />
                <div className="w-full pl-2">
                    <div className='w-full flex items-center bg-gray-100 rounded-t-lg h-7'>
                        <div className='w-12 '></div>
                        <div className="w-full grid grid-cols-12 gap-4 items-center bg-gray-100 rounded-tr-lg">
                            <div className="text-left col-span-7 text-xs font-semibold text-gray-500">GUID</div>
                            <div className="text-left col-span-5 text-xs font-semibold text-gray-500">Status</div>
                        </div>
                    </div>
                    <form>
                        <div className='flex items-center bg-gray-100 h-9 pr-2'>
                            <div className='w-12 h-9 flex justify-center items-center'><input onChange={() => setSelectAllChecked(prev => !prev)} type="checkbox" className="rounded-full border-gray-400 " /></div>
                            <div className="w-full grid grid-cols-12 gap-4 items-center border-b h-9 bg-gray-100">
                                <FilterBox name="guid" value={filterValues.guid} setValue={setFilterValues} className=" col-span-7 " />
                                <FilterComboBox name="status" value={filterValues.status} setValue={setFilterValues} className="col-span-5" />
                            </div>
                        </div>
                    </form>
                    {
                        Array.isArray(localData) && localData.map((node, i) => {
                            return (
                                <div key={i} className='flex items-center h-9 hover:bg-gray-50 transition-colors pr-2'>
                                    <div className='w-12 h-9 flex justify-center items-center border-b'><input id={i} onChange={(e) => rowCheckboxClicked(node.id)} type="checkbox" className="col-span-1 rounded-full border-gray-400 " checked={selectedRows.filter(item => (item.id == node.id))[0].checked} /></div>
                                    <div key={i} className="w-full grid grid-cols-12 gap-4 items-center border-b h-9">
                                        <div className="text-left col-span-7 text-sm text-gray-600">{node.guid}</div>
                                        <div className="text-left col-span-5 text-sm text-gray-600 flex justify-center">
                                            <StatusIndicator status={node.status} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const FilterBox = ({ name, value, setValue, className }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <input type="text" name={name} value={value} onChange={(e) => setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className="w-full rounded py-0 text-left text-xs font-semibold border-0 border-b border-gray-300 text-gray-400 h-7 focus:ring-0" />
            <FontAwesomeIcon onClick={e => setValue(prev => ({ ...prev, guid: '' }))} className='-ml-4 text-gray-300 hover:text-gray-500' icon={faClose} />
        </div>
    )
}

const FilterComboBox = ({ name, value, setValue, items, className }) => {
    return (
        <select name={name} value={value} onChange={(e) => setValue(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            className={`rounded py-0 text-left text-xs font-semibold border-0 border-b border-gray-300 text-gray-400 h-7 focus:ring-0 ${className}`}>
            {
                Array.isArray(items) && items.map((item, i) => <option value={item} key={i}>{item}</option>)
            }
        </select>
    )
}