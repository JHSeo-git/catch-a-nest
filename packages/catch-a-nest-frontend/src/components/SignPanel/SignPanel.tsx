import { css } from '@emotion/react';
import { useUserState } from '@src/states/authState';
import GoogleLoginButton from '../GoogleLoginButton';
import UserInfo from '../UserInfo';

export type SignPanelProps = {};

const SignPanel = (props: SignPanelProps) => {
  const [user] = useUserState();
  return <div css={block}>{user ? <UserInfo /> : <GoogleLoginButton />}</div>;
};

const block = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SignPanel;
