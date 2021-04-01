import { User } from '@src/lib/api/auth/types';
import userStorage from '@src/lib/storage/userStorage';
import { useUserState } from '@src/states/authState';

export default function useAuthManage() {
  const [, setUserState] = useUserState();

  const loggedIn = (user: User) => {
    setUserState(user);
    userStorage.set(user);
  };

  const logout = () => {
    setUserState(null);
    userStorage.clear();
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('logged out google');
      });
    } catch (e) {}
  };

  return {
    loggedIn,
    logout,
  };
}
