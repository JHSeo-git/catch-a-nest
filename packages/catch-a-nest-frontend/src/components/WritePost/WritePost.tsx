import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useWritePost from '@src/hooks/useWritePost';
import useEditorLoad from '@src/hooks/useEditorLoad';
import { Helmet } from 'react-helmet-async';
import {
  useEditorIsTempUseState,
  useEditorTitleState,
} from '@src/states/editorState';
import {
  useNewTempArrivedActions,
  useTempPostUseModalState,
} from '@src/states/viewState';
import OKCancelModal from '../Modal/OKCancelModal';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const [tempPostUseModal, setTempPostUseModal] = useTempPostUseModalState();
  const [postTitle] = useEditorTitleState();
  const [, setIsTempUse] = useEditorIsTempUseState();
  const { off, newTempArrived } = useNewTempArrivedActions();
  const {
    editorRef,
    reset,
    isEdit,
    onForceBodyUpdate,
    onCancel,
    onPostPageSave,
    onTempPageSave,
  } = useEditor();
  const { onSave } = useWritePost();

  const { isLoading } = useEditorLoad();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    return () => {
      off();
    };
  }, [off]);

  const onTempUseModalOKClick = () => {
    setIsTempUse(true);
    setTempPostUseModal(false);
    off();
  };

  const onTempUseModalCancelClick = () => {
    setTempPostUseModal(false);
    off();
  };

  if (isLoading) return null;

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
      <WritePostDetail onSave={onSave} />
      <OKCancelModal
        view={!newTempArrived && tempPostUseModal}
        title="Could you get temp post?"
        onClick={onTempUseModalOKClick}
        onCancel={onTempUseModalCancelClick}
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
