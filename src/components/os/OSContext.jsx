import React, { createContext, useContext, useState } from 'react';

const OSContext = createContext();

export const useOS = () => useContext(OSContext);

export const OSProvider = ({ children }) => {
    const [windows, setWindows] = useState([]); // { id, type, title, ... }
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(100);

    const openWindow = React.useCallback((id, component, title, props = {}) => {
        const newZ = zIndexCounter + 1;
        setZIndexCounter(newZ);
        setActiveWindowId(id);

        setWindows((prev) => {
            if (prev.find((w) => w.id === id)) {
                return prev.map(w => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w);
            }
            return [...prev, { id, component, title, zIndex: newZ, minimized: false, ...props }];
        });
    }, [zIndexCounter]);

    const closeWindow = React.useCallback((id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const focusWindow = React.useCallback((id) => {
        const newZ = zIndexCounter + 1;
        setZIndexCounter(newZ);
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ, minimized: false } : w));
    }, [zIndexCounter]);

    const maximizeWindow = React.useCallback((id) => {
        const newZ = zIndexCounter + 1;
        setZIndexCounter(newZ);
        setActiveWindowId(id);
        setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false, maximized: !w.maximized, zIndex: newZ } : w));
    }, [zIndexCounter]);

    const minimizeWindow = React.useCallback((id) => {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const restoreWindow = React.useCallback((id) => {
        focusWindow(id);
    }, [focusWindow]);

    const [wallpaper, setWallpaper] = useState(null); // null means default logo

    return (
        <OSContext.Provider value={{
            windows,
            activeWindowId,
            openWindow,
            closeWindow,
            focusWindow,
            minimizeWindow,
            maximizeWindow,
            restoreWindow,
            wallpaper,
            setWallpaper
        }}>
            {children}
        </OSContext.Provider>
    );
};
