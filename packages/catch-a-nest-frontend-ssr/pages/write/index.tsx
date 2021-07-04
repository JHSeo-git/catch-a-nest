import AppLayout from '@/components/AppLayout';
import Write from '@/components/Write';

export type WritePageProps = {};

const WritePage = (props: WritePageProps) => {
  return (
    <AppLayout layoutType="naked">
      <Write />
    </AppLayout>
  );
};

export default WritePage;
