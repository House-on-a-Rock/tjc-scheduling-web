import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home } from '../../components/Home';

import Toolbar from '@material-ui/core/AppBar';

const Main = () => {
    return (
        <>
            <Toolbar>
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
            </Toolbar>
        </>
    );
};

export default Main;
