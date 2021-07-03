import React from 'react';
import useGetPostBySlug from '@/hooks/useGetPostBySlug';
import PostSkeleton from './PostSkeleton';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import { css } from '@emotion/react';
import { fadeIn, pageFadeInStyle } from '@/lib/styles/animation';

export type PostProps = {
  slug: string;
};

const Post = ({ slug }: PostProps) => {
  const { post, error } = useGetPostBySlug(slug);

  // FIXME: error 처리
  if (error) {
    console.log(error);
    return null;
  }

  if (!post) return <PostSkeleton />;

  return (
    <>
      <PostHeader post={post} />
      <PostBody markdown={post.body} />
      <PostFooter
        isTemp={post.is_temp}
        nextPost={post.next_post}
        prevPost={post.prev_post}
      />
    </>
  );
};

export default Post;
