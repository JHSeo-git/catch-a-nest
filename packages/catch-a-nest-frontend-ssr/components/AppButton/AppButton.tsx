import React from 'react';
import { css } from '@emotion/react';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import { rotateAnimation } from '@/lib/styles/animation';
import { useThemeValue } from '@/lib/recoil/appState';

export type AppButtonProps = {
  text: string;
  onClick(): void;
  type?: ButtonType;
  loading?: boolean;
  preIconName?: IconType;
  preIconColor?: string;
  size?: SizeType;
  hoverAnimationDirect?: HoverAnimationDirect;
};

type SizeType = 'normal' | 'big' | 'small';
type ButtonType = 'primary' | 'normal' | 'secondary' | 'thirdary';
type HoverAnimationDirect = 'left' | 'right' | 'up' | 'down';

const AppButton = ({
  text,
  onClick,
  type = 'normal',
  loading = false,
  preIconName,
  preIconColor = palette.blueGrey[900],
  size = 'normal',
  hoverAnimationDirect = 'left',
}: AppButtonProps) => {
  const theme = useThemeValue();

  return (
    <button
      css={buttonStyle(type, size, hoverAnimationDirect, theme === 'DARK')}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <AppIcon className="spinner" name="spinner" />
      ) : (
        <>
          {preIconName && (
            <AppIcon
              css={IconColorStyle(preIconColor)}
              className="pre-icon"
              name={preIconName}
            />
          )}
          {text}
        </>
      )}
    </button>
  );
};

const buttonStyle = (
  type: ButtonType,
  size: SizeType,
  hoverAnimationDirect: HoverAnimationDirect,
  isDarkTheme: boolean
) => css`
  ${resetButton};
  cursor: pointer;
  height: 2.5rem;
  min-width: 8rem;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;
  color: ${palette.blueGrey[900]};
  background: ${palette.blueGrey[50]};

  ${isDarkTheme &&
  css`
    color: ${palette.grey[100]};
    background: ${palette.blueGrey[700]};
  `}

  ${size === 'small' &&
  css`
    font-size: 1rem;
    height: 2rem;
    width: 5rem;
  `}

  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    animation: ${rotateAnimation} 1s ease-in-out infinite;
  }
  .pre-icon {
    height: 1rem;
    width: 1rem;
    transition: all 0.2s ease-in-out;
    margin-right: 0.5rem;
  }

  &:hover {
    background: ${palette.grey[100]};

    ${isDarkTheme &&
    css`
      background: ${palette.blueGrey[600]};
    `}

    .pre-icon {
      ${hoverAnimationDirect === 'left' &&
      css`
        transform: translate3d(-0.25rem, 0, 0);
      `}
      ${hoverAnimationDirect === 'right' &&
      css`
        transform: translate3d(0.25rem, 0, 0);
      `}
      ${hoverAnimationDirect === 'up' &&
      css`
        transform: translate3d(0, -0.25rem, 0);
      `}
      ${hoverAnimationDirect === 'down' &&
      css`
        transform: translate3d(0, 0.25rem, 0);
      `}
    }
  }
  &:active {
    background: ${palette.grey[200]};

    ${isDarkTheme &&
    css`
      background: ${palette.blueGrey[800]};
    `}
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${type === 'primary' &&
  css`
    border: none;
    color: white;
    background: ${palette.lightBlue[500]};

    ${isDarkTheme &&
    css`
      color: ${palette.grey[100]};
      background: ${palette.lightBlue[700]};
    `}

    &:hover {
      background: ${palette.lightBlue[300]};

      ${isDarkTheme &&
      css`
        background: ${palette.lightBlue[800]};
      `}
    }

    &:active {
      background: ${palette.lightBlue[400]};

      ${isDarkTheme &&
      css`
        background: ${palette.lightBlue[900]};
      `}
    }

    &:disabled {
      opacity: 0.6;
    }
  `}
  ${type === 'secondary' &&
  css`
    border: none;
    color: white;
    background: ${palette.blueGrey[500]};

    ${isDarkTheme &&
    css`
      color: ${palette.grey[100]};
      background: ${palette.blueGrey[700]};
    `}

    &:hover {
      background: ${palette.blueGrey[300]};

      ${isDarkTheme &&
      css`
        background: ${palette.blueGrey[600]};
      `}
    }

    &:active {
      background: ${palette.blueGrey[400]};

      ${isDarkTheme &&
      css`
        background: ${palette.blueGrey[800]};
      `}
    }

    &:disabled {
      opacity: 0.6;
    }
  `}
  ${type === 'thirdary' &&
  css`
    border: none;
    color: white;
    background: ${palette.red[500]};

    ${isDarkTheme &&
    css`
      color: ${palette.grey[100]};
      background: ${palette.red[700]};
    `}

    &:hover {
      background: ${palette.red[300]};

      ${isDarkTheme &&
      css`
        background: ${palette.red[600]};
      `}
    }

    &:active {
      background: ${palette.red[400]};

      ${isDarkTheme &&
      css`
        background: ${palette.red[800]};
      `}
    }

    &:disabled {
      opacity: 0.6;
    }
  `}
`;

const IconColorStyle = (color: string) => css`
  svg {
    color: ${color};
  }
`;

export default AppButton;
