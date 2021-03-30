import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';

export type NewPostButtonProps = {
  text: string;
  type?: ButtonType;
};

type ButtonType = 'primary' | 'normal';

const NewPostButton = ({ text, type = 'normal' }: NewPostButtonProps) => {
  return <button css={buttonStyle(type)}>{text}</button>;
};

const buttonStyle = (type: ButtonType) => css`
  ${resetButton};
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1.125rem;
  border-radius: 0.25rem;
  font-weight: bold;
  color: white;
  transition: all 0.2s ease-in-out;
  background: ${palette.cyan[600]};
  &:hover {
    background: ${palette.cyan[800]};
  }
  &:active {
    background: ${palette.cyan[500]};
  }
  &:disabled {
    opacity: 0.6;
  }

  ${type === 'primary' &&
  css`
    background: ${palette.red[600]};
    &:hover {
      background: ${palette.red[800]};
    }
    &:active {
      background: ${palette.red[500]};
    }
  `}
`;

export default NewPostButton;
