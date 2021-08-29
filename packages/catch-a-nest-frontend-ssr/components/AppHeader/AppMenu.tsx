import React from 'react';
import { css } from '@emotion/react';
import AppIcon from '../AppIcon';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import ActiveLink from '../ActiveLink';
import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useUserValue } from '@/lib/recoil/authState';
import { useThemeValue } from '@/lib/recoil/appState';

type MenuProps = {
  name: string;
  to: string;
};

const Menu = ({ name, to }: MenuProps) => {
  const theme = useThemeValue();

  return (
    <li css={menuStyle(theme === 'DARK')}>
      <ActiveLink to={to}>{name}</ActiveLink>
    </li>
  );
};

export type AppMenuProps = {};

const AppMenu = (props: AppMenuProps) => {
  const userValue = useUserValue();
  const [visible, setVisible] = useState(false);
  const theme = useThemeValue();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickInSide = () => {
    setVisible(!visible);
  };
  const handleClickOutSide = () => {
    setVisible(false);
  };

  useOnClickOutside(ref, handleClickOutSide);

  return (
    <div ref={ref} css={block}>
      <button
        css={buttonStyle(visible, theme === 'DARK')}
        onClick={handleClickInSide}
      >
        <AppIcon name="threeDot" />
      </button>
      <ul css={menuListStyle(visible)} onClick={handleClickInSide}>
        <Menu name="Home" to="/posts" />
        <Menu name="About" to="/about" />
        {userValue && (
          <>
            <Menu name="New Post" to="/write" />
            <Menu name="Temp Posts" to="/temps" />
          </>
        )}
      </ul>
    </div>
  );
};

const block = css`
  margin-left: 1rem;
  top: 0.125rem;
  position: relative;
`;

const buttonStyle = (isVisible: boolean, isDarkMode: boolean) => css`
  ${resetButton};
  cursor: pointer;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  border-radius: 0.1875rem;

  transition: all 0.1s ease-in-out;

  svg {
    width: 1rem;
    height: 1rem;
    color: ${palette.blueGrey[500]};
    transition: all 0.1s ease-in-out;
  }

  &:hover {
    svg {
      color: ${palette.blueGrey[900]};
    }
  }
  ${isVisible &&
  css`
    svg {
      color: ${palette.blueGrey[900]};
    }
  `}

  ${isDarkMode &&
  css`
    svg {
      color: ${palette.grey[500]};
    }

    &:hover {
      svg {
        color: ${palette.grey[50]};
      }
    }

    ${isVisible &&
    css`
      svg {
        color: ${palette.grey[50]};
      }
    `}
  `}
`;

const menuListStyle = (visible: boolean) => css`
  list-style: none;
  position: absolute;
  padding: 0;
  margin: 0;
  top: 2rem;
  right: 0;

  width: 10rem;

  border-radius: 0.125rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /11%);
  overflow: hidden;

  display: none;
  ${visible &&
  css`
    display: block;
  `}
`;

const menuStyle = (isDarkMode: boolean) => css`
  a,
  button {
    ${resetButton}
    display: block;
    color: ${palette.blueGrey[700]};
    text-decoration: none;
    background-color: #fff;
    transition: all 0.1s ease-in-out;

    padding: 1rem;

    font-size: 1rem;

    ${isDarkMode &&
    css`
      background-color: ${palette.blueGrey[800]};

      color: ${palette.grey[300]};
    `}

    &:hover {
      background-color: ${palette.grey[50]};

      ${isDarkMode &&
      css`
        background-color: ${palette.blueGrey[900]};
      `}
    }
  }
`;

export default AppMenu;
