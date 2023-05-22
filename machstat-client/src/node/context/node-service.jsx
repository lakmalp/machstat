import { faEdit, faEllipsisV, faPlus, faRefresh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../_api/axios';
import { useMessageBoxService } from "../../_contexts/MessageBoxContext";
import { usePageStateService } from '../../_contexts/PageStateContext';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ServiceContext = React.createContext();

export function useNodeService() {
    return useContext(ServiceContext);
}

export function NodeServiceProvider({ children }) {
    const [searchParams] = useSearchParams();
    const { MessageBox } = useMessageBoxService();
    const { PageState } = usePageStateService();
    const navigate = useNavigate();

    const emptyObject = {
        guid: '',
        status: ''
    };

    const _sidebarInquireInit = { refresh: true, plus: true, edit: false, trash: false };

    const addCheckedWithFalse = (_data) => {
        let ret = [..._data].map(item => ({ id: item.id, checked: false }))
        return ret;
    }

    const DialogMode = {
        create: "create",
        edit: "edit"
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
    const [apiErrors, setApiErrors] = useState({});
    const [dialogMode, setDialogMode] = useState(DialogMode.create);
    const [pageNo, setPageNo] = useState(searchParams.get("pageNo"));
    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");

    const reloadPage = async () => {
        try {
            let res = await axios.get(`/api/nodes?pageNo=${pageNo}&searchQuery=${searchQuery}`);
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
            if (pageNo === null) {
                setPageNo(1);
                navigate(`/nodes?pageNo=1&searchQuery=`);
            }
            await reloadPage();
        }))();
    }, [])

    useEffect(() => {
        if (Array.isArray(selectedRows) && (selectedRows.length > 0)) {
            let selectedRowCnt = selectedRows.filter(row => row.checked === true).length;
            if (selectedRowCnt === 1) {
                setSidebarInquireEnabled(prev => ({ ...prev, trash: true, edit: true, more: true }));
            } else if (selectedRowCnt > 1) {
                setSidebarInquireEnabled(prev => ({ ...prev, trash: true, edit: false, more: true }));
            } else {
                setSidebarInquireEnabled(prev => ({ ...prev, trash: false, edit: false, more: false }));
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
            iconEnabledClass: "text-gray-500",
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
            iconEnabledClass: "text-gray-500",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        },
        {
            name: "edit",
            faIcon: faEdit,
            iconEnabledClass: "text-gray-500",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        },
        {
            name: "trash",
            faIcon: faTrashAlt,
            iconEnabledClass: "text-gray-500",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        },
        {
            name: "more",
            faIcon: faEllipsisV,
            iconEnabledClass: "text-gray-500",
            iconDisabledClass: "text-gray-300",
            bgEnabledClass: "hover:bg-gray-200",
            bgDisabledClass: ""
        }
    ];

    const sidebarClickHandler = async (action) => {
        switch (action) {
            case "plus":
                PageState.setWaiting(true);
                setDialogData();
                let res = await axios.get("/api/nodes/create");
                PageState.setWaiting(false);
                setDialogData(res.data);
                setShowCrudDialog(true);
                break;
            case "refresh":
                reloadPage();
                break;
            case "trash":
                await deleteRecords(selectedRows.filter(row => row.checked));
                break;
            case "edit":
                await editRecord(selectedRows.filter(row => row.checked)[0]);
                break;

            default:
                break;
        }
    }

    const editRecord = async (row) => {
        PageState.setWaiting(true);
        setApiErrors({})
        setDialogMode(DialogMode.edit);
        setDialogData();
        let res = await axios.get(`/api/nodes/${row.id}`);
        setDialogData(res.data);
        PageState.setWaiting(false);
        setShowCrudDialog(true);
    }

    const updateRecord = async (data) => {
        try {
            PageState.setWaiting(true);
            let res = await axios.put(`/api/nodes/${data.id}`, data);
            let _serverData = serverData.map(row => {
                if (row.id === data.id) {
                    return res.data.data;
                }
                return row;
            });
            setServerData(_serverData);
            setSelectedRows(addCheckedWithFalse(_serverData));
            setLocalData([..._serverData]);
            setShowCrudDialog(false);
            setApiErrors({})
        } catch (e) {
            setApiErrors(e.response.data.errors);
        }
        PageState.setWaiting(false);
    }

    const deleteRecords = async (rows) => {
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
            PageState.setWaiting(true);
            let row_ids = rows.reduce((acc, curr) => {
                acc = [...acc, curr.id];
                return acc;
            }, []);
            await axios.patch(`/api/nodes/deleteBatch`, row_ids);
            await reloadPage();
            PageState.setWaiting(false);
        }
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

    const storeRecord = async (data) => {
        setApiErrors({})
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
            try {
                PageState.setWaiting(true);
                let res = await axios.post('/api/nodes', data);
                let _serverData = [res.data.data, ...serverData];
                setServerData(_serverData);
                setSelectedRows(addCheckedWithFalse(_serverData));
                setLocalData([..._serverData]);
                setShowCrudDialog(false);
                setApiErrors({})
            } catch (e) {
                setApiErrors(e.response.data.errors);
            }
        } else {
            setApiErrors({})
        }
        PageState.setWaiting(false);
    }

    const value = {
        processing,
        dialogMode,
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
        storeRecord,
        updateRecord,
        apiErrors
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}