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
      <img src={user.photo_url || ''} alt="user avatar" />
      <div className="name">{user.display_name}</div>
      {/** sub info */}
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
    margin-right: 0.5rem;
  }
`;
const buttonStyle = css`
  ${resetButton}
  cursor: pointer;
  border-radius: 0.1875rem;
  color: ${palette.blueGrey[700]};
  &:hover {
    color: ${palette.blueGrey[900]};
  }
`;

export default UserInfo;
