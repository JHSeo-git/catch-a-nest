import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import React, { forwardRef } from 'react';
import { shining } from '../../lib/styles/animation';

export type PostItemSkeletonProps = {};

const PostItemSkeleton = (
  props: PostItemSkeletonProps,
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <li css={block}>
      <div css={itemStyle} ref={ref}>
        <div css={[skeleton, imageWrapper]} />
        <div css={infoWrapper}>
          <div css={skeleton} className="date-box" />
          <div css={skeleton} className="header-box" />
          <div css={skeleton} className="description-box" />
        </div>
      </div>
    </li>
  );
};

const block = css`
  & + & {
    margin-top: 1rem;
  }
`;

const skeleton = css`
  background: ${palette.blueGrey[50]};
  border-radius: 0.25rem;
  animation: ${shining} 1s ease-in-out infinite;
`;

const itemStyle = css`
  height: 6.6rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.0625rem solid ${palette.blueGrey[50]};

  display: flex;
`;

const imageWrapper = css`
  width: 11.25rem;
  ${media.sm} {
    width: 5rem;
  }
`;

const infoWrapper = css`
  flex: 1;
  padding: 0.5rem 1rem;

  .date-box {
    height: 1rem;
    width: 5rem;
    margin-bottom: 0.25rem;
  }
  .header-box {
    height: 1.75rem;
    width: 50%;
    margin-bottom: 0.25rem;
  }
  .description-box {
    height: 2.125rem;
    width: 100%;
  }
`;

export default forwardRef<HTMLDivElement, PostItemSkeletonProps>(
  PostItemSkeleton
);
