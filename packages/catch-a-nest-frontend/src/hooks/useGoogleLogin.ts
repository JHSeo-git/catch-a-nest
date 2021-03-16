import googleLogin from '@src/lib/api/googleLogin';
import { useCallback } from 'react';

export default function useGoogleLogin() {
  const login = useCallback(async (accessToken: string) => {
    const user = await googleLogin(accessToken);
    // TODO: Agree terms
    return user;
  }, []);

  return login;
}
