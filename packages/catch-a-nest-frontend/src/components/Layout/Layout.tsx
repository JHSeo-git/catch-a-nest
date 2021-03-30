import { css } from '@emotion/react';
import palette from '@src/lib/palette';

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
  return <header css={headerStyle}>{children}</header>;
};

export type MainProps = {
  children: React.ReactNode;
};
const Main = ({ children }: MainProps) => {
  return <main css={mainStyle}>{children}</main>;
};

Layout.Header = Header;
Layout.Main = Main;

const layoutStyle = css`
  height: 100%;
`;
const headerStyle = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  background: white;
  border-bottom: 0.0625rem solid ${palette.blueGrey[50]};
  z-index: 10;
`;
const mainStyle = css`
  padding-top: 5rem;
  height: 100%;
`;

export default Layout;
