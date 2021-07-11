import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import { css, Global } from '@emotion/react';
import RecoilInitializer from '@/components/RecoilInitializer';
import RecoilDebugObserver from '@/components/RecoilDebugObserver';
import FullscreenLoader from '@/components/FullscreenLoader';
import { DefaultSEO } from '@/components/AppSEO/DefaultSEO';
import AppToastProvider from '@/components/AppToastProvider';

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
  const { NODE_ENV } = process.env;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSEO />
      <RecoilRoot>
        {NODE_ENV !== 'production' && <RecoilDebugObserver />}
        <RecoilInitializer />
        <AppToastProvider />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Global styles={globalStyle} />
            <Component {...pageProps} />
            <FullscreenLoader />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
      {NODE_ENV === 'production' && (
        <>
          <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js" />
          <Script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js" />
          <Script
            defer
            dangerouslySetInnerHTML={{
              __html: `
                // Your web app's Firebase configuration
                // For Firebase JS SDK v7.20.0 and later, measurementId is optional
                var firebaseConfig = {
                  apiKey: 'AIzaSyAVhsch2_emuZmD9KLh3kVkRr3rSUm7m6g',
                  authDomain: 'catch-a-nest.firebaseapp.com',
                  projectId: 'catch-a-nest',
                  storageBucket: 'catch-a-nest.appspot.com',
                  messagingSenderId: '581628041764',
                  appId: '1:581628041764:web:622697f154d3faae6a16b1',
                  measurementId: 'G-H82Q5FTZYK',
                };
                // Initialize Firebase
                if(window?.firebase){
                  if(!firebase.apps.length){
                    firebase.initializeApp(firebaseConfig);                    
                  } else {
                    firebase.app();
                  }
                  firebase.analytics();
                }
              `,
            }}
          />
        </>
      )}
    </>
  );
}
export default MyApp;
