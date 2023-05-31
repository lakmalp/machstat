import { useEffect, useState } from "react";
import { Button } from "../../_components";
import DialogBox from "../../_components/dialog-box/dialog-box";
import { useNodeService } from "../util/node-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function NodeDialog() {
    const { dialogMode, showCrudDialog, closeCrudDialog, storeRecord, dialogData, pageState, updateRecord, apiErrors } = useNodeService();
    const [localData, setLocalData] = useState();
    useEffect(() => {
        setLocalData(dialogData?.data);
    }, [dialogData]);

    return (
        <>
            <DialogBox show={showCrudDialog} close={closeCrudDialog}>
                <DialogBox.Title>Create Node</DialogBox.Title>
                <DialogBox.Content>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">GUID</label>
                            <input value={localData?.guid || ''} name="guid" onChange={(e) => setLocalData(prev => ({ ...prev, guid: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" disabled />
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors.guid && <div>{apiErrors.guid}</div>}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Status</label>
                            <select value={localData?.status} name="status" onChange={(e) => setLocalData(prev => ({ ...prev, status: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text">
                                <option>NotConfigurred</option>
                                <option>Offline</option>
                                <option>Online</option>
                                <option>Suspended</option>
                            </select>
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors.status && <div>{apiErrors.status}</div>}</div>
                        </div>
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