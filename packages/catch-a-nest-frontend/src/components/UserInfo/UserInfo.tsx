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
      <div className="info">
        <img src={user.photo_url || ''} alt="user avatar" />
        <div className="name">{user.display_name}</div>
        {/** sub info */}
      </div>
      <button css={buttonStyle} tabIndex={0} onClick={logout}>
        Log out
      </button>
    </div>
  );
};

const block = css`
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    margin-right: 5rem;
    .name {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
`;
const buttonStyle = css`
  ${resetButton}
  cursor: pointer;
  border: 0.0625rem solid ${palette.blueGrey[300]};
  border-radius: 0.1875rem;
  width: 100%;
  height: 2rem;
  &:hover {
    border: 0.0625rem solid ${palette.blueGrey[500]};
  }
`;

export default UserInfo;
