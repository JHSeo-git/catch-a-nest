import React from 'react';
import { css, Global } from '@emotion/react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Posts from './pages/Posts';
import Layout from './components/Layout';
import Header from './components/Header';
import Write from './pages/Write';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Layout>
            <Layout.Header>
              <Header />
            </Layout.Header>
            <Layout.Main>
              <Route exact path="/">
                <Posts />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/write">
                <Write />
              </Route>
            </Layout.Main>
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
