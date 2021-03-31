import { atom, useRecoilState, useSetRecoilState } from 'recoil';

export const fullScreenLoader = atom({
  key: 'fullScreenLoader',
  default: false,
});

export function useFullScreenLoaderActions() {
  const setFullScreenLoader = useSetRecoilState(fullScreenLoader);
  const on = () => setFullScreenLoader(true);
  const off = () => setFullScreenLoader(false);

  return { on, off };
}

export function useFullScreenLoaderState() {
  return useRecoilState(fullScreenLoader);
}
