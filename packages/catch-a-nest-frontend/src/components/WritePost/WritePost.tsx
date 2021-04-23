import React, { useEffect, useRef } from 'react';
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
  const { off, newTempArrived } = useNewTempArrivedActions();
  const { reset, isEdit } = useEditor();
  const { onSave } = useWritePost();
  const [, setIsTempUse] = useEditorIsTempUseState();
  const [postTitle] = useEditorTitleState();
  const [tempPostUseModal, setTempPostUseModal] = useTempPostUseModalState();
  const { isLoading } = useEditorLoad();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onTempUseModalOKClick = () => {
    off();
    setIsTempUse(true);
    setTempPostUseModal(false);
  };

  const onTempUseModalCancelClick = () => {
    off();
    setTempPostUseModal(false);
  };

  if (isLoading) return null;

  return (
    <>
      <Helmet>
        <title>{isEdit ? `Edit – ${postTitle}` : 'New Post'}</title>
      </Helmet>
      <section css={panelStyle}>
        <WritePostTitle />
        <Editor />
        <WritePostFooter />
      </section>
      <WritePostDetail onSaveOrUpdate={onSave} />
      {!newTempArrived && tempPostUseModal && (
        <OKCancelModal
          title="Exist temp post"
          body="Could you get temp post?"
          onClick={onTempUseModalOKClick}
          onCancel={onTempUseModalCancelClick}
        />
      )}
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WritePost;
