import React, { useContext } from 'react';
import LoadingScreen from '../loading-screen';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export const AnyRoute = ({ Component, ...rest }) => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingScreen />
    }

    return <Route {...rest} render={props => <Component {...props} />} />
}