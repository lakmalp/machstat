import { useEffect, useState } from "react";
import { Button } from "../../_components";
import DialogBox from "../../_components/dialog-box/dialog-box";
import { useNodeService } from "../context/node-service";

export default function NodeDialog() {
    const { showCrudDialog, closeCrudDialog, store, dialogData } = useNodeService();
    const [localData, setLocalData] = useState();
    useEffect(() => {
        setLocalData(dialogData?.data);
    },[dialogData]);

    return (
        <>
            <DialogBox show={showCrudDialog} close={closeCrudDialog}>
                <DialogBox.Title>Create Node</DialogBox.Title>
                <DialogBox.Content>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">GUID</label>
                            <input value={localData?.guid} name="guid" onChange={(e) => setLocalData(prev => ({...prev, guid: e.target.value}))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" disabled />
                        </div>
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Status</label>
                            <select value={localData?.status} name="status" onChange={(e) => setLocalData(prev => ({...prev, status: e.target.value}))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text">
                                <option>NotConfigurred</option>
                                <option>Offline</option>
                                <option>Online</option>
                                <option>Suspended</option>
                            </select>
                        </div>
                        {/* <pre>
                            {
                                JSON.stringify(dialogData,null,2)
                            }
                        </pre> */}
                    </div>
                </DialogBox.Content>
                <DialogBox.Commands>
                    <Button caption="Create" name="create" onClick={() => store(localData)} className="px-3 h-8 rounded-md ml-2" />
                </DialogBox.Commands>
            </DialogBox>
        </>
    )
}