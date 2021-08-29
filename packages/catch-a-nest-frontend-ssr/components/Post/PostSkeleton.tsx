import { css } from '@emotion/react';
import { shiningInfiniteStyle } from '@/lib/styles/animation';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import { useThemeValue } from '@/lib/recoil/appState';

export type PostSkeletonProps = {};

const PostSkeleton = (props: PostSkeletonProps) => {
  const theme = useThemeValue();

  return (
    <section css={postStyle}>
      <div css={[skeleton(theme === 'DARK'), title]}></div>
      <div css={[skeleton(theme === 'DARK'), subInfo]}></div>
      <div css={[skeleton(theme === 'DARK'), content('10rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('5rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('15rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('10rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('10rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('10rem')]}></div>
      <div css={[skeleton(theme === 'DARK'), content('10rem')]}></div>
    </section>
  );
};

const skeleton = (isDarkMode: boolean) => css`
  background: ${palette.blueGrey[50]};
  border-radius: 0.25rem;

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[700]};
  `}
`;

const postStyle = css`
  display: flex;
  flex-direction: column;
  ${shiningInfiniteStyle};
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
