import React from 'react';
import { css } from '@emotion/react';
import { undraw401, undraw404 } from '@src/assets/images';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import { responsiveWidth } from '@src/lib/styles/responsive';
import { Link } from 'react-router-dom';

export type ErrorType = 'NotFound' | 'NotAuthorized';

export type ErrorInfoProps = {
  errorType?: ErrorType;
};

const ErrorInfo = ({ errorType = 'NotFound' }: ErrorInfoProps) => {
  return (
    <div css={block}>
      <div css={inner}>
        {errorType === 'NotFound' && (
          <>
            <img src={undraw404} alt="404 Error" />
            <p>Well... Not Found Page</p>
          </>
        )}
        {errorType === 'NotAuthorized' && (
          <>
            <img src={undraw401} alt="401 Error" />
            <p>Well... Not Authroized Request</p>
          </>
        )}
        <Link css={linkStyle} to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

const block = css`
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  ${responsiveWidth};
`;

const inner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 27.5rem;
    margin-bottom: 2rem;
  }
  p {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${palette.blueGrey[700]};
  }

  ${media.xs} {
    img {
      width: 16.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const linkStyle = css`
  width: 27.5rem;
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

  ${media.xs} {
    width: 16.5rem;
  }
`;

export default ErrorInfo;
