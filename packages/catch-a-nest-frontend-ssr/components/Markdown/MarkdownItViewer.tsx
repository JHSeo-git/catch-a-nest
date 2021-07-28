import 'highlight.js/styles/atom-one-light.css';

import { useRef } from 'react';
import { css } from '@emotion/react';
import MarkdownStyleWrapper from './MarkdownStyleWrapper';
import { responsivePostToc } from '@/lib/styles/responsive';
import zIndex from '@/lib/styles/zIndex';
import palette from '@/lib/styles/palette';
import { useTOCHeadingIdValue } from '@/lib/recoil/viewerState';
import useMarkdownItViewEffect from '@/hooks/useMarkdownItViewEffect';

export type MarkdownItViewerProps = {
  markdown: string;
};

function SSRMarkdownItViewer({ markdown }: MarkdownItViewerProps) {
  return (
    <MarkdownStyleWrapper>
      <div
        css={viewerStyle(`${100}px`)}
        className="markdown-viewer-contents"
      ></div>
    </MarkdownStyleWrapper>
  );
}

function MarkdownItViewer({ markdown }: MarkdownItViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tocHeadingIdValue = useTOCHeadingIdValue();
  const fixedTocPos = 100;

  // TODO: re-render를 막을 좋은 방안을 생각해보자
  useMarkdownItViewEffect({ ref, markdown, fixedTocPos });

  return (
    <MarkdownStyleWrapper>
      <div
        ref={ref}
        css={viewerStyle(`${fixedTocPos}px`, `#${tocHeadingIdValue}`)}
        className="markdown-viewer-contents"
      ></div>
    </MarkdownStyleWrapper>
  );
}

const viewerStyle = (fixedTocPos: string, headerId?: string) => css`
  nav {
    ${responsivePostToc};
    position: absolute;
    top: 0;
    left: 100%;
    ${zIndex.fixedTOC};

    > .md-toc-list {
      width: 20rem;
      border-radius: 0.25rem;
      background: ${palette.grey[50]};
      margin: 0 2rem;
    }

    &.fixed {
      > .md-toc-list {
        position: fixed;
        top: ${fixedTocPos};
      }
    }

    .md-toc-list {
      list-style: none;
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
        transition: all 0.1s linear;

        &:hover {
          color: ${palette.blue[500]};
          text-decoration: none;
        }

        &[href='${headerId}'] {
          color: ${palette.lightBlue[500]};
          font-weight: bold;
          transform: scale3d(1, 1, 1.5);
        }
      }

      .md-toc-item {
        margin-top: 0;
        margin-bottom: 0;
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
export { SSRMarkdownItViewer };
