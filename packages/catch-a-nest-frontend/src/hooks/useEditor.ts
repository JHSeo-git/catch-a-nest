import {
  useEditorContentActions,
  useEditorModeState,
} from '@src/states/editorState';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

export default function useEditor() {
  const history = useHistory();
  const [editorMode, setEditorMode] = useEditorModeState();
  const { reset } = useEditorContentActions();

  const onCancel = useCallback(() => {
    reset();
    history.replace('/');
  }, [history, reset]);

  const moveMode = useCallback(
    (isBack?: boolean) => {
      if (isBack) {
        if (editorMode === 'pre-save') {
          setEditorMode('pre-detail');
        }
      } else {
        if (editorMode === 'pre-detail') {
          // detail modal
          setEditorMode('pre-save');
        } else if (editorMode === 'pre-save') {
          // save
        }
      }
    },
    [editorMode, setEditorMode]
  );

  return {
    onCancel,
    moveMode,
    editorMode,
  };
}
