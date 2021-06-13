import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useEditorLoad from '@src/hooks/useEditorLoad';
import { Helmet } from 'react-helmet-async';
import {
  useEditorMarkdownValue,
  useEditorTitleValue,
} from '@src/states/editorState';
import useFullScreenLoaderEffect from '@src/hooks/useFullScreenLoaderEffect';
import { fadeIn } from '@src/lib/styles/animation';

export type WritePostProps = {
  isEdit: boolean;
};

const WritePost = ({ isEdit }: WritePostProps) => {
  const title = useEditorTitleValue();
  const markdown = useEditorMarkdownValue();

  const {
    titleRef,
    editorRef,
    onCancel,
    onPostPageSave,
    onTempPageSave,
    onForceBodyUpdate,
    onDetailPageCancel,
    editorMode,
    reset,
    loading: saveLoading,
  } = useEditor();

  const { isLoading: syncLoading } = useEditorLoad();
  useFullScreenLoaderEffect(syncLoading);
  useFullScreenLoaderEffect(saveLoading);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  if (isEdit && !title && !markdown) return null;

  return (
    <>
      <Helmet>
        <title>{isEdit ? `Edit – ${title}` : 'New Post'}</title>
      </Helmet>
      <section css={panelStyle}>
        <WritePostTitle ref={titleRef} />
        <Editor
          ref={editorRef}
          isEdit={isEdit}
          onForceBodyUpdate={onForceBodyUpdate}
        />
        <WritePostFooter
          onCancel={onCancel}
          onPostPageSave={onPostPageSave}
          onSaveTempPost={onTempPageSave}
        />
      </section>
      <WritePostDetail
        onCancel={onDetailPageCancel}
        editorMode={editorMode}
        isEdit={isEdit}
      />
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export default WritePost;
