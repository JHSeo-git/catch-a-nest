import { User } from '@src/lib/api/auth/types';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

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

export function useUserValue() {
  return useRecoilValue(userState);
}
