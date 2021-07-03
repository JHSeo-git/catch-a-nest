import { css } from '@emotion/react';
import { fadeIn, pageFadeInStyle, shining } from '@/lib/styles/animation';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';

export type PostSkeletonProps = {};

const PostSkeleton = (props: PostSkeletonProps) => {
  return (
    <section css={postStyle}>
      <div css={[skeleton, title]}></div>
      <div css={[skeleton, subInfo]}></div>
      <div css={[skeleton, content('10rem')]}></div>
      <div css={[skeleton, content('5rem')]}></div>
      <div css={[skeleton, content('15rem')]}></div>
      <div css={[skeleton, content('10rem')]}></div>
      <div css={[skeleton, content('10rem')]}></div>
      <div css={[skeleton, content('10rem')]}></div>
      <div css={[skeleton, content('10rem')]}></div>
    </section>
  );
};

const skeleton = css`
  background: ${palette.blueGrey[50]};
  border-radius: 0.25rem;
`;

const postStyle = css`
  display: flex;
  flex-direction: column;
  ${pageFadeInStyle};
`;

const title = css`
  height: 4.5rem;
  width: 50%;
  ${media.md} {
    height: 3.375rem;
  }
`;

const subInfo = css`
  margin-left: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  width: 5rem;
`;

const content = (height: string) => css`
  height: ${height};

  margin-top: 2rem;
`;

export default PostSkeleton;
