import { useFullScreenLoaderActions } from '@src/states/appState';
import { useEffect } from 'react';

export default function useFullScreenLoaderEffect(loading: boolean) {
  const { on, off } = useFullScreenLoaderActions();

  useEffect(() => {
    if (loading) {
      on();
    } else {
      off();
    }
    return () => {
      off();
    };
  }, [loading, on, off]);
}
