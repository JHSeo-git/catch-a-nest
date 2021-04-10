import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Posts from './pages/Posts';
import Layout from './components/Layout';
import Header from './components/Header';
import Write from './pages/Write';
import AppToast from './components/AppToast';
import Post from './pages/Post';
import ScrollToTop from './components/Layout/ScrollToTop';
import AppInfo from './components/AppInfo';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <AppToast />
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Layout>
            <Route exact path={['/', '/post/:slug', '/admin']}>
              <Layout.Header>
                <Header />
              </Layout.Header>
              <Switch>
                <Layout.Main>
                  <Route exact path="/">
                    <Posts />
                  </Route>
                  <Route exact path="/post/:slug">
                    <Post />
                  </Route>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                </Layout.Main>
              </Switch>
              <Layout.Footer>
                <AppInfo />
              </Layout.Footer>
            </Route>
            <Route path={'/write'}>
              <Write />
            </Route>
            <Route path={'/edit/:slug'}>
              <Edit />
            </Route>
          </Layout>
        </Switch>
      </BrowserRouter>
    </>
  );
}

const globalStyle = css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Ubuntu', Ubuntu, Roboto, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
