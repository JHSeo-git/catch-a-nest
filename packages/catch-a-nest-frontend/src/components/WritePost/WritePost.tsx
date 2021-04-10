import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';
import useWritePost from '@src/hooks/useWritePost';
import useEditorLoad from '@src/hooks/useEditorLoad';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const { reset } = useEditor();
  const { onSave } = useWritePost();
  useEditorLoad();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
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
