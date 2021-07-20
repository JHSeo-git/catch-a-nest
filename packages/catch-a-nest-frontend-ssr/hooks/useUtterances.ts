import appConfig from '@/config/app.config';
import { useEffect, useState } from 'react';

export function useUtterances(commentNodeId: string) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('repo', appConfig.utterances.repo);
    script.setAttribute('issue-term', appConfig.utterances.issueTerm);
    script.setAttribute('label', appConfig.utterances.label);
    script.setAttribute('theme', appConfig.utterances.theme);

    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      if (!scriptParentNode?.firstChild) return;
      scriptParentNode.removeChild(scriptParentNode.firstChild);
      // FIXME: inline style clean up at specific inline style
      if (!document.head.firstChild) return;
      if (document.head.firstChild.nodeName.toLocaleLowerCase() === 'style') {
        document.head.removeChild(document.head.firstChild);
      }
    };
  }, [visible, commentNodeId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    const el = document.getElementById(commentNodeId);
    if (!el) return;

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [commentNodeId]);
}
