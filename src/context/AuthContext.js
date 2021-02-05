import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';
const auth = firebase.auth();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(function (user) {
            if (user) {
                setLogged(true)
            } else {
                setLogged(false);
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
