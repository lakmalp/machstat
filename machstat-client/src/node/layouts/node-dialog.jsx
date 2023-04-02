import { useState } from "react";
import { Button } from "../../_components";
import DialogBox from "../../_components/dialog-box/dialog-box";
import { useNodeService } from "../context/node-service";

export default function NodeDialog() {
    const { showCrudDialog, closeCrudDialog, commandDelete } = useNodeService();

    const create = async () => {
    }

    return (
        <>
            <DialogBox show={showCrudDialog} close={closeCrudDialog}>
                <DialogBox.Title>Create Node</DialogBox.Title>
                <DialogBox.Content>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">GUID</label>
                            <input className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text" />
                        </div>
                        <div>
                            <label className="block text-sm font-inter font-semibold text-gray-500">Status</label>
                            <select className="border text-sm rounded font-inter h-7 mt-1 px-1 text-gray-800 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 w-full" type="text">
                                <option>NotConfigurred</option>
                                <option>Offline</option>
                                <option>Online</option>
                                <option>Suspended</option>
                            </select>
                        </div>
                    </div>
                </DialogBox.Content>
                <DialogBox.Commands>
                    <Button caption="Create" name="create" onClick={create} className="px-3 h-8 rounded-md ml-2" />
                </DialogBox.Commands>
            </DialogBox>
        </>
    )
}