import Headroom from 'react-headroom';
import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import { responsiveWidth } from '@/lib/styles/responsive';
import zIndex from '@/lib/styles/zIndex';

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
  return (
    <header>
      <Headroom disableInlineStyles={true} css={headerStyle}>
        {children}
      </Headroom>
    </header>
  );
};

export type FooterProps = {
  children: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  return <footer css={footerStyle}>{children}</footer>;
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
const headerStyle = css`
  height: 4rem;
  width: 100%;
  background: white;
  ${zIndex.fixedHeader};
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

const footerStyle = css`
  height: 3rem;
  border-top: 0.0625rem solid ${palette.blueGrey[50]};
`;

const mainStyle = css`
  position: relative;
  min-height: calc(100% - (4rem + 3rem));
  padding-top: 1rem;
  padding-bottom: 2rem;
  ${responsiveWidth};
`;

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
