import React from 'react';
import { css } from '@emotion/react';
import useGetTempPosts from '@/hooks/useGetTempPosts';
import { useUserValue } from '@/lib/recoil/authState';
import media from '@/lib/styles/media';
import palette from '@/lib/styles/palette';
import TempPostItem from './TempPostItem';
import PostItemSkeleton from '../PostList/PostItemSkeleton';
import { useThemeValue } from '@/lib/recoil/appState';

export type TempPostListProps = {};

const TempPostList = (props: TempPostListProps) => {
  const theme = useThemeValue();
  const userState = useUserValue();
  const { posts, elementRef, hasNextPage } = useGetTempPosts(userState?.id);

  return (
    <>
      <h1 css={title(theme === 'DARK')}>Will be Post</h1>
      <ul css={listStyle}>
        {posts
          ? posts.map((item) => <TempPostItem key={item.id} post={item} />)
          : Array.from({ length: 10 }).map((_, i) => (
              <PostItemSkeleton key={i} />
            ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, i) => (
            <PostItemSkeleton key={i} ref={i === 0 ? elementRef : undefined} />
          ))}
      </ul>
    </>
  );
};

const listStyle = css`
  margin: 0;
  padding: 0;
  list-style: none;

  li + li {
    margin-top: 1rem;
  }
`;

const title = (isDarkMode: boolean) => css`
  color: ${palette.blueGrey[900]};
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 3rem;
  ${media.sm} {
    font-size: 2rem;
  }

  ${isDarkMode &&
  css`
    color: ${palette.grey[100]};
  `}
`;

export default TempPostList;
