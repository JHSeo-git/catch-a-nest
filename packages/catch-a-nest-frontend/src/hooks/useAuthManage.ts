import { User } from '@src/lib/api/auth/types';
import userStorage from '@src/lib/storage/userStorage';
import { useUserState } from '@src/states/authState';
import { useCallback } from 'react';

export default function useAuthManage() {
  const [, setUserState] = useUserState();

  const loggedIn = useCallback(
    (user: User) => {
      setUserState(user);
      userStorage.set(user);
    },
    [setUserState]
  );

  const logout = useCallback(() => {
    setUserState(null);
    userStorage.clear();
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('logged out google');
      });
    } catch (e) {}
  }, [setUserState]);

  return {
    loggedIn,
    logout,
  };
}
