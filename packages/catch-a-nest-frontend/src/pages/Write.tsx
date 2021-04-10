import WritePost from '@src/components/WritePost';
import { useUserState } from '@src/states/authState';
export type WriteProps = {};

const Write = (props: WriteProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return <WritePost />;
};

export default Write;
