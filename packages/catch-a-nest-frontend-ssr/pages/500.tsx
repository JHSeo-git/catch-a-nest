import AppError from '@/components/AppError';
import AppLayout from '@/components/AppLayout';

const InternalServerErrorPage = () => {
  return (
    <AppLayout layoutType="naked">
      <AppError message="Internal Server Error" status="500" />
    </AppLayout>
  );
};

export default InternalServerErrorPage;
