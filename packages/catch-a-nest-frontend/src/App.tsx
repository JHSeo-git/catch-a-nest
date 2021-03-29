import React from 'react';
import { css, Global } from '@emotion/react';
import Home from '@src/pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {/* Landing Page */}
            <Home />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default App;
