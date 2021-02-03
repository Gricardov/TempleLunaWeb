import React, { createContext, useState, useEffect } from 'react';

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const [width, setWidth] = useState(0);

    const open = () => {
        setOpen(true);
    }

    const close = () => {
        setOpen(false);
    }

    const updWidth = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        if (width === 0) {
            setWidth(window.innerWidth);
        }

        if (width >= 768) {
            close();
        }

        window.addEventListener('resize', updWidth);
        return () => window.removeEventListener('resize', updWidth);
    }, [width]);

    return (
        <DrawerContext.Provider value={{ isOpen, open, close }}>
            {children}
        </DrawerContext.Provider>
    )
}
