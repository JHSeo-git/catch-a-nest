import React from 'react';
import { css } from '@emotion/react';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import { rotateAnimation } from '@/lib/styles/animation';

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
  return (
    <button
      css={buttonStyle(type, size, hoverAnimationDirect)}
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
  hoverAnimationDirect: HoverAnimationDirect
) => css`
  ${resetButton};
  cursor: pointer;
  height: 2.5rem;
  min-width: 8rem;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
  font-weight: bold;
  color: ${palette.blueGrey[900]};
  transition: all 0.1s ease-in-out;
  background: ${palette.blueGrey[50]};

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

    &:hover {
      background: ${palette.lightBlue[300]};
    }

    &:active {
      background: ${palette.lightBlue[400]};
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

    &:hover {
      background: ${palette.blueGrey[300]};
    }

    &:active {
      background: ${palette.blueGrey[400]};
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

    &:hover {
      background: ${palette.red[300]};
    }

    &:active {
      background: ${palette.red[400]};
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
