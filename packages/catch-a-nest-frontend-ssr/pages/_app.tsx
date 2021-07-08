import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { css, Global } from '@emotion/react';
import RecoilInitializer from '@/components/RecoilInitializer';
import RecoilDebugObserver from '@/components/RecoilDebugObserver';
import FullscreenLoader from '@/components/FullscreenLoader';
import { DefaultSEO } from '@/components/AppSEO/DefaultSEO';

const globalStyle = css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
  html,
  body,
  #__next {
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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSEO />
      <RecoilRoot>
        <RecoilInitializer />
        <RecoilDebugObserver />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Global styles={globalStyle} />
            <Component {...pageProps} />
            <FullscreenLoader />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
