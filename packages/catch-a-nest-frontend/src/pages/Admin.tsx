import { css } from '@emotion/react';
import GoogleLoginButton from '@src/components/GoogleLoginButton';

export type AdminProps = {};

const Admin = (props: AdminProps) => {
  return (
    <div css={block}>
      <GoogleLoginButton />
    </div>
  );
};

const block = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Admin;
