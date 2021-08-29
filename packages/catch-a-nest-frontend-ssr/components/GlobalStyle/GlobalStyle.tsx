import { css, Global } from '@emotion/react';
import { useThemeValue } from '@/lib/recoil/appState';
import palette from '@/lib/styles/palette';

export type GlobalStyleProps = {};

const GlobalStyle = (props: GlobalStyleProps) => {
  const theme = useThemeValue();

  return <Global styles={globalStyle(theme === 'DARK')} />;
};

const globalStyle = (isDarkMode: boolean) => css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Ubuntu', Ubuntu, Roboto, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    transition: background 0.2s ease-in-out;

    ${isDarkMode &&
    css`
      background-color: ${palette.blueGrey[900]};
    `}
  }
`;

export default GlobalStyle;
