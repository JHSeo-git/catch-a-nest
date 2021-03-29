import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import { useUserState } from '@src/states/authState';
import AppIcon from '../AppIcon';
import UserInfo from '../UserInfo';

export type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const [user] = useUserState();
  return (
    <section css={sectionStyle}>
      <button css={buttonStyle}>
        <AppIcon name="menu" />
      </button>
      {user && <UserInfo />}
    </section>
  );
};

const sectionStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const buttonStyle = css`
  ${resetButton}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  &:hover {
    svg,
    path {
      fill: ${palette.blueGrey[700]};
    }
  }
`;

export default Header;
