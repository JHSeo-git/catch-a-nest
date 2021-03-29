import { css } from '@emotion/react';
import GoogleLoginButton from '../GoogleLoginButton';

export type SignPanelProps = {};

const SignPanel = (props: SignPanelProps) => {
  return (
    <div css={block}>
      <GoogleLoginButton />
    </div>
  );
};

const block = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignPanel;
