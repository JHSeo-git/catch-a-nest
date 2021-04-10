import savePost from '@src/lib/api/posts/saveNewPost';
import updatePost from '@src/lib/api/posts/updatePost';
import {
  useEditNewEditInfoValue,
  useEditorContentValue,
} from '@src/states/editorState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';

export default function useWritePost() {
  const { isEdit, editTargetSlug } = useEditNewEditInfoValue();
  const postContent = useEditorContentValue();
  const history = useHistory();
  const { notify } = useAppToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = useCallback(async () => {
    try {
      setLoading(true);
      const post = await savePost(postContent);
      notify(`Success Save Post: ${post.title}`, 'success');
      history.push('/');
    } catch (e) {
      notify('❗️ Fail Save Post', 'error');
      setError('Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history]);

  const onUpdate = useCallback(async () => {
    if (!editTargetSlug) return;
    try {
      setLoading(true);
      const post = await updatePost(editTargetSlug, postContent);
      notify(`Success Update Post: ${post.title}`, 'success');
      history.push(`/post/${editTargetSlug}`);
    } catch (e) {
      notify('Fail Update Post', 'error');
      setError('Update Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history, editTargetSlug]);

  return {
    onSave: isEdit ? onSave : onUpdate,
    loading,
    error,
  };
}
