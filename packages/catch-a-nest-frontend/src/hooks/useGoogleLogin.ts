import googleLogin from '@src/lib/api/auth/googleLogin';
import { useGoogleTokenState } from '@src/states/authState';
import { useCallback } from 'react';
import useAppToast from './useAppToast';
import useAuthManage from './useAuthManage';

export default function useGoogleLogin() {
  const [, setGoogleTokenState] = useGoogleTokenState();
  const { loggedIn } = useAuthManage();
  const { notify } = useAppToast();

  const login = useCallback(
    async (accessToken: string, adminMode: boolean = false) => {
      setGoogleTokenState(accessToken);
      try {
        const { user } = await googleLogin({ token: accessToken, adminMode });
        loggedIn(user);
      } catch (e) {
        if (e.response.status === 401) {
          notify(`Login Fail: ${e.response.statusText}`, 'error');
        }
      }
    },
    [setGoogleTokenState, loggedIn, notify]
  );

  return {
    login,
  };
}
