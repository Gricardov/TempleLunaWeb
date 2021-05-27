import React, { createContext, useState, useEffect } from 'react';
import { getTheme, saveTheme } from '../helpers/userStorage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        // Solo aplica para claro y oscuro
        const savedTheme = getTheme();
        if (savedTheme == 'dark') {
            updateTheme('default');
        } else {
            updateTheme('dark');
        }
    }

    const updateTheme = (theme) => {
        saveTheme(theme);
        setTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    useEffect(() => {
        const savedTheme = getTheme();
        if (savedTheme) {
            setTheme(theme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
