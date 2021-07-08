import React from 'react';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import Write from '@/components/Write';

export type WritePageProps = {};

const WritePage = (props: WritePageProps) => {
  return (
    <>
      <PageSEO title="New post" description="new post" noRobots={true} />
      <AppLayout layoutType="naked">
        <Write />
      </AppLayout>
    </>
  );
};

export default WritePage;
