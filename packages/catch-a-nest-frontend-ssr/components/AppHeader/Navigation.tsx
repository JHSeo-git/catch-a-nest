import { css } from '@emotion/react';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import ActiveLink from '../ActiveLink';
import { useUserValue } from '@/lib/recoil/authState';

export type NavigationProps = {};

const Navigation = (props: NavigationProps) => {
  const userState = useUserValue();

  if (!userState) return null;

  return (
    <nav css={block}>
      <ActiveLink to="/temps" css={linkStyle} tabIndex={0}>
        Temp
      </ActiveLink>
      <button
        css={buttonStyle}
        tabIndex={0}
        onClick={() => console.log('logout')}
      >
        Logout
      </button>
    </nav>
  );
};

const block = css`
  display: flex;
  align-items: center;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  .name {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
  }
`;
const buttonStyle = css`
  ${resetButton}
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 0.1875rem;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;
  color: ${palette.blueGrey[600]};
  &:hover {
    color: ${palette.blueGrey[400]};
  }
  &:active {
    color: ${palette.blueGrey[500]};
  }
  &:disabled {
    opacity: 0.6;
  }
`;

const linkStyle = css`
  ${buttonStyle};
  text-decoration: none;
  color: ${palette.grey[400]};
  &:hover {
    color: ${palette.blueGrey[400]};
  }
  &:active {
    color: ${palette.blueGrey[500]};
  }

  &[aria-current='page'] {
    color: ${palette.blue[500]};
  }
`;

export default Navigation;
