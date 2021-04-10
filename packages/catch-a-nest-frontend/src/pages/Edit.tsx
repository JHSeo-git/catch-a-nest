import EditPost from '@src/components/WritePost/EditPost';
import { useParams } from 'react-router';

export type EditProps = {};

type ParamsType = {
  slug?: string;
};

const Edit = (props: EditProps) => {
  const { slug } = useParams<ParamsType>();

  if (!slug) return null;

  return <EditPost slug={slug} />;
};

export default Edit;
