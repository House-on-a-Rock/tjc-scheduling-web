import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Login from '../components/Auth/Login';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ResetPassword from '../components/Auth/ResetPassword';

const Auth = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/login`}>
                <Login />
            </Route>
            <Route path={`${path}/forgotPassword`}>
                <ForgotPassword />
            </Route>
            <Route path={`${path}/resetPassword/:token`}>
                <ResetPassword />
            </Route>
        </Switch>
    );
};

export default Auth;
