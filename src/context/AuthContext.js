import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                setLogged(true)
            } else {
                setLogged(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ logged }}>
            {children}
        </AuthContext.Provider>
    )
}
