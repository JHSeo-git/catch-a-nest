import React, { forwardRef } from 'react';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import { shiningInfiniteStyle } from '@/lib/styles/animation';

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

const block = css``;

const skeleton = css`
  background: ${palette.blueGrey[50]};
  border-radius: 0.25rem;
  ${shiningInfiniteStyle};
`;

const itemStyle = css`
  height: 8rem;
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
