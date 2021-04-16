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
import { useEditorTitleState } from '@src/states/editorState';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const { reset, isEdit } = useEditor();
  const { onSave } = useWritePost();
  const [postTitle] = useEditorTitleState();
  const { isLoading } = useEditorLoad();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <Helmet>
        {!isLoading && (
          <title>{isEdit ? `Edit – ${postTitle}` : 'New Post'}</title>
        )}
      </Helmet>
      <section css={panelStyle}>
        <WritePostTitle />
        <Editor />
        <WritePostFooter />
      </section>
      <WritePostDetail onSaveOrUpdate={onSave} />
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WritePost;
