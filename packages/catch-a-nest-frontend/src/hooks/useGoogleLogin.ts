import googleLogin from '@src/lib/api/auth/googleLogin';
import { useGoogleTokenState } from '@src/states/authState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import useAuthManage from './useAuthManage';

export default function useGoogleLogin() {
  const [, setGoogleTokenState] = useGoogleTokenState();
  const [error, setError] = useState<string | null>(null);
  const { loggedIn } = useAuthManage();
  const history = useHistory();

  const login = useCallback(
    async (accessToken: string) => {
      setGoogleTokenState(accessToken);
      try {
        const { user } = await googleLogin(accessToken);
        loggedIn(user);
      } catch (e) {
        setError('Google Login Error');
        history.push('/');
      } finally {
        console.log('Google Login finally');
      }
    },
    [setGoogleTokenState, loggedIn, history]
  );

  return {
    login,
    error,
  };
}
