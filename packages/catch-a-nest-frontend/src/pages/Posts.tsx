import PostList from '@src/components/PostList';
import { useUserState } from '@src/states/authState';

export type PostsProps = {};

const Posts = (props: PostsProps) => {
  const [user] = useUserState();

  return <PostList userId={user?.id} />;
};

export default Posts;
