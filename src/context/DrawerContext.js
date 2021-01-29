import React, { createContext, useState, useEffect } from 'react';

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const [abierto, estAbierto] = useState(false);
    const [ancho, estAncho] = useState(0);

    const abrir = () => {
        estAbierto(true);
    }

    const cerrar = () => {
        estAbierto(false);
    }

    const actAncho = () => {
        estAncho(window.innerWidth);
    }

    useEffect(() => {
        if (ancho === 0) {
            estAncho(window.innerWidth);
        }

        if (ancho >= 768) {
            cerrar();
        }

        window.addEventListener('resize', actAncho);
        return () => window.removeEventListener('resize', actAncho);
    }, [ancho]);

    return (
        <DrawerContext.Provider value={{ abierto, abrir, cerrar }}>
            {children}
        </DrawerContext.Provider>
    )
}
