import { useCallback, useEffect, useState } from 'react';
import md from '@src/lib/utils/markdownItClient';

type UsePostGenerateEffectProps = {
  ref: React.RefObject<HTMLDivElement>;
  markdown: string;
  fixedTocPos?: number;
};

export default function usePostGenerateEffect({
  ref,
  markdown,
  fixedTocPos = 100,
}: UsePostGenerateEffectProps) {
  const [tocEl, setTocEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!markdown) return;
    if (!ref?.current) return;
    const result = md.render('\n[[toc]]\n' + markdown);
    ref.current.innerHTML = result;
    setTocEl(ref.current.querySelector('nav'));
  }, [ref, markdown]);

  const onScroll = useCallback(() => {
    if (!tocEl) return;
    const { top } = tocEl.getBoundingClientRect();
    if (top < fixedTocPos) {
      tocEl.classList.add('fixed');
    } else {
      tocEl.classList.remove('fixed');
    }
  }, [tocEl, fixedTocPos]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
