import { useUserState } from '@src/states/authState';
import FloatLinkButton from '../FloatLinkButton';

export type PostWriteButtonProps = {};

const PostWriteButton = (props: PostWriteButtonProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return <FloatLinkButton iconName="write" to="/write" />;
};

export default PostWriteButton;
