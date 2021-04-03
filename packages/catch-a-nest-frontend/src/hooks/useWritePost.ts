import savePost from '@src/lib/api/posts/savePost';
import { useEditorContentValue } from '@src/states/editorState';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';

export default function useWritePost() {
  const postContent = useEditorContentValue();
  const history = useHistory();
  const { notify } = useAppToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSave = useCallback(async () => {
    try {
      setLoading(true);
      const post = await savePost(postContent);
      notify(`✅ Success Save Post: ${post.title}`, 'success');
      history.push('/');
    } catch (e) {
      notify('❗️ Fail Save Post', 'error');
      setError('Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent, notify, history]);

  return {
    onSave,
    loading,
    error,
  };
}
