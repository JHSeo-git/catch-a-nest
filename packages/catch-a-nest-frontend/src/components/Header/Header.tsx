import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { NavLink } from 'react-router-dom';
import UserInfo from '../UserInfo';

export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <section css={sectionStyle}>
      <NavLink css={logoStyle} to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <UserInfo />
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${responsiveWidth};
`;

const logoStyle = css`
  img {
    height: 2.5rem;
  }
`;

export default Header;
