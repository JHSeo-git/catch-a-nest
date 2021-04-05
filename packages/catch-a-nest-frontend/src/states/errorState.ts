import { atom, useRecoilState } from 'recoil';

const isErrorState = atom({
  key: 'isErrorState',
  default: false,
});

export function useIsErrorState() {
  return useRecoilState(isErrorState);
}
