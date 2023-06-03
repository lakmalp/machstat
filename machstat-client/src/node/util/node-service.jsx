import { faAngleRight, faAnglesRight, faEdit, faPlus, faRefresh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
    const emptyObject = {
        guid: '',
        status: ''
    };

    const DialogMode = {
        create: "create",
        edit: "edit"
    };
    
    let sidebar_button_states = {refresh: true, plus: true, previous: true, next: true};

    const [searchParams] = useSearchParams();
    const { MessageBox } = useMessageBoxService();
    const { PageState } = usePageStateService();
    const navigate = useNavigate();
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sidebarInquireEnabled, setSidebarInquireEnabled] = useState(sidebar_button_states);
    const [serverData, setServerData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const [filterValues, setFilterValues] = useState(emptyObject);
    const [dialogData, setDialogData] = useState({});
    const [showCrudDialog, setShowCrudDialog] = useState(false);
    const [statuses, setStasuses] = useState();
    const [apiErrors, setApiErrors] = useState({});
    const [dialogMode, setDialogMode] = useState(DialogMode.create);
    const [pageNo, setPageNo] = useState(searchParams.get("pageNo") || 1);
    const [pageSize, setPageSize] = useState(searchParams.get("pageSize") || 10);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");

    const endPointRef = useRef("nodes");

    const sidebarButtons = [
        {
            name: "refresh",
            faIcon: faRefresh,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: "",
            callback: async () => await refreshPage()
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
            buttonDisabledClass: "",
            callback: async () => await createRecord()
        },
        {
            name: "edit",
            faIcon: faEdit,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: "",
            callback: async () => await editRecord(selectedRows.filter(row => row.checked)[0])
        },
        {
            name: "trash",
            faIcon: faTrashAlt,
            iconEnabledClass: "text-gray-700 h-4 w-4 p-3 hover:text-pink-600a",
            iconDisabledClass: "text-gray-300 h-4 w-4 p-3",
            buttonEnabledClass: "hover:bg-gray-200",
            buttonDisabledClass: "",
            callback: async () => await deleteRecords(selectedRows.filter(row => row.checked))
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
            buttonDisabledClass: "",
            callback: () => setPageNo(prev => parseInt(prev) - 1)
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
            buttonDisabledClass: "",
            callback: () =>  setPageNo(prev => parseInt(prev) + 1)
        },
    ];

    const updateLocalState = (data) => {
        setServerData(data);
        setLocalData(data);
        setSelectedRows(prev => {
            return [...data].map(item => ({ id: item.id, checked: false }))
        });
    }

    const refreshPage = async () => {
        try {
            PageState.setWaiting(true);
            let res = await axios.get(`/api/${endPointRef.current}?pageNo=${pageNo}&searchQuery=${searchQuery}&pageSize=${pageSize}`);
            if (res.data.hasOwnProperty("statuses")) {
                setStasuses([ ...res.data.statuses]);
            }

            if (res.data.hasOwnProperty("data")) {
                updateLocalState(res.data.data);
            }
        } catch (e) {
            null;
        }
        PageState.setWaiting(false);
    }

    const setAllCheckBoxes = (data, isChecked) => {
        return [...data.map(item => ({ id: item.id, checked: isChecked }))]
    }

    const handleFilter = () => {
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

        setSelectedRows(prev => setAllCheckBoxes(prev, false));
        let _localData = [...serverData];
        let filterArr = Object.entries(filterValues);
        filterArr.map(([field, value]) => {
            switch (field) {
                case "guid":
                case "status":
                    if (value !== '') {
                        _localData = _localData.filter(_data => {
                            try {
                                var re = new RegExp(value, 'g');
                                let res = _getValue(_data, field).toString().match(re);
                                return (res !== null)
                            } catch (e) {
                                console.error(e);
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

    useEffect(() => {
        handleFilter();
    }, [filterValues])

    useEffect(() => {
        (async () => {
            navigate(`/${endPointRef.current}?pageNo=${pageNo}&searchQuery=${searchQuery}&pageSize=${pageSize}`);
            await refreshPage();
        })();
    }, [pageNo, searchQuery, pageSize])

    useEffect(() => {
        if (Array.isArray(selectedRows) && (selectedRows.length > 0)) {
            let selectedRowCnt = selectedRows.filter(row => row.checked === true).length;
            let new_state = {};
            if (selectedRowCnt === 1) {
                new_state = { ...sidebar_button_states, trash: true, edit: true, more: false };
            } else if (selectedRowCnt > 1) {
                new_state = { ...sidebar_button_states, trash: true, edit: false, more: false };
            } else {
                new_state = { ...sidebar_button_states, trash: false, edit: false, more: false };
            }
            setSidebarInquireEnabled(prev => ({ ...prev, ...new_state }));
        }
    }, [selectedRows])

    useEffect(() => {
        setSelectedRows(prev => setAllCheckBoxes(prev, selectAllChecked));
    }, [selectAllChecked, localData])

    const rowCheckboxClicked = (id) => {
        setSelectedRows(prev => [...prev.map(item => {
            if (item.id === id) {
                return { id: item.id, checked: !item.checked };
            }
            return item;
        })]);
    }

    // #region start CRUD
    const createRecord = async () => {
        PageState.setWaiting(true);
        setDialogData();
        let res = await axios.get(`/api/${endPointRef.current}/create`);
        PageState.setWaiting(false);
        setDialogData(res.data);
        setShowCrudDialog(true);
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
                let res = await axios.post(`/api/${endPointRef.current}`, data);
                let _serverData = [res.data.data, ...serverData];
                updateLocalState(_serverData);
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
        let res = await axios.get(`/api/${endPointRef.current}/${row.id}`);
        setDialogData(res.data);
        PageState.setWaiting(false);
        setShowCrudDialog(true);
    }

    const updateRecord = async (data) => {
        try {
            PageState.setWaiting(true);
            let res = await axios.put(`/api/${endPointRef.current}/${data.id}`, data);
            let _serverData = serverData.map(row => {
                if (row.id === data.id) {
                    return res.data.data;
                }
                return row;
            });
            updateLocalState(_serverData);
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
            await axios.delete(`/api/${endPointRef.current}/deleteBatch`, row_ids);
            await refreshPage();
            PageState.setWaiting(false);
        }
    }
    // #endregion end CRUD

    const closeCrudDialog = () => {
        setDialogData();
        setShowCrudDialog(false);
    }

    const value = {
        pageState: PageState,
        dialogMode,
        dialogData,
        sidebarButtons,
        statuses,
        filterValues,
        sidebarInquireEnabled,
        setSelectAllChecked,
        setFilterValues,
        localData,
        serverData,
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