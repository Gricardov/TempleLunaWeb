import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
import { setProfileStorage } from '../helpers/userStorage';

const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                setLogged(user);
            } else {
                setProfileStorage(null);
                setLogged(null);
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
