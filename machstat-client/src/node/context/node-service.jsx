import { faAngleRight, faAnglesRight, faEdit, faPlus, faRefresh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
    const [sidebarInquireEnabled, setSidebarInquireEnabled] = useState();
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
    const [pageSize, setPageSize] = useState(searchParams.get("pageSize"));
    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");

    useEffect(() => {
        ((async () => {
            if (pageNo === null) {
                setPageNo(1);
                setPageSize(10);
                navigate(`/nodes?pageNo=1&searchQuery=&pageSize=10`);
            }
            await refreshPage();
        }))();
    }, [])

    const refreshPage = async () => {
        try {
            PageState.setWaiting(true);
            let res = await axios.get(`/api/nodes?pageNo=${pageNo}&searchQuery=${searchQuery}&pageSize=${pageSize}`);
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
        PageState.setWaiting(false);
    }

    useEffect(() => {
        handleFilter();
    }, [filterValues])

    useEffect(() => {
        (async () => {
            navigate(`/nodes?pageNo=${pageNo}&searchQuery=${searchQuery}&pageSize=${pageSize}`);
            await refreshPage();
        })();
    }, [pageNo, searchQuery, pageSize])

    useEffect(() => {
        if (Array.isArray(selectedRows) && (selectedRows.length > 0)) {
            let selectedRowCnt = selectedRows.filter(row => row.checked === true).length;
            let new_state = {refresh: true, plus: true, previous: true, next: true};
            if (selectedRowCnt === 1) {
                new_state = { ...new_state, trash: true, edit: true, more: false };
            } else if (selectedRowCnt > 1) {
                new_state = { ...new_state, trash: true, edit: false, more: false };
            } else {
                new_state = { ...new_state, trash: false, edit: false, more: false };
            }
            setSidebarInquireEnabled(prev => ({ ...prev, ...new_state }));
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
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "_split_",
        },
        {
            name: "plus",
            faIcon: faPlus,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "edit",
            faIcon: faEdit,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "trash",
            faIcon: faTrashAlt,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "more",
            faIcon: faAnglesRight,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a ",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "_split_",
        },
        {
            name: "previous",
            faIcon: faAngleRight,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a -rotate-90",
            iconDisabledClass: "text-gray-300 h-4 w-4 -rotate-90",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
        {
            name: "_text_",
            value: pageNo,
            onChange: (val) => setPageNo(val)
        },
        {
            name: "next",
            faIcon: faAngleRight,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a rotate-90",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3 rotate-90",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: ""
        },
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
                refreshPage();
                break;
            case "trash":
                await deleteRecords(selectedRows.filter(row => row.checked));
                break;
            case "edit":
                await editRecord(selectedRows.filter(row => row.checked)[0]);
                break;
            case "previous":
                setPageNo(prev => parseInt(prev) - 1)
                break;
            case "next":
                setPageNo(prev => parseInt(prev) + 1)
                break;

            default:
                break;
        }
    }

    // start CRUD
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
            await refreshPage();
            PageState.setWaiting(false);
        }
    }
    // end CRUD

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
        apiErrors,
        pageNo,
        setPageNo
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    )
}