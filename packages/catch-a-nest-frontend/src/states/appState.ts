import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

export const fullScreenLoaderState = atom({
  key: 'fullScreenLoader',
  default: false,
});

export function useFullScreenLoaderActions() {
  const setFullScreenLoader = useSetRecoilState(fullScreenLoaderState);
  const on = () => setFullScreenLoader(true);
  const off = () => setFullScreenLoader(false);

  return { on, off };
}

export function useFullScreenLoaderState() {
  return useRecoilState(fullScreenLoaderState);
}

export function useFullScreenLoaderValue() {
  return useRecoilValue(fullScreenLoaderState);
}
