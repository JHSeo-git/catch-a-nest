import React from 'react';
import { css, Global } from '@emotion/react';
import AppToast from './components/AppToast';
import { fontFamily } from './lib/styles/typography';
import { Helmet } from 'react-helmet-async';
import AppModal from './components/Modal/AppModal';
import AppRouter from './components/Router';
import FullscreenLoader from './components/FullscreenLoader';
function App() {
  return (
    <>
      <Helmet>
        <title>Seo Nest</title>
      </Helmet>
      <Global styles={globalStyle} />
      <AppModal />
      <AppToast />
      <AppRouter />
      <FullscreenLoader />
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
