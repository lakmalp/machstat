import { useEffect, useState } from "react";
import { Button } from "../../_components";
import DialogBox from "../../_components/dialog-box/dialog-box";
import { useJobCardService } from "../util/jobCard-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function JobCardDialog() {
    const { dialogMode, showCrudDialog, closeCrudDialog, storeRecord, dialogData, pageState, updateRecord, apiErrors } = useJobCardService();
    const [localData, setLocalData] = useState();
    useEffect(() => {
        setLocalData(dialogData?.data);
    }, [dialogData]);

    return (
        <>
            <DialogBox show={showCrudDialog} close={closeCrudDialog}>
                <DialogBox.Title>Create JobCard</DialogBox.Title>
                <DialogBox.Content>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Code</label>
                            <input value={localData?.code || ''} name="code" onChange={(e) => setLocalData(prev => ({ ...prev, code: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" />
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors?.code && <div>{apiErrors?.code}</div>}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Description</label>
                            <input value={localData?.description || ''} name="description" onChange={(e) => setLocalData(prev => ({ ...prev, description: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" />
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors?.description && <div>{apiErrors?.description}</div>}</div>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">JobCard Type</label>
                            <select value={localData?.equipment_type_ref} name="equipment_type_ref" onChange={(e) => setLocalData(prev => ({ ...prev, equipment_type_ref: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text">
                                <option value=""></option>
                                {
                                    dialogData && dialogData.hasOwnProperty("equipment_types") && Array.isArray(dialogData.equipment_types || "") && dialogData.equipment_types.map(equipment_type => {
                                        return <option key={equipment_type.id} value={equipment_type.id}>{`${equipment_type.code}`}</option>
                                    })
                                }
                            </select>
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors?.equipment_type_ref && <div>{apiErrors?.equipment_type_ref}</div>}</div>
                        </div> */}
                    </div>
                </DialogBox.Content>
                <DialogBox.Commands>
                    <Button
                        disabled={pageState.waiting}
                        caption={
                            <>
                                {(pageState.waiting) && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
                                {(!pageState.waiting) && <div>Save</div>}
                                </>
                        }
                        name="save"
                        onClick={() => {
                            if (dialogMode === "create") {
                                storeRecord(localData)
                            } else if (dialogMode === "edit") {
                                updateRecord(localData)
                            }
                        }}
                        className="px-3 h-8 rounded-md ml-2" />
                </DialogBox.Commands>
            </DialogBox>
        </>
    )
}