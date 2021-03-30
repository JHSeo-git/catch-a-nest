import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import media from '@src/lib/styles/media';
import { useUserState } from '@src/states/authState';
import { NavLink } from 'react-router-dom';
import UserInfo from '../UserInfo';

export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const [user] = useUserState();
  return (
    <section css={sectionStyle}>
      <NavLink css={logoStyle} to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      {user && <UserInfo />}
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  margin-left: auto;
  margin-right: auto;
  // margin-left + margin-right: 800px;
  width: 80rem;
  ${media.xxl} {
    width: 58rem;
  }
  ${media.md} {
    width: 36rem;
  }
  ${media.xs} {
    width: 100%;
    margin: 0;
  }
`;

const logoStyle = css`
  img {
    height: 2.5rem;
  }
`;

export default Header;
