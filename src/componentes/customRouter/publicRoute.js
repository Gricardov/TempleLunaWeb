import React, { useContext } from 'react';
import LoadingScreen from '../loading-screen';
import { AuthContext } from '../../context/AuthContext';
import { Redirect, Route } from 'react-router-dom';
import { getRandomContributorName } from '../../helpers/functions';

export const PublicRoute = ({ Component, ...rest }) => {

    const { logged, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingScreen text={'Powered by ' + getRandomContributorName()} />
    }

    if (logged) {
        return <Redirect to={{ pathname: "/admin" }} />
    }
    else {
        return <Route {...rest} render={props => <Component {...props} />} />
    }
}