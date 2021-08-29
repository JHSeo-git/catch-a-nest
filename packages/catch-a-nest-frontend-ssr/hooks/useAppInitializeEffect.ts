import { useSetThemeState } from '@/lib/recoil/appState';
import { useSetUser } from '@/lib/recoil/authState';
import themeStorage from '@/lib/storage/themeStorage';
import userStorage from '@/lib/storage/userStorage';
import { useEffect } from 'react';

export default function useAppInitializeEffect() {
  const setUser = useSetUser();
  const setTheme = useSetThemeState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = userStorage.get();
      setUser(user);

      const theme = themeStorage.get();
      setTheme(theme ?? 'LIGHT');
    }
  }, [setUser]);
}
