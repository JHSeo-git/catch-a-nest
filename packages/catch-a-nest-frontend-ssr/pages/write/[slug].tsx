import AppLayout from '@/components/AppLayout';
import Write from '@/components/Write';
import useLoadPost from '@/hooks/useLoadPost';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export type EditPageProps = {};

const EditPage = (props: EditPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

  const guardSlug = useMemo(() => {
    if (!slug) return '';
    if (typeof slug !== 'string') return '';
    return slug;
  }, [slug]);

  const { error, loaded } = useLoadPost(guardSlug);

  // FIXME: error 처리
  if (error) return <div>{`${error}`}</div>;

  if (!loaded) return null;

  return (
    <AppLayout layoutType="naked">
      <Write />
    </AppLayout>
  );
};

export default EditPage;
