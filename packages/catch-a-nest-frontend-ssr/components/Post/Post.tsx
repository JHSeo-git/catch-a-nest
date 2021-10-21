import React from 'react';
import dynamic from 'next/dynamic';
import markdownToText from 'markdown-to-text';
import PostSkeleton from './PostSkeleton';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostSEO from '../AppSEO/PostSEO';
import { Post } from '@/lib/api/posts/types';
// import UtterancsComment from '../UtterancsComment';

const UtterancsComment = dynamic(() => import('../UtterancsComment'), {
  ssr: false,
});

export type PostProps = {
  post: Post | null;
};

function PostContainer({ post }: PostProps) {
  const images = post?.thumbnail ? [post.thumbnail] : [];

  if (!post) return <PostSkeleton />;

  return (
    <>
      <PostSEO
        title={post.title}
        description={
          post.short_description ??
          markdownToText(post.body).trim().slice(0, 150)
        }
        images={images}
        modifiedTime={post.updated_at}
        publishedTime={post.created_at}
      />
      <PostHeader post={post} />
      <PostBody markdown={post.body} />
      <PostFooter
        isTemp={post.is_temp}
        nextPost={post.next_post}
        prevPost={post.prev_post}
      />
      <UtterancsComment />
    </>
  );
}

export default PostContainer;
