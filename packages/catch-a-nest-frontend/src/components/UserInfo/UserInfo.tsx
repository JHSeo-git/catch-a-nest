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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  color: white;
  background: ${palette.blueGrey[600]};
  &:disabled {
    opacity: 0.6;
  }
`;

const linkStyle = css`
  ${buttonStyle};
  text-decoration: none;
`;

export default UserInfo;
