import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Home, Teams, Members } from '../../components/Main';
import { Header } from '../../components/shared/Header';
import { ThemeProvider } from '@material-ui/core';
import { Error404 } from '../../components/shared';
import '../../assets/fonts.css';
import '../../assets/global.css';
import theme from '../../shared/styles/theme';
import { QueryCache, ReactQueryCacheProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const Main = () => {
  const queryCache = new QueryCache();
  // const {isLoading, error, data} = useQuery()
  return (
    <>
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
              <ReactQueryCacheProvider queryCache={queryCache}>
                <Members />
              </ReactQueryCacheProvider>
            </Route>
            {/* <Route>
              <Error404 />
            </Route> */}
          </Switch>
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default Main;
