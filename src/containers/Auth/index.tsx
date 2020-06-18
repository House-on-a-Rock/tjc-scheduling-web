import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Login, AuthEmail } from '../../components/Auth';
import { ResetPassword } from './ResetPassword';

const Auth = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/login`}>
                <Login />
            </Route>
            <Route path={`${path}/forgotPassword`}>
                <AuthEmail
                    data={{
                        history: true,
                        title: 'Forgot Password',
                        description:
                            'Lost your password? Please enter your email address. You will receive a link to create a new password via email.',
                        type: 'Reset Password',
                    }}
                />
            </Route>
            <Route path={`${path}/resetPassword`}>
                <ResetPassword />
            </Route>
        </Switch>
    );
};

export default Auth;
