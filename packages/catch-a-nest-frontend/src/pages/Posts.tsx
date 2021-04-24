import React from 'react';
import PostList from '@src/components/PostList';
import { useUserState } from '@src/states/authState';
import { Helmet } from 'react-helmet-async';

export type PostsProps = {};

const Posts = (props: PostsProps) => {
  const [user] = useUserState();

  return (
    <>
      <Helmet>
        <title>Posts – Seo Nest</title>
        <meta name="description" content="Seo's honest nest" />
        <meta
          property="og:image"
          content="https://files.seonest.net/seonest-logo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Seo Nest" />
        <meta property="og:description" content="Seo's honest nest" />
      </Helmet>
      <PostList userId={user?.id} />
    </>
  );
};

export default Posts;
