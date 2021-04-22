import { useCallback, useRef } from 'react';
import { useHistory } from 'react-router';
import { Editor } from '@toast-ui/react-editor';
import {
  useEditorContentActions,
  useEditorContentValue,
  useEditorMarkdownState,
  useEditorModeState,
} from '@src/states/editorState';
import useAppToast from './useAppToast';
import { useEditingInfoValue } from '../states/editorState';

export default function useEditor() {
  const { isEdit } = useEditingInfoValue();
  const editorRef = useRef<Editor>(null);
  const history = useHistory();
  const [, setEditorMarkdownValue] = useEditorMarkdownState();
  const [editorMode, setEditorMode] = useEditorModeState();
  const { reset } = useEditorContentActions();
  const { title, body } = useEditorContentValue();
  const { notify, clearAllToast } = useAppToast();

  const onChange = () => {
    if (!editorRef.current) return;
    setEditorMarkdownValue(editorRef.current.getInstance().getMarkdown());
  };

  const onCancel = useCallback(() => {
    history.goBack();
    clearAllToast();
  }, [history, clearAllToast]);

  const onPostPageSave = () => {
    // validation
    if (!title) {
      notify('Please check title...', 'error');
      return;
    }
    if (!body) {
      notify('Please check content...', 'error');
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
    onChange,
    editorRef,
    reset,
    isEdit,
  };
}
