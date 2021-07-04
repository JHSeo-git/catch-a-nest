import React from 'react';
import Head from 'next/head';
import TempPostList from '@/components/TempPostList';
import FloatLinkButton from '@/components/FloatLinkButton';
import AppLayout from '@/components/AppLayout';

export type TempsPageProps = {};

const TempsPage = (props: TempsPageProps) => {
  return (
    <>
      <Head>
        <title>Temps – Seo Nest</title>
      </Head>
      <AppLayout>
        <TempPostList />
        <FloatLinkButton iconName="write" to="/write" />
      </AppLayout>
    </>
  );
};

export default TempsPage;
