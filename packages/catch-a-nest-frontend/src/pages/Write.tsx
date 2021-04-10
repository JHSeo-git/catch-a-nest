import WritePost from '@src/components/WritePost';
import { useUserState } from '@src/states/authState';
import {
  useEditTargetSlugState,
  useIsEditState,
} from '@src/states/editorState';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export type WriteProps = {};

type WriteParams = {
  slug?: string;
};

const Write = (props: WriteProps) => {
  const [user] = useUserState();
  const { slug } = useParams<WriteParams>();
  const [, setIsEdit] = useIsEditState();
  const [, setEditTargetSlug] = useEditTargetSlugState();

  useEffect(() => {
    if (!slug) return;
    setIsEdit(true);
    setEditTargetSlug(slug);
  }, [slug, setIsEdit, setEditTargetSlug]);

  if (!user) return null;

  return <WritePost />;
};

export default Write;
