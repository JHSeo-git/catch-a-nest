import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from 'react-query';
import App from '@src/App';
import reportWebVitals from '@src/reportWebVitals';
import appInitialize from './states/appInitialize';
import DebugObserver from './components/DebugObserver';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={appInitialize}>
      <DebugObserver />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
