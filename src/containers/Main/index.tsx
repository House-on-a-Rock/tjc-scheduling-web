import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home, Teams, Members } from '../../components/Main';
import { Header } from '../../components/shared/Header';
import { ThemeProvider } from '@material-ui/core';
import { Error404 } from '../../components/shared';
import '../../assets/fonts.css';
import theme from '../../shared/styles/theme';

const Main = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path={'/home'}>
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path={'/teams'}>
            <Teams />
          </Route>
          <Route path={'/members'}>
            <Members />
          </Route>
          {/* <Route>
                        <Error404 />
                    </Route> */}
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default Main;
