import { css } from '@emotion/react';
import useAppToast from '@src/hooks/useAppToast';
import useGoogleLogin from '@src/hooks/useGoogleLogin';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import AppIcons from '../AppIcon';

export type GoogleLoginButtonProps = {};

const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { login } = useGoogleLogin();
  const history = useHistory();
  const { notify } = useAppToast();

  const onSuccess = useCallback(
    (googleUser: any) => {
      login(googleUser?.getAuthResponse(true).access_token, true).then(() => {
        history.push('/');
      });
    },
    [login, history]
  );

  const onFailure = useCallback(
    (e: any) => {
      notify('Failed Google Login');
    },
    [notify]
  );

  useEffect(() => {
    window.gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = window.gapi.auth2.init({
        client_id:
          '581628041764-0vigicm4si1kdn1bnobgj5onnpg1o2qm.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      auth2.attachClickHandler(buttonRef.current, {}, (googleUser: any) => {
        onSuccess(googleUser);
      });
      // attachSignin(document.getElementById('customBtn'));
    });
  }, [onSuccess, onFailure]);

  return (
    <button css={button} ref={buttonRef}>
      <AppIcons name="google" />
      Sign in with Google
    </button>
  );
};

const button = css`
  ${resetButton}
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.blueGrey[200]};
  background: white;
  height: 3.375rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: ${palette.blueGrey[800]};
  border-radius: 0.5rem;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  transition: all ease-in 0.125s;
  &:hover {
    box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /11%);
  }
`;

export default GoogleLoginButton;
