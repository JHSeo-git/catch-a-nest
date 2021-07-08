import React from 'react';
import { css } from '@emotion/react';
import markdownToText from 'markdown-to-text';
import useGetPostBySlug from '@/hooks/useGetPostBySlug';
import PostSkeleton from './PostSkeleton';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import { fadeIn, pageFadeInStyle } from '@/lib/styles/animation';
import PostSEO from '../AppSEO/PostSEO';
import appConfig from '@/config/app.config';

export type PostProps = {
  slug: string;
};

const Post = ({ slug }: PostProps) => {
  const { post, error } = useGetPostBySlug(slug);
  const images = post?.thumbnail ? [post.thumbnail] : [];

  // FIXME: error 처리
  if (error) {
    console.log(error);
    return null;
  }

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
    </>
  );
};

export default Post;
