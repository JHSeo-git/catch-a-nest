import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';
import PageSEO from '@/components/AppSEO/PageSEO';
import Write from '@/components/Write';
import useLoadPost from '@/hooks/useLoadPost';

export type EditPageProps = {};

const LoadedEditPage = ({ slug }: { slug: string }) => {
  const { loaded } = useLoadPost(slug);
  const title = `${slug.length > 10 ? `${slug.slice(0, 10)}...` : slug}`;

  if (!loaded) return null;

  return (
    <>
      <PageSEO title={title} description="new post" noRobots={true} />
      <AppLayout layoutType="naked">
        <Write slug={slug} />
      </AppLayout>
    </>
  );
};

const EditPage = (props: EditPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

  const guardSlug = useMemo(() => {
    if (!slug) return null;
    if (typeof slug !== 'string') return null;
    return slug;
  }, [slug]);

  if (!guardSlug) return null;

  return <LoadedEditPage slug={guardSlug} />;
};

export default EditPage;
