import React from 'react';
import TempPostList from '@src/components/PostList/TempPostList';
import { useUserState } from '@src/states/authState';
import { Helmet } from 'react-helmet-async';

export type TempPostsProps = {};

const TempPosts = (props: TempPostsProps) => {
  const [user] = useUserState();

  return (
    <>
      <Helmet>
        <title>Temp Posts – Seo Nest</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <TempPostList userId={user?.id} />
    </>
  );
};

export default TempPosts;
