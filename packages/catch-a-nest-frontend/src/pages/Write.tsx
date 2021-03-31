import NewPost from '@src/components/NewPost';
import { useUserState } from '@src/states/authState';
import { useHistory } from 'react-router';

export type WriteProps = {};

const Write = (props: WriteProps) => {
  const [user] = useUserState();
  const history = useHistory();

  if (!user) {
    history.push('/');
  }
  return <NewPost />;
};

export default Write;
