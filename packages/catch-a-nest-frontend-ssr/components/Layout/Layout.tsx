import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import { responsiveWidth } from '@/lib/styles/responsive';
import { pageFadeInStyle } from '@/lib/styles/animation';
import { useThemeValue } from '@/lib/recoil/appState';
import { styled } from '@stitches.js';
import useHeaderScrolling from '@/hooks/useHeaderScrolling';

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <LayoutBox>{children}</LayoutBox>;
};

const LayoutBox = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  const { scrolled } = useHeaderScrolling();

  return <HeaderBox scrolled={scrolled}>{children}</HeaderBox>;
};

const HeaderBox = styled('header', {
  width: '100%',
  height: '60px',
  zIndex: '$fixed',
  bc: '$loContrast',

  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,

  border: '1px solid transparent',
  transition: 'border 0.2s ease-in-out',

  variants: {
    scrolled: {
      true: {
        borderBottom: '1px solid $colors$gray6',
      },
    },
  },
});

export type FooterProps = {
  children: React.ReactNode;
};

function Footer({ children }: FooterProps) {
  return <FooterBox>{children}</FooterBox>;
}

const FooterBox = styled('footer', {
  p: '$4',
  borderTop: '1px solid $colors$gray6',
});

export type MainProps = {
  children: React.ReactNode;
};
const Main = ({ children }: MainProps) => {
  return <MainBox>{children}</MainBox>;
};

const MainBox = styled('main', {
  position: 'relative',
  flex: '1',
});

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export default Layout;
