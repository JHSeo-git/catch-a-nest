import useGoogleLogin from '@src/hooks/useGoogleLogin';
import { useCallback, useEffect, useRef } from 'react';

export type GoogleLoginButtonProps = {};

const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const clickedRef = useRef(false);
  const login = useGoogleLogin();

  const onSuccess = useCallback(
    (googleUser: any) => {
      (window as any).googleUser = googleUser;
      if (!clickedRef.current) return;
      login(googleUser?.getAuthResponse().access_token);
    },
    [login]
  );
  const onFailure = useCallback((e: any) => {
    console.log(e);
  }, []);
  useEffect(() => {
    window.gapi?.signin2.render('google-login-button', {
      scope: 'profile email',
      longtitle: true,
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  }, [onSuccess, onFailure]);
  return (
    <div
      id="google-login-button"
      onClick={() => {
        clickedRef.current = true;
      }}
    ></div>
  );
};

export default GoogleLoginButton;
