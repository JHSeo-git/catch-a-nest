import React from 'react';
import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { rotateAnimation } from '@src/lib/styles/animation';
import { resetButton } from '@src/lib/styles/resetButton';
import AppIcon from '../AppIcon';
import { IconType } from '../AppIcon/AppIcon';

export type NewPostButtonProps = {
  text: string;
  onClick(): void;
  type?: ButtonType;
  loading?: boolean;
  preIconName?: IconType;
};

type ButtonType = 'primary' | 'normal';

const NewPostButton = ({
  text,
  onClick,
  type = 'normal',
  loading = false,
  preIconName,
}: NewPostButtonProps) => {
  return (
    <button css={buttonStyle(type)} onClick={onClick} disabled={loading}>
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

const buttonStyle = (type: ButtonType) => css`
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
  background: white;
  border: 0.0625rem solid ${palette.blueGrey[300]};

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
    .pre-icon {
      transform: translate3d(-0.25rem, 0, 0);
    }
  }
  &:disabled {
    cursor: not-allowed;
    background: ${palette.blueGrey[100]};
  }

  ${type === 'primary' &&
  css`
    border: none;
    color: white;
    background: ${palette.teal[500]};

    &:disabled {
      background: ${palette.teal[300]};
    }
  `}
`;

export default NewPostButton;
