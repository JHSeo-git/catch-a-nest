import React from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import Editor from '../Editor';
import NexPostTitle from './NexPostTitle';
import NewPostDetail from './NewPostDetail';
import NewPostFooter from './NewPostFooter';

export type NewPostProps = {};

const NewPost = (props: NewPostProps) => {
  const { editorMode } = useEditor();
  return (
    <>
      <section css={panelStyle}>
        <NexPostTitle />
        <Editor />
        <NewPostFooter />
      </section>
      {editorMode === 'pre-save' && <NewPostDetail />}
    </>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default NewPost;
