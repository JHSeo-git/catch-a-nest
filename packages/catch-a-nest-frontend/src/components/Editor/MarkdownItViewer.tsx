import { useRef } from 'react';
import { css } from '@emotion/react';
import TuiStyleWrapper from './TuiStyleWrapper';
import { responsiveReadPostToc } from '../../lib/styles/responsive';
import palette from '@src/lib/palette';
import zIndex from '@src/lib/styles/zIndex';
import usePostGenerateEffect from '@src/hooks/usePostGenerateEffect';

export type MarkdownItViewerProps = {
  markdown: string;
};

function MarkdownItViewer({ markdown }: MarkdownItViewerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fixedTocPos = 100;

  usePostGenerateEffect({ ref, markdown, fixedTocPos });

  return (
    <TuiStyleWrapper>
      <div
        ref={ref}
        css={viewerStyle(`${fixedTocPos}px`)}
        className="tui-editor-contents"
      ></div>
    </TuiStyleWrapper>
  );
}

const viewerStyle = (fixedTocPos: string) => css`
  nav {
    ${responsiveReadPostToc};
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
