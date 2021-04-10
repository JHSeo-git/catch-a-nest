import { useCallback, useEffect, useState } from 'react';
import md from '@src/lib/utils/markdownItClient';
import { useObservedHeadingIdState } from '@src/states/editorState';
import { getScrollTop } from '@src/lib/utils/viewerUtils';

type UsePostGenerateEffectProps = {
  ref: React.RefObject<HTMLDivElement>;
  markdown: string;
  fixedTocPos?: number;
  tocLevel?: number;
};

type HeadingType = {
  id: string;
  top: number;
}[];

export default function usePostGenerateEffect({
  ref,
  markdown,
  fixedTocPos = 100,
  tocLevel = 4,
}: UsePostGenerateEffectProps) {
  const [tocEl, setTocEl] = useState<HTMLElement | null>(null);
  const [headers, setHeaders] = useState<HeadingType>([]);
  const [, setHeadingId] = useObservedHeadingIdState();

  const onActivateTOCHeading = useCallback(() => {
    if (!headers || headers.length === 0) return;
    const scrollTop = getScrollTop();
    const currentHeading = [...headers]
      .reverse()
      .find((header) => header.top - 16 <= scrollTop); // 16px = 1rem, margin-top
    if (!currentHeading) {
      setHeadingId(null);
      return;
    }
    setHeadingId(currentHeading.id);
  }, [setHeadingId, headers]);

  const onScroll = useCallback(() => {
    if (!tocEl) return;
    const { top } = tocEl.getBoundingClientRect();
    if (top < fixedTocPos) {
      tocEl.classList.add('fixed');
    } else {
      tocEl.classList.remove('fixed');
    }
    onActivateTOCHeading();
  }, [tocEl, fixedTocPos, onActivateTOCHeading]);

  useEffect(() => {
    if (!markdown) return;
    if (!ref?.current) return;
    const result = md.render('\n[[toc]]\n' + markdown);
    ref.current.innerHTML = result;
    setTocEl(ref.current.querySelector('nav'));

    const scrollTop = getScrollTop();
    const targetHeadingEl = Array.from({ length: tocLevel })
      .map((_, i) => `h${i + 1}`)
      .join(',');
    const targetHeadings: HeadingType = [
      ...ref.current.querySelectorAll<HTMLHeadingElement>(targetHeadingEl),
    ].map((h) => ({
      id: h.id,
      top: h.getBoundingClientRect().top + scrollTop,
    }));
    setHeaders(targetHeadings);
  }, [ref, markdown, tocLevel]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    if (!headers) return;
    if (headers.length === 0) return;
  }, [headers]);
}
