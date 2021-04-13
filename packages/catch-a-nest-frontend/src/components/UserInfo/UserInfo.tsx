import { css } from '@emotion/react';
import useAuthManage from '@src/hooks/useAuthManage';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import { useUserState } from '@src/states/authState';
import { NavLink } from 'react-router-dom';

export type UserInfoProps = {};

const UserInfo = (props: UserInfoProps) => {
  const [user] = useUserState();
  const { logout } = useAuthManage();

  if (!user) return null;

  return (
    <div css={block}>
      {user ? (
        <button css={buttonStyle} tabIndex={0} onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink css={linkStyle} to="/admin">
          Admin
        </NavLink>
      )}
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
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;
  color: ${palette.blueGrey[600]};
  &:hover {
    color: ${palette.blueGrey[400]};
  }
  &:active {
    color: ${palette.blueGrey[500]};
  }
  &:disabled {
    opacity: 0.6;
  }
`;

const linkStyle = css`
  ${buttonStyle};
  text-decoration: none;
`;

export default UserInfo;
