import { useUserState } from '@src/states/authState';
import FloatLinkButton from '../FloatLinkButton';

export type PostEditButtonProps = {
  slug: string;
};

const PostEditButton = ({ slug }: PostEditButtonProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return <FloatLinkButton iconName="fix" to={`/edit/${slug}`} />;
};

export default PostEditButton;
