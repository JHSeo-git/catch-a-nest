import React from 'react';
import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { rotateAnimation } from '@src/lib/styles/animation';
import { resetButton } from '@src/lib/styles/resetButton';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';

export type AppButtonProps = {
  text: string;
  onClick(): void;
  type?: ButtonType;
  loading?: boolean;
  preIconName?: IconType;
  size?: SizeType;
};

type SizeType = 'normal' | 'big' | 'small';
type ButtonType = 'primary' | 'normal' | 'secondary' | 'thirdary';

const AppButton = ({
  text,
  onClick,
  type = 'normal',
  loading = false,
  preIconName,
  size = 'normal',
}: AppButtonProps) => {
  return (
    <button css={buttonStyle(type, size)} onClick={onClick} disabled={loading}>
      {loading ? (
        <AppIcon className="spinner" name="spinner" />
      ) : (
        <>
          {preIconName && <AppIcon className="pre-icon" name={preIconName} />}
          {text}
        </>
      )}
    </button>
  );
};

const buttonStyle = (type: ButtonType, size: SizeType) => css`
  ${resetButton};
  cursor: pointer;
  height: 2.5rem;
  width: 8rem;
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
  justify-content: space-around;

  .spinner {
    animation: ${rotateAnimation} 1s ease-in-out infinite;
  }
  .pre-icon {
    height: 1rem;
    width: 1rem;
    color: ${palette.blueGrey[700]};
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    background: ${palette.grey[100]};
    .pre-icon {
      transform: translate3d(-0.25rem, 0, 0);
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

export default AppButton;
