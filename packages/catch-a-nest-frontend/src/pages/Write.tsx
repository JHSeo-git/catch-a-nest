import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import WritePost from '@src/components/WritePost';
import { useUserValue } from '@src/states/authState';
import {
  useSetEditTargetSlug,
  useSetIsEditState,
} from '@src/states/editorState';

export type WriteProps = {};

type WriteParams = {
  slug?: string;
};

const Write = (props: WriteProps) => {
  const { slug } = useParams<WriteParams>();

  const user = useUserValue();
  const setIsEdit = useSetIsEditState();
  const setEditTargetSlug = useSetEditTargetSlug();
  const history = useHistory();

  useEffect(() => {
    if (!slug) return;
    setIsEdit(true);
    setEditTargetSlug(slug);
  }, [slug, setIsEdit, setEditTargetSlug]);

  if (!user) {
    history.push('/error?status=401');
  }

  return <WritePost isEdit={!!slug} />;
};

export default Write;
