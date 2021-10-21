import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import RecoilInitializer from '@/components/RecoilInitializer';
import FullscreenLoader from '@/components/FullscreenLoader';
import { DefaultSEO } from '@/components/AppSEO/DefaultSEO';
import AppToastProvider from '@/components/AppToastProvider';
import FirebaseAnalytics from '@/components/FirebaseAnalytics';
import DebugComponents from '@/components/DebugComponents';
import {
  darkThemeClassName,
  globalCss,
  lightThemeClassName,
} from '@stitches.js';

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

  button: {
    border: 'none',
    m: 0,
    p: 0,
    color: 'inherit',
    font: 'inherit',
    background: 'transparent',
    WebkitFontSmoothing: 'inherit',
    MozOsxFontSmoothing: 'inherit',
    appearance: 'none',

    cursor: 'pointer',
  },

  a: {
    outline: 'none',
    m: 0,
    p: 0,
    color: 'inherit',
    font: 'inherit',
    textDecoration: 'none',
  },

  'h1, h2, h3, h4, h5, h6': {
    wordBreak: 'keep-all',
  },
  'p, span': {
    wordBreak: 'keep-all',
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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider
        disableTransitionOnChange
        attribute="class"
        value={{ light: lightThemeClassName, dark: darkThemeClassName }}
        defaultTheme="system"
      >
        <DefaultSEO />
        <RecoilRoot>
          <RecoilInitializer />
          <AppToastProvider />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
              <FullscreenLoader />
            </Hydrate>
            <DebugComponents />
          </QueryClientProvider>
        </RecoilRoot>
        <FirebaseAnalytics />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
