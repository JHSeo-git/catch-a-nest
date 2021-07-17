import React from 'react';
import TempPostList from '@/components/TempPostList';
import FloatLinkButton from '@/components/FloatLinkButton';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import { useUserValue } from '@/lib/recoil/authState';

export type TempsPageProps = {};

const TempsPage = (props: TempsPageProps) => {
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
