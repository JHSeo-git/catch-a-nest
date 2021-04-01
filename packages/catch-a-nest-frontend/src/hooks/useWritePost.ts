import savePost from '@src/lib/api/posts/savePost';
import { useEditorContentValue } from '@src/states/editorState';
import { useCallback, useState } from 'react';

export default function useWritePost() {
  const postContent = useEditorContentValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSave = useCallback(async () => {
    if (!postContent.title || !postContent.body) {
      // TODO: toast
      console.log('Title or Body is Empty');
      return;
    }
    try {
      setLoading(true);
      const post = await savePost(postContent);
      console.log(post);
    } catch (e) {
      console.log(e);
      setError('Save Post Error');
    } finally {
      setLoading(false);
    }
  }, [postContent]);

  return {
    onSave,
    loading,
    error,
  };
}
