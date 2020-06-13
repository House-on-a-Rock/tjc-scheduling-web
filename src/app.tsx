import * as React from 'react';
import Auth from './containers/Auth';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
    const isLoggedIn = useSelector((state: RootState) => state.authReducer.isLoggedIn);

    return <>{isLoggedIn ? <Home /> : <Auth />}</>;
}
