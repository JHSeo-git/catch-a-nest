import { useCallback } from 'react';
import { useHistory } from 'react-router';

export default function useEditor() {
  const history = useHistory();

  const onCancel = useCallback(() => {
    history.replace('/');
  }, [history]);

  return {
    onCancel,
  };
}
