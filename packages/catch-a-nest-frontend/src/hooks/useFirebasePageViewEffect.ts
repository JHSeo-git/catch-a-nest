import logger from '@src/lib/logger';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function useFirebasePageViewEffect() {
  const history = useHistory();
  useEffect(() => {
    if (!history) return;
    history.listen((location) => {
      const pageLocation = `${window.location.origin}${location.pathname}`;
      logger.pageView(pageLocation);
    });
  }, [history]);
}
