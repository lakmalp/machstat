import React, { useContext } from "react";

const MessageBoxContext = React.createContext();

export function useMessageBoxService() {
    return useContext(MessageBoxContext);
}

export function MessageBoxServiceProvider({children}) {    
    const [messageBoxProps, setMessageBoxProps] = useState();

    const MessageBox = {
        show: ({title, message, type, buttons}) => {
            setMessageBoxProps({title, message, type, buttons, visible: true});
        }
    }

    const value = {
        MessageBox,
        messageBoxProps
    }

    return (
        <MessageBoxContext.Provider value={value}>
            {children}
        </MessageBoxContext.Provider>
    )
}