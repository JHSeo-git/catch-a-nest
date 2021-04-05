import { useIsErrorState } from '@src/states/errorState';
import { useEffect } from 'react';

export default function useError() {
  const [isError, setIsError] = useIsErrorState();
  const on = () => setIsError(true);
  const off = () => setIsError(false);

  useEffect(() => {
    return () => {
      setIsError(false);
    };
  }, [setIsError]);

  return {
    on,
    off,
    isError,
  };
}
