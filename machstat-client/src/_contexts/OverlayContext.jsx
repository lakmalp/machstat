import React, { useContext, useState } from "react";

const OverlayContext = React.createContext();

function useOverlayService() {
    return useContext(OverlayContext);
}

function OverlayServiceProvider({children}) {
    const [overlayShown, setOverlayShown] = useState(false);

    const Overlay = {
        show: () => setOverlayShown(true),
        hide: () => setOverlayShown(false),
        state: overlayShown
    }

    const value = {
        Overlay
    }

    return (
        <OverlayContext.Provider value={value}>
            {children}
        </OverlayContext.Provider>
    )
}

export {useOverlayService, OverlayServiceProvider}