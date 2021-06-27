import { User } from '@/lib/api/auth/types';
import { useSetUser } from '@/lib/recoil/authState';
import userStorage from '@/lib/storage/userStorage';

export default function useAuthManage() {
  const setUser = useSetUser();
  // const { notify } = useAppToast();

  const loggedIn = (user: User) => {
    setUser(user);
    userStorage.set(user);

    // notify('Welcome! My Lord 👑', undefined, {
    //   hideProgressBar: true,
    //   position: 'top-center',
    // });
  };

  const loggedOut = () => {
    setUser(null);
    userStorage.clear();
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut();
    } catch (e) {}
  };

  return {
    loggedIn,
    loggedOut,
  };
}
