import { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import Write from '@/components/Write';
import { useResetPostAllContent } from '@/lib/recoil/writeState';

export type WritePageProps = {};

const WritePage = (props: WritePageProps) => {
  // New 일 경우 기존 Post content state 값을 초기화 해준다.
  const reset = useResetPostAllContent();
  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <AppLayout layoutType="naked">
      <Write />
    </AppLayout>
  );
};

export default WritePage;
