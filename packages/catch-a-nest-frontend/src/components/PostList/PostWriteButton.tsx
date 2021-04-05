import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import zIndex from '@src/lib/styles/zIndex';
import { useUserState } from '@src/states/authState';
import { Link } from 'react-router-dom';
import AppIcon from '../AppIcon';

export type PostWriteButtonProps = {};

const PostWriteButton = (props: PostWriteButtonProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return (
    <Link to="/write" css={fixedLink}>
      <AppIcon name="write" />
    </Link>
  );
};

const fixedLink = css`
  position: fixed;
  right: 2.5rem;
  bottom: 5rem;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  background: ${palette.lightBlue[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: white;
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    svg {
      transform: scale3d(1.2, 1.2, 1.2);
    }
  }

  ${zIndex.fixedButton};
`;

export default PostWriteButton;
