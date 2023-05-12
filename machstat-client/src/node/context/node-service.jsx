import { faPlus, faRefresh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../_api/axios';
import { useMessageBoxService } from "../../_contexts/MessageBoxContext";
import { useOverlayService } from "../../_contexts/OverlayContext";

const ServiceContext = React.createContext();

export function useNodeService() {
    return useContext(ServiceContext);
}

export function NodeServiceProvider({ children }) {
    const { MessageBox } = useMessageBoxService();
    const { Overlay } = useOverlayService();

    const emptyObject = {
        guid: '',
        status: ''
    };

    const _sidebarInquireInit = { refresh: true, plus: true, edit: false, trash: false };

    const addCheckedWithFalse = (_data) => {
        let ret = [..._data].map(item => ({ id: item.id, checked: false }))
        return ret;
    }

    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sidebarInquireEnabled, setSidebarInquireEnabled] = useState(_sidebarInquireInit);
    const [serverData, setServerData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const [filterValues, setFilterValues] = useState(emptyObject);
    const [dialogData, setDialogData] = useState({});
    const [showCrudDialog, setShowCrudDialog] = useState(false);
    const [statuses, setStasuses] = useState();
    const [processing, setProcessing] = useState(false);

    const reloadPage = async () => {
        try {
            let res = await axios.get("/api/nodes");
            if (res.data.hasOwnProperty("statuses")) {
                setStasuses([null, ...res.data.statuses]);
            }

            if (res.data.hasOwnProperty("data")) {
                setServerData(res.data.data);
                setLocalData(res.data.data);
                setSelectedRows(addCheckedWithFalse(res.data?.data));
            }
        } catch (e) {
            null;
        }
    }

    useEffect(() => {
        handleFilter();
    }, [filterValues])

    useEffect(() => {
        ((async () => {
            await reloadPage();
        }))();
    }, [])

    useEffect(() => {
        if (Array.isArray(selectedRows) && (selectedRows.length > 0)) {
            let selectedRowCnt = selectedRows.filter(row => row.checked === true).length;
            if (selectedRowCnt >= 1) {
                setSidebarInquireEnabled(prev => ({ ...prev, trash: true }));
            } else {
                setSidebarInquireEnabled(prev => ({ ...prev, trash: false }));
            }
        }
    }, [selectedRows])

    const rowCheckboxClicked = (id) => {
        setSelectedRows(prev => [...prev.map(item => {
            if (item.id === id) {
                return { id: item.id, checked: !item.checked };
            }
            return item;
        })]);
    }

    const setAllCheckBoxes = (data, isChecked) => {
        return [...data.map(item => ({ id: item.id, checked: isChecked }))]
    }

    const sidebarButtons = [
        {
            name: "refresh",
            faIcon: faRefresh,
            iconEnabledClass: "text-gray-600",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        },
        {
            name: "_split_",
        },
        {
            name: "plus",
            faIcon: faPlus,
            iconEnabledClass: "text-gray-600",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        },
        {
            name: "trash",
            faIcon: faTrashAlt,
            iconEnabledClass: "text-red-600",
            iconDisabledClass: "text-red-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        }
    ];

    const sidebarClickHandler = async (action) => {
        switch (action) {
            case "plus":
                setDialogData();
                setShowCrudDialog(true);
                let res = await axios.get("/api/nodes/create");
                setDialogData(res.data);
                break;
            case "refresh":
                reloadPage();
                break;
            case "trash":
                await deleteRecords();
                break;

            default:
                break;
        }
    }

    const deleteRecords = async () => {
        setProcessing(true);
        let res = await MessageBox.show({
            title: "Deletion of records",
            message:
                <div>
                    The selected records will be deleted and cannot be recovered.
                    <div className='pt-3'>
                        Do you want to proceed?
                    </div>
                </div>,
            type: MessageBox.Constants.Type.Danger,
            buttons: MessageBox.Constants.Buttons.YesNo
        });
        if (res === MessageBox.Constants.Result.Yes) {
            let row_ids = selectedRows
                .filter(row => row.checked)
                .reduce((acc, curr) => {
                    acc = [...acc, curr.id];
                    return acc;
                }, []);
            await axios.patch(`/api/nodes/deleteBatch`, row_ids);
            reloadPage();
        }
        setProcessing(false);
    }

    const handleFilter = () => {
        setSelectedRows(prev => setAllCheckBoxes(prev, false));
        let _localData = [...serverData];
        Object.entries(filterValues).map(([field, value]) => {
            switch (field) {
                case "guid":
                case "status":
                    if (value !== '') {
                        _localData = _localData.filter(_data => {
                            try {
                                var re = new RegExp(value, 'g');
                                let res = _data[field].match(re);
                                return (res !== null)
                            } catch (e) {
                                return true;
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
        })
        setLocalData([..._localData]);
    }

    const closeCrudDialog = () => {
        setDialogData();
        setShowCrudDialog(false);
    }

    const store = async (data) => {
        setProcessing(true);
        let res = await MessageBox.show({
            title: "Addition of records",
            message:
                <div>
                    Record will be added to the Nodes collection.
                    <div className='pt-3'>Do you want to proceed?</div>
                </div>,
            type: MessageBox.Constants.Type.Information,
            buttons: MessageBox.Constants.Buttons.YesNo
        });
        if (res === MessageBox.Constants.Result.Yes) {
            Overlay.show();
            try {
                let res = await axios.post('/api/nodes', data);
                let _serverData = [res.data.data, ...serverData];
                setServerData(_serverData);
                setSelectedRows(addCheckedWithFalse(_serverData));
                setLocalData([..._serverData]);
                setShowCrudDialog(false);
            } catch (ex) {

            }
        }
        setProcessing(false);
        Overlay.hide();
    }

    const value = {
        processing,
        dialogData,
        sidebarButtons,
        sidebarClickHandler,
        statuses,
        filterValues,
        handleFilter,
        sidebarInquireEnabled,
        setSelectAllChecked,
        setFilterValues,
        localData,
        rowCheckboxClicked,
        showCrudDialog,
        closeCrudDialog,
        selectedRows,
        store
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}