import { css } from '@emotion/react';
import { logo } from '@src/assets/images';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { useUserState } from '@src/states/authState';
import { NavLink } from 'react-router-dom';
import UserInfo from '../UserInfo';
import AppIcon from '../AppIcon';
import palette from '@src/lib/palette';

export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const [user] = useUserState();
  return (
    <section css={sectionStyle}>
      <NavLink css={logoStyle} to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      {user && (
        <NavLink css={linkStyle} to="/write">
          <AppIcon name="write" />
          <h2>Write</h2>
        </NavLink>
      )}
      <UserInfo />
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  ${responsiveWidth};
`;

const linkStyle = css`
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  svg {
    color: ${palette.blueGrey[800]};
    height: 1rem;
    margin-right: 0.25rem;
    transition: all 0.2s ease-in-out;
  }
  h2 {
    color: ${palette.blueGrey[800]};
    margin: 0;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    svg {
      color: ${palette.teal[500]};
    }
  }
`;

const logoStyle = css`
  img {
    height: 2.5rem;
  }
`;

export default Header;
