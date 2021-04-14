import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

const deleteModalState = atom<boolean>({
  key: 'deleteModalState',
  default: false,
});

export function useDeleteModalValue() {
  return useRecoilValue(deleteModalState);
}

export function useSetDeleteModalState() {
  return useSetRecoilState(deleteModalState);
}
