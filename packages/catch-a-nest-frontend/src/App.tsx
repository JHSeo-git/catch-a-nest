import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Admin from './pages/Admin';
import Posts from './pages/Posts';
import Layout from './components/Layout';
import Header from './components/Header';
import Write from './pages/Write';
import AppToast from './components/AppToast';
import Post from './pages/Post';
import ScrollToTop from './components/Layout/ScrollToTop';
import AppInfo from './components/AppInfo';
import { fontFamily } from './lib/styles/typography';
import Error from './pages/Error';
import TempPosts from './pages/TempPosts';
import { Helmet } from 'react-helmet-async';
import AppModal from './components/Modal/AppModal';

function App() {
  return (
    <>
      <Helmet>
        <title>Seo Nest</title>
      </Helmet>
      <Global styles={globalStyle} />
      <AppModal />
      <AppToast />
      <BrowserRouter>
        <ScrollToTop />
        <Switch>
          <Route exact path={['/', '/temps', '/post/:slug', '/admin']}>
            <Layout>
              <Layout.Header>
                <Header />
              </Layout.Header>
              <Switch>
                <Layout.Main>
                  <Route exact path="/">
                    <Posts />
                  </Route>
                  <Route path="/temps">
                    <TempPosts />
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
            </Layout>
          </Route>
          <Route exact path={'/write/:slug?'}>
            <Write />
          </Route>
          <Route exact path="/error">
            <Error />
          </Route>
          <Redirect to="/error" />
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
    ${fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
