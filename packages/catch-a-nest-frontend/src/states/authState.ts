import { User } from '@src/lib/api/types';
import { atom, useRecoilState } from 'recoil';

export const googleTokenState = atom<string | null>({
  key: 'googleTokenState',
  default: null,
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export function useGoogleTokenState() {
  return useRecoilState(googleTokenState);
}

export function useUserState() {
  return useRecoilState(userState);
}
