import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from '../../shared/typed/useSelector';

export const PrivateRoute = ({ children, ...rest }: any) => {
    const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
    return (
        <Route
            render={({ location }) =>
                isLoggedIn ? children : <Redirect to="/auth/login" />
            }
        />
    );
};
