import React, { useRef, useState } from 'react';
import Script from 'next/script';
import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import AppIcon from '../AppIcon';
import useGoogleLoginEffect from '@/hooks/useGoogleLoginEffect';

export type GoogleLoginButtonProps = {};

const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [load, setLoad] = useState(false);

  useGoogleLoginEffect(buttonRef, load);

  return (
    <>
      <button css={button} ref={buttonRef}>
        <AppIcon name="google" />
        Sign in with Google
      </button>

      <Script
        onLoad={() => setLoad(true)}
        src="https://apis.google.com/js/api:client.js"
      ></Script>
    </>
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