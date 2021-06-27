import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { css, Global } from '@emotion/react';
import Layout from '@/components/Layout';
import AppHeader from '@/components/AppHeader';
import AppInfo from '@/components/AppInfo';
import initialize from '@/lib/recoil/initialize';

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
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, [setLoad]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Seo Nest</title>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RecoilRoot initializeState={load ? initialize : undefined}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Global styles={globalStyle} />
            <Layout>
              <Layout.Header>
                <AppHeader />
              </Layout.Header>
              <Layout.Main>
                <Component {...pageProps} />
              </Layout.Main>
              <Layout.Footer>
                <AppInfo />
              </Layout.Footer>
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
export default MyApp;
