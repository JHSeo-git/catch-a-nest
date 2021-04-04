import { css } from '@emotion/react';
import { undraw404 } from '@src/assets/images';
import palette from '@src/lib/palette';
import { Link } from 'react-router-dom';

export type ErrorInfoProps = {};

const ErrorInfo = (props: ErrorInfoProps) => {
  return (
    <div css={block}>
      <img src={undraw404} alt="404 Error" />
      <Link css={linkStyle} to="/">
        Go To Home
      </Link>
    </div>
  );
};

const block = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 15rem;
    margin-bottom: 2rem;
  }
`;

const linkStyle = css`
  text-decoration: none;
  color: ${palette.blueGrey[500]};
`;

export default ErrorInfo;
