import { useThemeState } from '@/lib/recoil/appState';
import themeStorage from '@/lib/storage/themeStorage';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import React, { useMemo } from 'react';

export type ThemeSwitchProps = {};

const ThemeSwitch = (props: ThemeSwitchProps) => {
  const [theme, setTheme] = useThemeState();
  const isDarkMode = useMemo(() => theme === 'DARK', [theme]);
  const onClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setTheme((prev) => {
      const curr = prev === 'DARK' ? 'LIGHT' : 'DARK';
      themeStorage.set(curr);
      return curr;
    });
  };

  return (
    <label htmlFor="theme-switch" css={switchBox(isDarkMode)} onClick={onClick}>
      <input id="theme-switch" type="checkbox" checked={isDarkMode} readOnly />
      <span className="toggleCircle">{theme[0]}</span>
    </label>
  );
};

const switchBox = (isDarkMode: boolean) => css`
  position: relative;
  cursor: pointer;

  width: 3.5rem;
  height: 2rem;

  border: 0.0625rem solid ${palette.blueGrey[300]};
  border-radius: 2rem;

  display: flex;
  align-items: center;

  background-color: ${palette.blueGrey[50]};

  transition: all 0.2s ease-in-out;

  ${isDarkMode &&
  css`
    border: 0.0625rem solid ${palette.blueGrey[500]};
    background-color: ${palette.blueGrey[600]};
  `}

  input[type='checkbox'] {
    border: 0;
    overflow: hidden;
    width: 0;
    height: 0;
  }

  .toggleCircle {
    position: absolute;
    top: 50%;
    left: 0.125rem;
    transform: translateY(-50%);
    height: 1.625rem;
    aspect-ratio: 1;
    border-radius: 50%;

    background-color: ${palette.blueGrey[50]};

    display: flex;
    align-items: center;
    justify-content: center;

    transition: inherit;

    font-size: 0.85rem;
    font-weight: bold;
    color: ${palette.blueGrey[700]};

    ${isDarkMode &&
    css`
      color: #ffffff;
      background-color: ${palette.blueGrey[900]};
      transform: translateY(-50%) translateX(calc(100% - 0.125rem));
    `}
  }
`;

export default ThemeSwitch;
