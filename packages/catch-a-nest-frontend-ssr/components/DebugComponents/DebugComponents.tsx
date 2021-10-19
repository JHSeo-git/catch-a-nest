import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import RecoilDebugObserver from '../RecoilDebugObserver';

function DebugComponents() {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <RecoilDebugObserver />
    </>
  );
}

export default React.memo(DebugComponents);
