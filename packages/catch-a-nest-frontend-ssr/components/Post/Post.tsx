import React from 'react';
import useGetPostBySlug from '@/hooks/useGetPostBySlug';
import PostSkeleton from './PostSkeleton';
import PostHeader from './PostHeader';
import PostBody from './PostBody';

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
    </>
  );
};

export default Post;
