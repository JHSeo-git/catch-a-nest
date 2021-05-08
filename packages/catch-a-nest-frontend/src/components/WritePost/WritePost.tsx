import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useEditorLoad from '@src/hooks/useEditorLoad';
import { Helmet } from 'react-helmet-async';
import { useEditorTitleState } from '@src/states/editorState';
import useFullScreenLoaderEffect from '@src/hooks/useFullScreenLoaderEffect';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const [postTitle] = useEditorTitleState();

  const {
    reset,
    editorRef,
    onForceBodyUpdate,
    onPostPageSave,
    onTempPageSave,
    onCancel,
    onDetailPageCancel,
    editorMode,
    isEdit,
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

  if (syncLoading) return null;

  return (
    <>
      <Helmet>
        <title>{isEdit ? `Edit – ${postTitle}` : 'New Post'}</title>
      </Helmet>
      <section css={panelStyle}>
        <WritePostTitle />
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
`;

export default WritePost;
