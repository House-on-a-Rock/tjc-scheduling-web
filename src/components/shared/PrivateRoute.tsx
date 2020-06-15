import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const PrivateRoute = ({ children, ...rest }: any) => {
    const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);
    return (
        <Route
            render={({ location }) =>
                isLoggedIn ? children : <Redirect to="/auth/login" />
            }
        />
    );
};
