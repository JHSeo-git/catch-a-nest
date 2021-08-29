import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const screenLoadingState = atom<boolean>({
  key: 'screenLoadingState',
  default: false,
});

export type ThemeType = 'LIGHT' | 'DARK';
const themeState = atom<ThemeType>({
  key: 'themeState',
  default: 'LIGHT',
});

export function useScreenLoadingState() {
  return useRecoilState(screenLoadingState);
}

export function useSetScreenLoadingState() {
  return useSetRecoilState(screenLoadingState);
}

export function useScreenLoadingValue() {
  return useRecoilValue(screenLoadingState);
}

export function useThemeState() {
  return useRecoilState(themeState);
}

export function useSetThemeState() {
  return useSetRecoilState(themeState);
}

export function useThemeValue() {
  return useRecoilValue(themeState);
}
