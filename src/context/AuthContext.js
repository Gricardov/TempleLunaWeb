import React, { useContext, createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import { setProfileStorage, setAdminRequestType, setAdminMainTabIndex } from '../helpers/userStorage';
import { ThemeContext } from '../context/ThemeContext';

const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const { updateTheme } = useContext(ThemeContext);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                setLogged(user);
            } else {
                setLogged(null);
                setProfileStorage(null);
                setAdminRequestType(null);
                setAdminMainTabIndex(0);
                updateTheme('default');
            }
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ logged, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
