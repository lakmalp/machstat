import React, { useContext, useState } from "react";
var messageBoxResolveFunc;

const MessageBoxContext = React.createContext();

function useMessageBoxService() {
    return useContext(MessageBoxContext);
}

function MessageBoxServiceProvider({children}) {
    const MessageBoxConstants = {
        Type: {
            Information: 'information',
            Danger: 'danger',
            Success: 'success',
            Warning: 'warning'
        },
        Buttons: {
            YesNo: "YesNo",
            YesNoCancel: "YesNoCancel",
            YesCancel: "YesCancel",
            OkCancel: "OkCancel"
        },
        Result: {
            Ok: "Ok",
            Cancel: "Cancel",
            Yes: "Yes",
            No: "No"
        }
    };

    const initMessageBoxProps = {title:"", message:"", type:"", buttons:"", visible: false};

    const [messageBoxProps, setMessageBoxProps] = useState(initMessageBoxProps);

    const MessageBox = {
        show: async ({title, message, type, buttons}) => {
            setMessageBoxProps({title, message, type, buttons, visible: true});
            var promise = new Promise((resolve) => {
                messageBoxResolveFunc = resolve;
            });
            return await promise.then((result) => {
                setMessageBoxProps(prev => ({...prev, visible: false}));
                return (result === undefined ?  MessageBoxConstants.Result.Cancel : result);
            });
            
        }
    }

    MessageBox.Constants = MessageBoxConstants;
    MessageBox.Props = messageBoxProps;

    const value = {
        MessageBox
    }

    return (
        <MessageBoxContext.Provider value={value}>
            {children}
        </MessageBoxContext.Provider>
    )
}

export {useMessageBoxService, MessageBoxServiceProvider, messageBoxResolveFunc}