import NewPost from '@src/components/NewPost';
import { useUserState } from '@src/states/authState';

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return <NewPost />;
};

export default Write;