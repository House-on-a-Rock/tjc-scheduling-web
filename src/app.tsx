import React from 'react';
import Auth from './containers/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/shared/PrivateRoute';
import Main from './containers/Main';
import './assets/fonts.css';
import './assets/global.css';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
