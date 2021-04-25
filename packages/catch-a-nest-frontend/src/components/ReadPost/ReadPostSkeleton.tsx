import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import { shining } from '@src/lib/styles/animation';
import media from '@src/lib/styles/media';

export type ReadPostSkeletonProps = {};

const ReadPostSkeleton = (props: ReadPostSkeletonProps) => {
  return (
    <section css={postStyle}>
      <div css={[skeleton, title]}></div>
      <div css={[skeleton, subInfo]}></div>
      <div css={[skeleton, content('10rem')]}></div>
      <div css={[skeleton, content('5rem')]}></div>
      <div css={[skeleton, content('15rem')]}></div>
      <div css={[skeleton, content('10rem')]}></div>
    </section>
  );
};

const skeleton = css`
  background: ${palette.blueGrey[50]};
  border-radius: 0.25rem;
  animation: ${shining} 1s ease-in-out infinite;
`;

const postStyle = css`
  display: flex;
  flex-direction: column;
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

export default ReadPostSkeleton;
