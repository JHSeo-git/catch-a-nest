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
      </Helmet>
      <PostList userId={user?.id} />
    </>
  );
};

export default Posts;
