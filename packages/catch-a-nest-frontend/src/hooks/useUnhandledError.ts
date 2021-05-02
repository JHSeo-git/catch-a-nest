import { useEffect } from 'react';

type Handler = (e: PromiseRejectionEvent) => void;

export default function useUnhandledError(handler: Handler) {
  useEffect(() => {
    window.addEventListener('unhandledrejection', handler);
    return () => {
      window.removeEventListener('unhandledrejection', handler);
    };
  }, [handler]);
}
