import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

const deleteModalState = atom<boolean>({
  key: 'deleteModalState',
  default: false,
});

const tempPostUseModalState = atom<boolean>({
  key: 'tempPostUseModalState',
  default: false,
});

const newTempArrivedState = atom<boolean>({
  key: 'newTempArrivedState',
  default: false,
});

export function useDeleteModalValue() {
  return useRecoilValue(deleteModalState);
}

export function useSetDeleteModalState() {
  return useSetRecoilState(deleteModalState);
}

export function useTempPostUseModalState() {
  return useRecoilState(tempPostUseModalState);
}

export function useNewTempArrivedState() {
  return useRecoilState(newTempArrivedState);
}

export function useNewTempArrivedActions() {
  const [newTempArrived, setNewTempArrived] = useRecoilState(
    newTempArrivedState
  );
  const on = () => {
    setNewTempArrived(true);
  };
  const off = () => {
    setNewTempArrived(false);
  };
  return {
    newTempArrived,
    on,
    off,
  };
}
