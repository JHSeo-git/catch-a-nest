import { useEffect, useRef } from 'react';

import { css } from '@emotion/react';
import md from '@src/lib/utils/markdownItClient';
import TuiStyleWrapper from './TuiStyleWrapper';
import { responsiveReadPostToc } from '../../lib/styles/responsive';
import palette from '@src/lib/palette';

export type MarkdownItViewerProps = {
  markdown: string;
};

function MarkdownItViewer({ markdown, ...reset }: MarkdownItViewerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markdown) return;
    if (!ref?.current) return;
    const result = md.render('\n[[toc]]\n' + markdown);
    ref.current.innerHTML = result;
  }, [markdown]);

  console.log('rerender');

  return (
    <TuiStyleWrapper>
      <div ref={ref} css={viewerStyle} className="tui-editor-contents"></div>
    </TuiStyleWrapper>
  );
}

const viewerStyle = css`
  nav {
    ${responsiveReadPostToc};
    position: absolute;
    top: 0;
    left: 100%;
    width: 20rem;
    line-height: 1;

    .md-toc-list {
      border-radius: 0.25rem;
      background: ${palette.yellow[100]};
      list-style: none;
      margin-top: 0;
      margin-left: 2rem;
      padding-right: 0.5rem;
      padding-left: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      font-size: 0.875rem;

      a {
        display: block;
        word-break: break-word;
        margin: 0.375rem 0;
        color: ${palette.blueGrey[500]};
        &:hover {
          color: ${palette.blue[500]};
          text-decoration: none;
        }
      }

      .md-toc-item {
        &::before {
          content: none;
        }

        .md-toc-list {
          padding: 0;
          padding-left: 0.5rem;
          margin-left: 1rem;
        }
      }
    }
  }
`;

export default MarkdownItViewer;
