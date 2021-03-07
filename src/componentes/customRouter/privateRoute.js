import React, { useContext } from 'react';
import LoadingScreen from '../loading-screen';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ Component, ...rest }) => {

    const { logged, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingScreen />
    }

    if (logged) {
        return <Route {...rest} render={props => <Component {...props} />} />
    }
    else {
        return <Redirect to={{ pathname: "/login" }} />
    }
}