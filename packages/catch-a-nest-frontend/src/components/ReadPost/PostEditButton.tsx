import React from 'react';
import palette from '@src/lib/palette';
import { useUserState } from '@src/states/authState';
import FloatLinkButton from '../FloatLinkButton';

export type PostEditButtonProps = {
  slug: string;
};

const PostEditButton = ({ slug }: PostEditButtonProps) => {
  const [user] = useUserState();

  if (!user) return null;

  return (
    <>
      <FloatLinkButton
        iconName="fix"
        to={`/write/${slug}`}
        color={palette.indigo[500]}
        position="top"
      />
      <FloatLinkButton iconName="write" to={`/write`} />
    </>
  );
};

export default PostEditButton;
