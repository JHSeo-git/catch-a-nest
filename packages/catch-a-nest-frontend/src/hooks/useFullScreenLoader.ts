import { useFullScreenLoaderActions } from '@src/states/appState';
import { useCallback } from 'react';

export default function useFullScreenLoader() {
  const { on, off } = useFullScreenLoaderActions();

  const manual = useCallback(
    (flag: boolean) => {
      return flag ? on() : off();
    },
    [on, off]
  );

  return { on, off, manual };
}
