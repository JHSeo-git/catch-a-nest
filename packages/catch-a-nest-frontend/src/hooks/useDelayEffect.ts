import { useEffect, useState } from 'react';

export default function useDelayEffect(interval: number) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!shouldRender) {
      setShouldRender(true);
    } else {
      timeoutId = setInterval(() => setShouldRender(false), interval);
    }
    return () => clearTimeout(timeoutId);
  }, [interval, shouldRender]);

  return shouldRender;
}
