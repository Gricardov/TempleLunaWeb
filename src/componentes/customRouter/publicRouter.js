import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ Component, ...rest }) => {

    const { logged } = useContext(AuthContext);

    if (logged) {
        return <Redirect to={{ pathname: "/admin" }} />
    }
    else {
        return <Route {...rest} render={props => <Component {...props} />} />
    }
}
