import { useRef } from 'react';
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

  const [editorMode, setEditorMode] = useEditorModeState();
  const [, setEditorMarkdownValue] = useEditorMarkdownState();
  const postContent = useEditorContentValue();
  const { isEdit } = useEditingInfoValue();

  const { reset } = useEditorContentActions();

  const { notify } = useAppToast();
  const { onSaveTempPost, loading } = useWritePost();

  const onForceBodyUpdate = (markdown: string) => {
    if (!editorRef.current) return;
    editorRef.current.getInstance().setMarkdown(markdown, true);
  };

  const isPostValid = (title: string | null, markdown: string | null) => {
    if (!title) {
      notify('Please check title...', 'error');
      return false;
    }
    if (!markdown) {
      notify('Please check content...', 'error');
      return false;
    }

    return true;
  };

  const onPostPageSave = () => {
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();

    if (!isPostValid(postContent.title, markdown)) return;

    setEditorMarkdownValue(markdown);
    setEditorMode('detail-page');
  };

  const onTempPageSave = () => {
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();

    if (!isPostValid(postContent.title, markdown)) return;

    setEditorMarkdownValue(markdown);
    onSaveTempPost({
      title: postContent.title,
      body: markdown,
      shortDescription: postContent.shortDescription,
      thumbnail: postContent.thumbnail,
    });
  };

  const onCancel = () => {
    history.goBack();
  };

  const onDetailPageCancel = () => {
    setEditorMode('post-page');
  };

  // useEffect(() => {
  //   return () => {
  //     clearAllToast();
  //   };
  // }, [clearAllToast]);

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
    loading,
  };
}
