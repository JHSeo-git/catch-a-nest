import googleLogin from '@src/lib/api/googleLogin';
import { useGoogleTokenState } from '@src/states/authState';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import useAuthManage from './useAuthManage';

export default function useGoogleLogin() {
  const [, setGoogleTokenState] = useGoogleTokenState();
  const { loggedIn } = useAuthManage();
  const history = useHistory();
  const login = useCallback(
    async (accessToken: string) => {
      setGoogleTokenState(accessToken);
      try {
        const { user } = await googleLogin(accessToken);
        loggedIn(user);
      } catch (e) {
        history.push('/');
      }
    },
    [setGoogleTokenState, loggedIn, history]
  );

  return login;
}
