import React from 'react';
import { css } from '@emotion/react';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { fontFamily } from '@/lib/styles/typography';
import { pageFadeInStyle } from '@/lib/styles/animation';
import { useThemeValue } from '@/lib/recoil/appState';

export type MarkdownStyleWrapperProps = {
  children?: React.ReactNode;
};

const MarkdownStyleWrapper = ({ children }: MarkdownStyleWrapperProps) => {
  const theme = useThemeValue();

  return <div css={toastuiStyle(theme === 'DARK')}>{children}</div>;
};

const toastuiStyle = (isDarkMode: boolean) => css`
  height: 100%;
  position: relative;
  word-break: break-word;

  .toastui-editor-defaultUI {
    ${pageFadeInStyle(200)};
    border-radius: 0;

    ${isDarkMode &&
    css`
      border-left: none;
      border-right: none;
      border-color: ${palette.blueGrey[700]};
    `}

    .toastui-editor {
      ${media.md} {
        width: 100%;
      }
    }
    .toastui-editor-toolbar {
      .toastui-editor-defaultUI-toolbar {
        border-radius: 0;
      }
    }
    .toastui-editor-md-splitter {
      ${isDarkMode &&
      css`
        background-color: ${palette.blueGrey[700]};
      `}
      ${media.md} {
        display: none;
      }
    }
    .toastui-editor-md-preview {
      ${media.md} {
        display: none;
        padding: 0;
        width: 0;
      }
    }
  }

  .toastui-editor {
    .ProseMirror {
      ${fontFamily}
      height: 100%;
      font-size: 1.125rem;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      color: ${palette.blueGrey[900]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[50]};
      `}

      ${media.md} {
        font-size: 1rem;
      }

      * {
        font-family: inherit;
        line-height: inherit;
        box-sizing: inherit;
      }

      .toastui-editor-md-delimiter,
      .toastui-editor-md-thematic-break,
      .toastui-editor-md-link,
      .toastui-editor-md-table,
      .toastui-editor-md-block-quote {
        color: ${palette.blueGrey[500]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[100]};
        `}
      }

      .toastui-editor-md-code-block .toastui-editor-md-meta,
      .toastui-editor-md-code-block .toastui-editor-md-delimiter {
        color: ${palette.blueGrey[500]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[500]};
        `}
      }

      .toastui-editor-md-code .toastui-editor-md-meta,
      .toastui-editor-md-code .toastui-editor-md-delimiter {
        color: ${palette.blueGrey[500]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[500]};
        `}
      }

      .toastui-editor-md-meta,
      .toastui-editor-md-html,
      .toastui-editor-md-link.toastui-editor-md-link-url.toastui-editor-md-marked-text {
        color: ${palette.blueGrey[500]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[500]};
        `}
      }

      .toastui-editor-md-block-quote .toastui-editor-md-marked-text,
      .toastui-editor-md-list-item .toastui-editor-md-meta {
        color: ${palette.blueGrey[800]};
        ${isDarkMode &&
        css`
          color: ${palette.grey[100]};
        `}
      }

      .toastui-editor-md-table .toastui-editor-md-marked-text {
        color: ${palette.blueGrey[900]};
        ${isDarkMode &&
        css`
          color: ${palette.grey[50]};
        `}
      }

      .toastui-editor-md-link.toastui-editor-md-link-desc.toastui-editor-md-marked-text {
        color: ${palette.blue[700]};
        ${isDarkMode &&
        css`
          color: ${palette.lightBlue[500]};
        `}
      }

      .toastui-editor-md-list-item-odd {
        color: ${palette.lightBlue[500]};
        margin-right: 0.25rem;

        ${isDarkMode &&
        css`
          color: ${palette.lightBlue[300]};
        `}
      }

      .toastui-editor-md-list-item-even {
        color: ${palette.pink[500]};
        margin-right: 0.25rem;

        ${isDarkMode &&
        css`
          color: ${palette.pink[300]};
        `}
      }

      .toastui-editor-md-code {
        background-color: ${palette.lightBlue[50]};
        padding: 0.125rem 0;
        letter-spacing: -0.2px;

        ${isDarkMode &&
        css`
          background-color: ${palette.lightBlue[700]};
        `}
      }

      .toastui-editor-md-code.toastui-editor-md-marked-text {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        color: ${palette.lightBlue[700]};
        background-color: ${palette.lightBlue[50]};

        ${isDarkMode &&
        css`
          color: ${palette.lightBlue[50]};
          background-color: ${palette.lightBlue[700]};
        `}
      }

      .toastui-editor-md-code.toastui-editor-md-delimiter.toastui-editor-md-start {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-left: 0.25rem;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }

      .toastui-editor-md-code.toastui-editor-md-delimiter.toastui-editor-md-end {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-right: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }

      .toastui-editor-md-code-block-line-background {
        background: ${palette.grey[100]};
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        ${isDarkMode &&
        css`
          background: ${palette.blueGrey[800]};
        `}
      }

      .toastui-editor-md-code-block-line-background.start {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        padding-top: 0.375rem;
      }

      .toastui-editor-md-code-block-line-background.end {
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        padding-bottom: 0.375rem;
      }

      .toastui-editor-md-code,
      .toastui-editor-md-code-block {
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
        font-size: 1rem;

        ${media.md} {
          font-size: 0.875rem;
        }
      }

      .toastui-editor-md-heading {
        line-height: 1.5;

        .toastui-editor-md-delimiter {
          color: inherit;
        }
      }

      .toastui-editor-md-heading1,
      .toastui-editor-md-heading2,
      .toastui-editor-md-heading3,
      .toastui-editor-md-heading4,
      .toastui-editor-md-heading5,
      .toastui-editor-md-heading6 {
        margin: 0;
        padding: 0;
      }

      .toastui-editor-md-heading1 {
        margin: 1rem 0;
        padding-bottom: 0.5rem;
        font-size: 2rem;
        color: ${palette.blueGrey[900]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[50]};
        `}

        ${media.md} {
          font-size: 1.5rem;
        }
      }

      .toastui-editor-md-heading2 {
        margin: 0.75rem 0;
        padding-bottom: 0.5rem;
        font-size: 1.75rem;
        color: ${palette.blueGrey[900]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[50]};
        `}

        ${media.md} {
          font-size: 1.5rem;
        }
      }

      .toastui-editor-md-heading3 {
        margin: 0.5rem 0;
        font-size: 1.5rem;
        color: ${palette.blueGrey[800]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[100]};
        `}

        ${media.md} {
          font-size: 1.25rem;
        }
      }

      .toastui-editor-md-heading4 {
        margin: 0.5rem 0;
        font-size: 1.25rem;
        color: ${palette.blueGrey[800]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[100]};
        `}

        ${media.md} {
          font-size: 1rem;
        }
      }

      .toastui-editor-md-heading5 {
        margin: 0.25rem 0;
        font-size: 1rem;
        color: ${palette.blueGrey[700]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[200]};
        `}
      }

      .toastui-editor-md-heading6 {
        margin: 0.25rem 0;
        font-size: 0.875rem;
        color: ${palette.blueGrey[700]};

        ${isDarkMode &&
        css`
          color: ${palette.grey[200]};
        `}
      }
    }
  }
  .markdown-viewer-contents,
  .toastui-editor-contents {
    ${fontFamily};
    font-size: 1.125rem;
    display: flex;
    flex-direction: column;
    line-height: 1.5;

    ${media.lg} {
      font-size: 1rem;
    }

    * {
      line-height: inherit;
      box-sizing: inherit;
    }

    hr {
      border-style: none;
      border-top: 0.125rem solid ${palette.blue[300]};
      margin: 1rem 0;

      ${isDarkMode &&
      css`
        border-top: 0.125rem solid ${palette.blue[500]};
      `}
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;

      display: flex;
      align-items: center;

      .header-anchor {
        visibility: hidden;
        display: flex;
        color: ${palette.blueGrey[700]};
        margin-right: 0.25rem;

        ${isDarkMode &&
        css`
          color: ${palette.grey[50]};
        `}
        svg {
          height: 1rem;
        }

        ${media.sm} {
          svg {
            height: 0.75rem;
          }
        }
      }

      &:hover {
        .header-anchor {
          visibility: visible;
        }
      }
    }

    h1 {
      margin: 1rem 0;
      padding-bottom: 0.5rem;
      font-size: 2rem;
      border-bottom: 0.125rem solid ${palette.grey[300]};
      color: ${palette.blueGrey[900]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[50]};
        border-bottom: 0.125rem solid ${palette.grey[700]};
      `}
    }

    h2 {
      margin: 0.75rem 0;
      padding-bottom: 0.5rem;
      font-size: 1.75rem;
      border-bottom: 0.125rem solid ${palette.grey[300]};
      color: ${palette.blueGrey[900]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[50]};
        border-bottom: 0.125rem solid ${palette.grey[700]};
      `}
    }

    h3 {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      color: ${palette.blueGrey[800]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[100]};
      `}
    }

    h4 {
      margin: 0.5rem 0;
      font-size: 1.25rem;
      color: ${palette.blueGrey[800]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[100]};
      `}
    }

    h5 {
      margin: 0.25rem 0;
      font-size: 1rem;
      color: ${palette.blueGrey[700]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[200]};
      `}
    }

    h6 {
      margin: 0.25rem 0;
      font-size: 0.875rem;
      color: ${palette.blueGrey[700]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[200]};
      `}
    }

    p {
      margin: 0.625rem 0;
      color: ${palette.blueGrey[900]};
      line-height: 1.85;

      ${isDarkMode &&
      css`
        color: ${palette.grey[50]};
      `}
    }

    a {
      color: ${palette.blue[700]};
      text-decoration: none;

      ${isDarkMode &&
      css`
        color: ${palette.lightBlue[400]};
      `}

      &:hover {
        text-decoration: underline;
      }
    }

    blockquote {
      margin: 2rem 0;
      border-left: 0.25rem solid ${palette.lightBlue[200]};
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      background: ${palette.grey[50]};
      padding: 0.75rem 1.5rem;

      ${isDarkMode &&
      css`
        border-left: 0.25rem solid ${palette.lightBlue[700]};
        background: ${palette.blueGrey[800]};
      `}

      & blockquote {
        margin: 0;
      }
    }

    img {
      display: block;
      margin: 0.875rem auto;
      max-width: 100%;
    }

    ol,
    ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      color: ${palette.blueGrey[900]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[50]};
      `}

      li {
        margin-top: 0.625rem;
        margin-bottom: 0.625rem;
      }
    }

    ul {
      li {
        &::before {
          content: '';
          /* margin-left: -1.25rem; */
          margin-top: 0.6875rem;
          width: 0.375rem;
          height: 0.375rem;
          border-radius: 50%;
          background-color: ${palette.blueGrey[700]};

          ${isDarkMode &&
          css`
            background-color: ${palette.grey[300]};
          `}
        }
      }
    }

    /* ol {
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
    } */

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

      ${isDarkMode &&
      css`
        color: ${palette.lightBlue[50]};
        background-color: ${palette.lightBlue[700]};
      `}
    }

    pre {
      font-size: 1rem;
      margin: 0.875rem 0;
      padding: 1rem;
      /* background: white; */
      background: ${palette.grey[50]};
      border-radius: 0.25rem;

      code {
        padding: 0;
        color: inherit;
        white-space: pre-wrap;
        background-color: transparent;

        .highlighted-line {
          background-color: ${palette.lightBlue[50]};
          display: block;
          border-left: 0.25rem solid ${palette.lightBlue[500]};
          margin: 0 -1rem;
          padding: 0 1rem;
        }
      }
    }

    mark {
      color: white;
      background: ${palette.lightBlue[500]};
      padding: 0.375rem;
      border-radius: 0.125rem;
    }

    abbr {
      cursor: help;
      text-decoration: none;
      border-bottom: 0.0625rem dotted ${palette.teal[900]};

      ${isDarkMode &&
      css`
        border-bottom: 0.0625rem dotted ${palette.teal[100]};
      `}
    }

    dl {
      margin: 0.875rem 0;
      dt {
        font-weight: bold;
      }
      dd {
        margin-left: 0;
      }
    }

    table {
      border: none;
      border-collapse: separate;
      border-spacing: 0;
      margin: 0.75rem 0;
      color: ${palette.blueGrey[900]};

      ${isDarkMode &&
      css`
        color: ${palette.grey[100]};
      `}

      th,
      td {
        padding: 0.3125rem 0.75rem;
        height: 2rem;
      }
      th {
        background: ${palette.blueGrey[800]};
        border: 0.0625rem solid ${palette.grey[500]};
        font-weight: 300;
        color: #fff;
      }
      td {
        border: 0.0625rem solid ${palette.blueGrey[50]};
      }
    }
    .footnotes-sep {
      border-top: 0.125rem solid ${palette.blue[300]};
    }
    .footnotes {
      display: block;
      column-count: 2;
      .footnotes-list {
        padding-left: 2rem;
        margin: 0;
        * {
          margin: 0;
        }
      }
    }
    sup,
    sub {
      font-size: 0.75rem;
      a {
        font-weight: 500;
      }
    }
  }
`;

export default MarkdownStyleWrapper;
