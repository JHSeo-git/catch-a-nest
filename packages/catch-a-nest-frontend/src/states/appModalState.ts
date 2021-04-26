import { useMemo } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export type AppModalStateType = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?(): void;
  onCancel?(): void;
  isDestructive?: boolean;
};

const defaultAppModalState: AppModalStateType = {
  visible: false,
  title: '',
  message: '',
  confirmText: 'OK',
  cancelText: 'CANCEL',
  onConfirm: undefined,
  onCancel: undefined,
  isDestructive: false,
};

const appModalState = atom<AppModalStateType>({
  key: 'globalModalState',
  default: defaultAppModalState,
});

export function useAppModalValue() {
  return useRecoilValue(appModalState);
}

type OpenModalParams = Omit<AppModalStateType, 'visible'>;

export function useAppModalActions() {
  const set = useSetRecoilState(appModalState);

  return useMemo(
    () => ({
      open(params: OpenModalParams) {
        set({
          ...defaultAppModalState,
          ...params,
          visible: true,
        });
      },
      close() {
        set((prev) => ({ ...prev, visible: false }));
      },
    }),
    [set]
  );
}
