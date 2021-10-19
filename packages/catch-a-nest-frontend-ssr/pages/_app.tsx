import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';
import { css, Global } from '@emotion/react';
import RecoilInitializer from '@/components/RecoilInitializer';
import FullscreenLoader from '@/components/FullscreenLoader';
import { DefaultSEO } from '@/components/AppSEO/DefaultSEO';
import AppToastProvider from '@/components/AppToastProvider';

import { ReactQueryDevtools } from 'react-query/devtools';
import RecoilDebugObserver from '@/components/RecoilDebugObserver';
import GlobalStyle from '@/components/GlobalStyle';

import { globalCss } from '../stitches.config';

const globalStyle = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  'html, body, #__next': {
    height: '100%',
  },

  body: {
    m: 0,
    fontFamily: '$base',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',

    bc: '$loContrast',

    '& .dark-theme': {
      bc: '$mauve1',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle();

  // set retry 3 time, retryDelay 3 sec
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retryDelay: 3000,
          },
        },
      })
  );
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
          {NODE_ENV !== 'production' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalStyle />
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
