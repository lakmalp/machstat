import { useEffect, useState } from "react";
import { Button } from "../../_components";
import DialogBox from "../../_components/dialog-box/dialog-box";
import { useMqttMessageService } from "../util/mqttMessage-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function MqttMessageDialog() {
    const { dialogMode, showCrudDialog, closeCrudDialog, storeRecord, dialogData, pageState, updateRecord, apiErrors } = useMqttMessageService();
    const [localData, setLocalData] = useState();
    useEffect(() => {
        setLocalData(dialogData?.data);
    }, [dialogData]);

    return (
        <>
            <DialogBox show={showCrudDialog} close={closeCrudDialog}>
                <DialogBox.Title>Create MqttMessage</DialogBox.Title>
                <DialogBox.Content>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Name</label>
                            <input value={localData?.name || ''} name="name" onChange={(e) => setLocalData(prev => ({ ...prev, name: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" />
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors?.name && <div>{apiErrors?.name}</div>}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Node ID</label>
                            <select value={localData?.node_id} name="node_id" onChange={(e) => setLocalData(prev => ({ ...prev, node_id: e.target.value }))} className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text">
                                <option value=""></option>
                                {
                                    dialogData && dialogData.hasOwnProperty("nodes") && Array.isArray(dialogData.nodes || "") && dialogData.nodes.map(node => {
                                        return <option key={node.id} value={node.id}>{node.guid}</option>
                                    })
                                }
                            </select>
                            <div className="text-xs text-red-600 font-inter mt-1">{apiErrors?.node_id && <div>{apiErrors?.node_id}</div>}</div>
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