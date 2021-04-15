import { User } from '@src/lib/api/auth/types';
import userStorage from '@src/lib/storage/userStorage';
import { useUserState } from '@src/states/authState';
import useAppToast from './useAppToast';

export default function useAuthManage() {
  const [, setUserState] = useUserState();
  const { notify } = useAppToast();

  const loggedIn = (user: User) => {
    setUserState(user);
    userStorage.set(user);
    notify('Welcome! My Lord 👑', undefined, {
      hideProgressBar: true,
      position: 'top-center',
    });
  };

  const logout = () => {
    setUserState(null);
    userStorage.clear();
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut();
    } catch (e) {}
  };

  return {
    loggedIn,
    logout,
  };
}
