import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../components/Auth/Login';

// interface IProps {
//     exact?: boolean;
//     path: string;
//     component: React.ComponentType<any>;
// }

const Auth = () => {
    return (
        <>
            <Login />
        </>
    );
};

export default Auth;
