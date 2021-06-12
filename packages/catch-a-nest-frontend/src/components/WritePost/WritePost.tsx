import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useEditorLoad from '@src/hooks/useEditorLoad';
import { Helmet } from 'react-helmet-async';
import { useEditorTitleValue } from '@src/states/editorState';
import useFullScreenLoaderEffect from '@src/hooks/useFullScreenLoaderEffect';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const postTitle = useEditorTitleValue();

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

  // TODO: 화면 isEdit 값이 초기 값부터 false 인데... 껌뻑이는거 없애야함

  return (
    <>
      <Helmet>
        <title>{isEdit ? `Edit – ${postTitle}` : 'New Post'}</title>
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
`;

export default WritePost;
