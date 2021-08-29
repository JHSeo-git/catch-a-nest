import Headroom from 'react-headroom';
import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import { responsiveWidth } from '@/lib/styles/responsive';
import zIndex from '@/lib/styles/zIndex';
import { pageFadeInStyle } from '@/lib/styles/animation';
import { useThemeValue } from '@/lib/recoil/appState';

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <div css={layoutStyle}>{children}</div>;
};

export type HeaderProps = {
  children: React.ReactNode;
};
const Header = ({ children }: HeaderProps) => {
  const theme = useThemeValue();

  return (
    <header>
      <Headroom disableInlineStyles={true} css={headerStyle(theme === 'DARK')}>
        {children}
      </Headroom>
    </header>
  );
};

export type FooterProps = {
  children: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  const theme = useThemeValue();

  return <footer css={footerStyle(theme === 'DARK')}>{children}</footer>;
}

export type MainProps = {
  children: React.ReactNode;
};
const Main = ({ children }: MainProps) => {
  return <main css={mainStyle}>{children}</main>;
};

const layoutStyle = css`
  height: 100%;
`;
const headerStyle = (isDarkMode: boolean) => css`
  height: 4rem;
  width: 100%;
  ${zIndex.fixedHeader};
  background-color: #ffffff;

  transition: background 0.2s ease-in-out;

  ${isDarkMode &&
  css`
    background-color: ${palette.blueGrey[900]};
  `}
  /* background: linear-gradient(
      110.7deg,
      rgba(255, 255, 255, 0.7) 1.64%,
      rgba(255, 255, 255, 0) 94.31%
    ),
    #c7f5db; */
  .headroom {
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: inherit;
    transition: box-shadow 200ms ease-in-out;
    z-index: inherit;
    &--scrolled {
      transition: transform 200ms ease-in-out;
    }
    &--unfixed {
      position: relative;
      transform: translateY(0);
    }
    &--unpinned {
      position: fixed;
      transform: translateY(-100%);
    }
    &--pinned {
      position: fixed;
      transform: translateY(0%);
      box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.22),
        0 0.4375rem 0.625rem rgba(0, 0, 0, 0.12);
    }
  }
`;

const footerStyle = (isDarkMode: boolean) => css`
  height: 3rem;
  border-top: 0.0625rem solid ${palette.blueGrey[50]};

  ${isDarkMode &&
  css`
    border-top: 0.0625rem solid ${palette.blueGrey[700]};
  `}
`;

const mainStyle = css`
  position: relative;
  min-height: calc(100% - (4rem + 3rem));
  padding-top: 1rem;
  padding-bottom: 2rem;
  ${responsiveWidth};
  ${pageFadeInStyle()};
`;

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
