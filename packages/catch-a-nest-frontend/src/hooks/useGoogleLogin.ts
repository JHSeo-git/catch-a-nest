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
    async (accessToken: string, adminMode: boolean = false) => {
      setGoogleTokenState(accessToken);
      try {
        const { user } = await googleLogin({ token: accessToken, adminMode });
        loggedIn(user);
      } catch (e) {
        setError('Google Login Error');
        history.push('/');
      } finally {
        console.log('Google Login Process finally');
      }
    },
    [setGoogleTokenState, loggedIn, history]
  );

  return {
    login,
    error,
  };
}
