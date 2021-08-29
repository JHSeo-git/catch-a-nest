import { css } from '@emotion/react';
import palette from './palette';
import { resetButton } from './reset/resetButton';

export const HeaderButtonStyle = css`
  ${resetButton}
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 0.1875rem;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;
`;

export const HeaderLinkStyle = (isDarkMode: boolean) => css`
  ${HeaderButtonStyle};
  text-decoration: none;
  color: ${palette.grey[400]};
  &:hover {
    color: ${palette.grey[500]};
  }
  &:active {
    color: ${palette.grey[300]};
  }
  &:disabled {
    opacity: 0.6;
  }

  &.current {
    color: ${palette.blue[500]};
  }

  ${isDarkMode &&
  css`
    color: ${palette.grey[500]};

    &:hover {
      color: ${palette.grey[50]};
    }
    &:active {
      color: ${palette.grey[400]};
    }
    &.current {
      color: ${palette.lightBlue[400]};
    }
  `}
`;
