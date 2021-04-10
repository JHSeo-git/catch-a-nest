// https://github.com/velopert/velog-client/blob/e5a60cd539/src/lib/utils.ts#L25
export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};
