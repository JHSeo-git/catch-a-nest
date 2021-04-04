import ReadPost from '@src/components/ReadPost';
import { useParams } from 'react-router';

export type PostProps = {};

type PostParams = {
  slug: string;
};

const Post = (props: PostProps) => {
  const { slug } = useParams<PostParams>();

  return <ReadPost slug={slug} />;
};

export default Post;
