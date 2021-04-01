import { css } from '@emotion/react';
import GoogleLoginButton from '../GoogleLoginButton';

export type SignPanelProps = {};

const SignPanel = (props: SignPanelProps) => {
  return (
    <div css={block}>
      <div css={box}>
        <GoogleLoginButton />
      </div>
    </div>
  );
};

const block = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: linear-gradient(
      117.37deg,
      #d8f0fa 13.43%,
      rgba(255, 255, 255, 0.64) 88.2%
    ),
    #158dfc; */
`;

const box = css`
  width: 20rem;
`;

export default SignPanel;