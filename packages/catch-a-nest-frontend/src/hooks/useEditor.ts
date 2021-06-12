import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { Editor } from '@toast-ui/react-editor';
import {
  useEditorContentActions,
  useEditorContentValue,
  useEditorMarkdownState,
  useEditorModeState,
  useEditorTitleState,
} from '@src/states/editorState';
import useAppToast from './useAppToast';
import { useEditingInfoValue } from '../states/editorState';
import useWritePost from './useWritePost';

export default function useEditor() {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<Editor>(null);
  const history = useHistory();

  const [editorMode, setEditorMode] = useEditorModeState();
  const [, setEditorMarkdownValue] = useEditorMarkdownState();
  const [title, setEditorTitle] = useEditorTitleState();
  const postContent = useEditorContentValue();
  const { isEdit } = useEditingInfoValue();

  const { reset } = useEditorContentActions();

  const { notify } = useAppToast();
  const { onSaveTempPost, loading } = useWritePost();

  useEffect(() => {
    if (!title) return;
    if (!titleRef?.current) return;
    titleRef.current.value = title;
  }, [title]);

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
    if (!titleRef.current) return;
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();
    const title = titleRef.current.value;

    if (!isPostValid(title, markdown)) return;

    setEditorTitle(title);
    setEditorMarkdownValue(markdown);
    setEditorMode('detail-page');
  };

  const onTempPageSave = () => {
    if (!titleRef.current) return;
    if (!editorRef.current) return;
    const markdown = editorRef.current.getInstance().getMarkdown();
    const title = titleRef.current.value;

    if (!isPostValid(title, markdown)) return;

    setEditorTitle(title);
    setEditorMarkdownValue(markdown);
    onSaveTempPost({
      title: title,
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
    titleRef,
    editorRef,
    onCancel,
    onPostPageSave,
    onForceBodyUpdate,
    onDetailPageCancel,
    onTempPageSave,
    editorMode,
    reset,
    isEdit,
    loading,
  };
}
