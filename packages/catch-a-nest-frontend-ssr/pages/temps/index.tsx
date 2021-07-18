import React from 'react';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query/hydration';
import TempPostList from '@/components/TempPostList';
import FloatLinkButton from '@/components/FloatLinkButton';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import { prefetchGetTempPostsQuery } from '@/hooks/query/useGetTempPostsQuery';

// SSG
export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = await prefetchGetTempPostsQuery();

  return {
    revalidate: 10,
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const TempsPage = () => {
  return (
    <>
      <PageSEO title="Temp Posts" description="temp posts" />
      <AppLayout>
        <TempPostList />
        <FloatLinkButton iconName="write" to="/write" />
      </AppLayout>
    </>
  );
};

export default TempsPage;
