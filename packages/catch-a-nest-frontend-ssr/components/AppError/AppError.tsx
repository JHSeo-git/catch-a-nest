import { pageFadeInStyle } from '@/lib/styles/animation';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import { responsiveWidth } from '@/lib/styles/responsive';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

export type AppErrorProps = {
  message: string;
  status: '401' | '404' | '500';
};

const AppError = ({ message, status }: AppErrorProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div css={block}>
      <div css={contentStyle}>
        <h1>{status}</h1>
        <div css={splitter} />
        <p>{message}</p>
      </div>
      <div css={contentStyle}>
        <button css={backButton} onClick={onClick}>
          Go Back
        </button>
      </div>
    </div>
  );
};

const block = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${pageFadeInStyle()};

  h1 {
    font-size: 2.5rem;
    color: ${palette.blueGrey[900]};
  }
  p {
    font-size: 1rem;
    color: ${palette.blueGrey[700]};
  }
`;

const contentStyle = css`
  display: flex;
  align-items: center;
`;

const splitter = css`
  margin: 0 1rem;
  width: 0.0625rem;
  height: 2rem;
  background-color: ${palette.blueGrey[700]};
`;

const backButton = css`
  ${resetButton};
  cursor: pointer;
  color: ${palette.blueGrey[800]};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  border: 0.0625rem solid ${palette.blueGrey[500]};
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active {
    color: ${palette.lightBlue[800]};
    box-shadow: 0 0.25rem 0.5rem rgba(0 0 0 /11%);
  }
`;

export default AppError;
