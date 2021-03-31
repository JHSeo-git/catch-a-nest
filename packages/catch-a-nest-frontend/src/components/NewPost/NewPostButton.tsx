import { css, keyframes } from '@emotion/react';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import AppIcon from '../AppIcon';

export type NewPostButtonProps = {
  text: string;
  onClick(): void;
  type?: ButtonType;
  loading?: boolean;
};

type ButtonType = 'primary' | 'normal';

const NewPostButton = ({
  text,
  onClick,
  type = 'normal',
  loading = false,
}: NewPostButtonProps) => {
  console.log(text, loading);
  return (
    <button css={buttonStyle(type)} onClick={onClick} disabled={loading}>
      {loading ? <AppIcon name="spinner" /> : text}
    </button>
  );
};

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

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
  justify-content: center;

  svg {
    animation: ${rotateAnimation} 1s ease-in-out infinite;
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
