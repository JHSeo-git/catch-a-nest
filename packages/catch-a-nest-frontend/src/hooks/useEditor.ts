import { useEditorModeState } from '@src/states/editorState';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

export default function useEditor() {
  const history = useHistory();
  const [editorMode, setEditorMode] = useEditorModeState();

  const onCancel = useCallback(() => {
    history.replace('/');
  }, [history]);

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
