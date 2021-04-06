import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import WritePostTitle from './WritePostTitle';
import WritePostDetail from './WritePostDetail';
import WritePostFooter from './WritePostFooter';

export type WritePostProps = {};

const WritePost = (props: WritePostProps) => {
  const { editorMode, reset } = useEditor();

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
      {editorMode === 'detail-page' && <WritePostDetail />}
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default WritePost;
