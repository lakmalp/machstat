import React, { useContext, useState } from "react";

const PageStateContext = React.createContext();

function usePageStateService() {
    return useContext(PageStateContext);
}

function PageStateServiceProvider({children}) {
    const [waiting, setWaiting] = useState(false);

    const PageState = {
        waiting,
        setWaiting
    }

    const value = {
        PageState
    }

    return (
        <PageStateContext.Provider value={value}>
            {children}
        </PageStateContext.Provider>
    )
}

export {usePageStateService, PageStateServiceProvider}