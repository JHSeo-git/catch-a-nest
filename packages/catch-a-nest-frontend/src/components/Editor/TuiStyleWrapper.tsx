import 'highlight.js/styles/atom-one-light.css';

import { css } from '@emotion/react';
import React from 'react';
import palette from '@src/lib/palette';

export type TuiStyleWrapperProps = {
  children?: React.ReactNode;
};

const TuiStyleWrapper = ({ children }: TuiStyleWrapperProps) => {
  return <div css={tuiStyle}>{children}</div>;
};

const tuiStyle = css`
  height: 100%;

  .tui-editor-contents {
    font-family: inherit;
    font-size: 1.125rem;
    display: flex;
    flex-direction: column;
    line-height: 1.5;

    * {
      line-height: inherit;
      box-sizing: inherit;
    }

    hr {
      border-style: none;
      border-top: 0.125rem solid ${palette.blueGrey[500]};
      margin: 1rem 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
    }

    h1 {
      margin: 1rem 0;
      padding-bottom: 0.5rem;
      font-size: 2rem;
      border-bottom: 0.125rem solid ${palette.grey[300]};
      color: ${palette.blueGrey[900]};
    }

    h2 {
      margin: 0.75rem 0;
      padding-bottom: 0.5rem;
      font-size: 1.75rem;
      border-bottom: 0.125rem solid ${palette.grey[300]};
      color: ${palette.blueGrey[900]};
    }

    h3 {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      color: ${palette.blueGrey[800]};
    }

    h4 {
      margin: 0.5rem 0;
      font-size: 1.25rem;
      color: ${palette.blueGrey[800]};
    }

    h5 {
      margin: 0.25rem 0;
      font-size: 1rem;
      color: ${palette.blueGrey[700]};
    }

    h6 {
      margin: 0.25rem 0;
      font-size: 0.875rem;
      color: ${palette.blueGrey[700]};
    }

    p {
      margin: 0.625rem 0;
      color: ${palette.blueGrey[900]};
    }

    a {
      color: ${palette.blue[700]};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    blockquote {
      margin: 1rem 0;
      border-left: 0.25rem solid ${palette.lightBlue[200]};
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      padding: 0 1.5rem;
      > :last-of-type {
        margin-bottom: 0;
      }
    }

    img {
      margin: 0.875rem 0;
      max-width: 100%;
    }

    ol,
    ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      color: ${palette.blueGrey[900]};
    }

    ul {
      li {
        &::before {
          content: '';
          margin-left: -1.25rem;
          margin-top: 0.6875rem;
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 50%;
          background-color: ${palette.blueGrey[700]};
        }
      }
    }

    ol {
      li {
        &::before {
          content: '.' counter(li);
          margin-left: -2rem;
          width: 1.5rem;
          text-align: right;
          direction: rtl;
          color: ${palette.blueGrey[700]};
        }
      }
    }

    code,
    pre,
    tt {
      font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    }

    code {
      color: ${palette.lightBlue[700]};
      background-color: ${palette.lightBlue[50]};
      padding: 0.25rem 0.375rem;
      border-radius: 0.125rem;
    }

    pre {
      font-size: 1rem;
      margin: 0.5rem 0;
      padding: 1rem;
      background: ${palette.grey[100]};
      border-radius: 0.25rem;
      code {
        padding: 0;
        color: inherit;
        white-space: pre-wrap;
        background-color: transparent;
      }
    }

    table {
      border: none;
      border-collapse: separate;
      border-spacing: 0;
      margin: 0.75rem 0;
      color: ${palette.blueGrey[900]};
      th,
      td {
        padding: 0.3125rem 0.75rem;
        height: 2rem;
      }
      th {
        background: ${palette.blueGrey[800]};
        border: 0.0625rem solid ${palette.grey[500]};
      }
      td {
        border: 0.0625rem solid ${palette.blueGrey[50]};
      }
    }
  }
`;

export default TuiStyleWrapper;
