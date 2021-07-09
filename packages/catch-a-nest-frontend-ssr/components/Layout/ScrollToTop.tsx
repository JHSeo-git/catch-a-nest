import { useEffect } from 'react';
import { useLocation } from 'react-router';

export type ScrollToTopProps = {};

const ScrollToTop = (props: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
