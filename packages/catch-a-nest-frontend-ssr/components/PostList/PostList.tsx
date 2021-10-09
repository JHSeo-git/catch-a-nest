import React from 'react';
import useGetPosts from '@/hooks/useGetPosts';
import palette from '@/lib/styles/palette';
import { css } from '@emotion/react';
import PostItem from './PostItem';
import PostItemSkeleton from './PostItemSkeleton';

export type PostListProps = {};

const PostList = (props: PostListProps) => {
  const { posts, elementRef, hasNextPage } = useGetPosts();

  return (
    <>
      <ul css={listStyle}>
        {posts
          ? posts.map((post) => <PostItem key={post.id} post={post} />)
          : Array.from({ length: 10 }).map((_, i) => (
              <PostItemSkeleton key={i} />
            ))}
        {hasNextPage && <PostItemSkeleton ref={elementRef} />}
        {/* Array.from({ length: 10 }).map((_, i) => (
             <PostItemSkeleton key={i} ref={i === 0 ? elementRef : undefined} />
           ))} */}
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

export default PostList;
