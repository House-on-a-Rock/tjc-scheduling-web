import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../components/Home/Home';

const Main = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/home'}>
                    <Home />
                </Route>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
            </Switch>
        </Router>
    );
};

export default Main;
