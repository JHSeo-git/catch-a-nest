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
import useWritePost from './useWritePost';

export default function useEditor() {
  const editorRef = useRef<Editor>(null);
  const history = useHistory();
  const [, setEditorMarkdownValue] = useEditorMarkdownState();

  const postContent = useEditorContentValue();
  const [editorMode, setEditorMode] = useEditorModeState();
  const { isEdit } = useEditingInfoValue();
  const { title } = useEditorContentValue();
  const { reset } = useEditorContentActions();
  const { notify, clearAllToast } = useAppToast();
  const { onSaveTempPost } = useWritePost();

  const onForceBodyUpdate = (markdown: string) => {
    if (!editorRef.current) return;
    editorRef.current.getInstance().setMarkdown(markdown, true);
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

    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();

    if (!markdown) {
      notify('Please check content...', 'error');
      return;
    }
    setEditorMarkdownValue(markdown);
    clearAllToast();
    setEditorMode('detail-page');
  };

  const onTempPageSave = () => {
    // validation
    if (!title) {
      notify('Please check title...', 'error');
      return;
    }
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();

    if (!markdown) {
      notify('Please check content...', 'error');
      return;
    }
    setEditorMarkdownValue(markdown);
    onSaveTempPost({
      title,
      body: markdown,
      shortDescription: postContent.shortDescription,
      thumbnail: postContent.thumbnail,
    });
  };

  const onDetailPageCancel = () => {
    clearAllToast();
    setEditorMode('post-page');
  };

  return {
    onCancel,
    onForceBodyUpdate,
    onPostPageSave,
    onDetailPageCancel,
    editorMode,
    editorRef,
    reset,
    isEdit,
    onTempPageSave,
  };
}
