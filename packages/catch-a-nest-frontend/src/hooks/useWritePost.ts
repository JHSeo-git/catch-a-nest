import savePost from '@src/lib/api/posts/saveNewPost';
import saveTempPost from '@src/lib/api/posts/saveTempPost';
import updatePost from '@src/lib/api/posts/updatePost';
import {
  useEditingInfoValue,
  useEditorContentValue,
} from '@src/states/editorState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';

export default function useWritePost() {
  const { isEdit, editTargetSlug } = useEditingInfoValue();
  const postContent = useEditorContentValue();
  const history = useHistory();
  const { notify } = useAppToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = useCallback(async () => {
    try {
      setLoading(true);
      await savePost(postContent);
      history.push('/');
    } catch (e) {
      notify('Fail Save Post', 'error');
      setError('Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history]);

  const onUpdate = useCallback(async () => {
    if (!editTargetSlug) return;
    try {
      setLoading(true);
      await updatePost(editTargetSlug, postContent);
      history.push(`/post/${editTargetSlug}`);
    } catch (e) {
      notify('Fail Update Post', 'error');
      setError('Update Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history, editTargetSlug]);

  const onSaveTempPost = useCallback(async () => {
    try {
      setLoading(true);
      const saved = await saveTempPost(postContent);
      history.replace(`/write/${saved.url_slug}`);
    } catch (e) {
      notify('Fail Temp Save Post', 'error');
      setError('Temp Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history]);

  return {
    onSave: isEdit ? onUpdate : onSave,
    onSaveTempPost,
    loading,
    error,
  };
}
