import {
  useEditorContentActions,
  useEditorContentValue,
  useEditorModeState,
} from '@src/states/editorState';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import useAppToast from './useAppToast';

export default function useEditor() {
  const history = useHistory();
  const [editorMode, setEditorMode] = useEditorModeState();
  const { reset } = useEditorContentActions();
  const { title, body } = useEditorContentValue();
  const { notify, clearAllToast } = useAppToast();

  const onCancel = useCallback(() => {
    clearAllToast();
    reset();
    history.replace('/');
  }, [history, reset, clearAllToast]);

  const onPostPageSave = () => {
    // validation
    if (!title) {
      notify('Please note title...', 'error');
      return;
    }
    if (!body) {
      notify('Please note content...', 'error');
      return;
    }

    clearAllToast();
    setEditorMode('detail-page');
  };

  const onDetailPageCancel = () => {
    clearAllToast();
    setEditorMode('post-page');
  };

  return {
    onCancel,
    onPostPageSave,
    onDetailPageCancel,
    editorMode,
  };
}
