import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import { css } from '@emotion/react';
import ActiveLink from '../ActiveLink';

export type AppNavigationProps = {};

const AppNavigation = (props: AppNavigationProps) => {
  return (
    <nav css={block}>
      <ActiveLink to="/about" css={linkStyle} tabIndex={0}>
        About
      </ActiveLink>
    </nav>
  );
};

const block = css`
  display: flex;
  align-items: center;
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

  &.current {
    color: ${palette.blue[500]};
  }
`;

export default AppNavigation;
