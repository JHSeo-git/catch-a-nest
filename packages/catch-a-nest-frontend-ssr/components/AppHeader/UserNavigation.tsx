import React from 'react';
import { css } from '@emotion/react';
import { useUserValue } from '@/lib/recoil/authState';
import useAuthManage from '@/hooks/useAuthManage';
import ActiveLink from '../ActiveLink';
import AppMenu from './AppMenu';
import { useThemeValue } from '@/lib/recoil/appState';
import { HeaderButtonStyle, HeaderLinkStyle } from '@/lib/styles/mixins';

export type UserNavigationProps = {};

const UserNavigation = (props: UserNavigationProps) => {
  const userState = useUserValue();
  const { logout } = useAuthManage();
  const theme = useThemeValue();

  return (
    <nav css={block}>
      {userState && (
        <>
          <ActiveLink
            to="/temps"
            css={HeaderLinkStyle(theme === 'DARK')}
            tabIndex={0}
          >
            Temp
          </ActiveLink>
          <button
            css={HeaderLinkStyle(theme === 'DARK')}
            tabIndex={0}
            onClick={() => logout()}
          >
            Logout
          </button>
        </>
      )}
      <AppMenu />
    </nav>
  );
};

const block = css`
  margin-left: auto;
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

export default UserNavigation;
