import { css } from '@emotion/react';
import useAuthManage from '@src/hooks/useAuthManage';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import { useUserState } from '@src/states/authState';

export type UserInfoProps = {};

const UserInfo = (props: UserInfoProps) => {
  const [user] = useUserState();
  const { logout } = useAuthManage();

  if (!user) return null;
  return (
    <div css={block}>
      <button css={buttonStyle} tabIndex={0} onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const block = css`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .name {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
  }
`;
const buttonStyle = css`
  ${resetButton}
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 0.1875rem;
  padding: 0.5rem 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  color: white;
  background: ${palette.blueGrey[600]};
  &:hover {
    background: ${palette.blueGrey[800]};
  }
  &:active {
    background: ${palette.blueGrey[500]};
  }
  &:disabled {
    opacity: 0.6;
  }
`;

export default UserInfo;
