import savePost from '@src/lib/api/posts/saveNewPost';
import saveTempPost from '@src/lib/api/posts/saveTempPost';
import updatePost from '@src/lib/api/posts/updatePost';
import {
  useEditingInfoValue,
  useEditorContentValue,
  useEditTargetSlugState,
} from '@src/states/editorState';
import { useNewTempArrivedActions } from '@src/states/viewState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import saveNewTempPost from '../lib/api/posts/saveNewTempPost';
import useAppToast from './useAppToast';

export default function useWritePost() {
  const [slug] = useEditTargetSlugState();
  const { isEdit, editTargetSlug } = useEditingInfoValue();
  const postContent = useEditorContentValue();
  const history = useHistory();
  const { notify } = useAppToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { on: newTempOn } = useNewTempArrivedActions();

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
      const saved = slug
        ? await saveTempPost(postContent, slug)
        : await saveNewTempPost(postContent);

      history.replace(`/write/${saved.url_slug}`);
      newTempOn();
      notify('Save Temp Post', 'success');
    } catch (e) {
      notify('Fail Temp Save Post', 'error');
      setError('Temp Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history, slug, newTempOn]);

  return {
    onSave: isEdit ? onUpdate : onSave,
    onSaveTempPost,
    loading,
    error,
  };
}
