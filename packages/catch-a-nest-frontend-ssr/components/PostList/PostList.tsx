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
      {/* <PostWriteButton /> */}
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

const emptyStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 25rem;
  }
  p {
    margin-top: 2.5rem;
    font-size: 1.5rem;
    color: ${palette.blueGrey[700]};
  }
`;

export default PostList;
