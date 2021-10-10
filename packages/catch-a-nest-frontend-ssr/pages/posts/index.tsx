import React from 'react';
import FloatLinkButton from '@/components/FloatLinkButton';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import PostList from '@/components/PostList';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import { prefetchGetPostsQuery } from '@/hooks/query/useGetPostsQuery';
// import { GetServerSideProps } from 'next';

// SSR
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryClient = await prefetchGetPostsQuery();
//   return {
//     props: {
//       dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//     },
//   };
// };

// SSG
export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetPostsQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export type PostsPageProps = {};

const PostsPage = (props: PostsPageProps) => {
  return (
    <>
      <PageSEO title="Posts" description="Seo's honest posts" />
      <AppLayout>
        <PostList />
        <FloatLinkButton iconName="write" to="/write" />
      </AppLayout>
    </>
  );
};

export default PostsPage;
