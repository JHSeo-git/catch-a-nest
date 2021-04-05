import { css } from '@emotion/react';
import { undraw404 } from '@src/assets/images';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { Link } from 'react-router-dom';

export type ErrorInfoProps = {};

const ErrorInfo = (props: ErrorInfoProps) => {
  return (
    <div css={block}>
      <div css={inner}>
        <img src={undraw404} alt="404 Error" />
        <Link css={linkStyle} to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

const block = css`
  background: white;
  display: flex;
  justify-content: center;
  ${responsiveWidth};
`;

const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: 15rem;
    margin-bottom: 2rem;

    ${media.xs} {
      height: 9rem;
    }
  }
`;

const linkStyle = css`
  width: 100%;
  padding: 1rem;
  text-align: center;
  text-decoration: none;
  background: ${palette.lightBlue[500]};
  color: white;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: ${palette.lightBlue[300]};
  }
  &:active {
    background: ${palette.lightBlue[700]};
  }
`;

export default ErrorInfo;
