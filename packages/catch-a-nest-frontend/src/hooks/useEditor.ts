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
  const { editTargetSlug, isEdit } = useEditingInfoValue();
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
    reset();
    clearAllToast();
    if (isEdit) {
      history.replace(`/post/${editTargetSlug}`);
    } else {
      history.replace('/');
    }
  }, [history, reset, clearAllToast, isEdit, editTargetSlug]);

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
