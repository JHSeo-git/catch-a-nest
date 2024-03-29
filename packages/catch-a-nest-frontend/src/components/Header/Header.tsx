import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import media from '@src/lib/styles/media';
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
  ${media.custom(650)} {
    padding: 0 1rem;
  }
`;

const logoStyle = css`
  display: flex;
  align-items: center;
  img {
    height: 2.5rem;
  }
`;

export default Header;
