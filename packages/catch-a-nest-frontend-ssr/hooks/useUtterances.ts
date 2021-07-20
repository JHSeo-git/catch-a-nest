import appConfig from '@/config/app.config';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
// import useIntersectionObserver from './useIntersectionObserver';

export function useUtterances() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();
  // lazy loading ... 굳이?
  // const entry = useIntersectionObserver(ref, true);

  const handleRegenerate = useCallback(() => {
    if (!ref?.current) return;
    // if (!entry) return;

    ref.current.childNodes.forEach((node) => {
      ref.current?.removeChild(node);
    });

    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', appConfig.utterances.repo);
    script.setAttribute('issue-term', appConfig.utterances.issueTerm);
    script.setAttribute('label', appConfig.utterances.label);
    script.setAttribute('theme', appConfig.utterances.theme);

    ref.current.appendChild(script);

    // FIXME: inline style clean up at specific inline style
    if (!document.head.firstChild) return;
    if (document.head.firstChild.nodeName.toLocaleLowerCase() === 'style') {
      document.head.removeChild(document.head.firstChild);
    }
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRegenerate);
    return () => {
      router.events.off('routeChangeComplete', handleRegenerate);
    };
  }, [router, handleRegenerate]);

  return ref;
}
