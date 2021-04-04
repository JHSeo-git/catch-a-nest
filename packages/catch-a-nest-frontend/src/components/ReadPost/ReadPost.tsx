import useGetPostBySlugQuery from '@src/hooks/query/useGetPostBySlugQuery';
import ErrorInfo from '../ErrorInfo';

export type ReadPostProps = {
  slug: string;
};

const ReadPost = ({ slug }: ReadPostProps) => {
  const { data, status } = useGetPostBySlugQuery(slug);
  if (!data && status === 'error') {
    return <ErrorInfo />;
  }

  console.log(data);
  return <div>{slug}</div>;
};

export default ReadPost;
