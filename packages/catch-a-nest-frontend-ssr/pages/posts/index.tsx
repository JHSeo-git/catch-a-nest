import React from 'react';
import Head from 'next/head';

export type PostsProps = {};

const Posts = (props: PostsProps) => {
  return (
    <>
      <Head>
        <title>Posts – Seo Nest</title>
        <meta name="title" content="Seo Nest" />
        <meta name="description" content="Seo's honest nest" />
        <meta
          property="og:image"
          content="https://files.seonest.net/seonest-logo.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Seo Nest" />
        <meta property="og:description" content="Seo's honest nest" />
      </Head>
    </>
  );
};

export default Posts;
