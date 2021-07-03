import React from 'react';
import Head from 'next/head';
import TempPostList from '@/components/TempPostList';
import FloatLinkButton from '@/components/FloatLinkButton';

export type TempsPageProps = {};

const TempsPage = (props: TempsPageProps) => {
  return (
    <>
      <Head>
        <title>Temps – Seo Nest</title>
      </Head>
      <TempPostList />
      <FloatLinkButton iconName="write" to="/write" />
    </>
  );
};

export default TempsPage;
