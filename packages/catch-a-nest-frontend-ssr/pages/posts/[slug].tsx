import { useRouter } from 'next/router';
import Post from '@/components/Post';

export type PostPageProps = {};

const PostPage = (props: PostPageProps) => {
  const router = useRouter();
  const { slug } = router.query;

  if (typeof slug !== 'string') return null;

  return <Post slug={slug} />;
};

export default PostPage;
