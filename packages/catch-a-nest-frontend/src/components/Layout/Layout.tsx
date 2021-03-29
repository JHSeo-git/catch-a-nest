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

export type SideProps = {
  children: React.ReactNode;
};
const Side = ({ children }: SideProps) => {
  return <aside css={sideStyle}>{children}</aside>;
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Side = Side;

const layoutStyle = css`
  height: 100%;
`;
const headerStyle = css`
  margin-left: 16rem;
  height: 3.125rem;
  border-bottom: 0.0625rem solid ${palette.blueGrey[50]};
`;
const mainStyle = css`
  margin-left: 16rem;
  height: calc(100% - 3.125rem);
`;
const sideStyle = css`
  position: fixed;
  width: 16rem;
  height: 100%;
  left: 0;
  top: 0;
  border-right: 0.0625rem solid ${palette.blueGrey[50]};
`;

export default Layout;
