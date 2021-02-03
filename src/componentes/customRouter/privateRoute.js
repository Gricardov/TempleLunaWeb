import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ Component, ...rest }) => {

    const { logged } = useContext(AuthContext);

    if (logged) {
        return <Route {...rest} render={props => <Component {...props} />} />
    }
    else {
        return <Redirect to={{ pathname: "/login" }} />
    }
}