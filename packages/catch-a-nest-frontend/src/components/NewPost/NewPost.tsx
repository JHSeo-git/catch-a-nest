import React from 'react';
import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import Editor from '../Editor';
import NewPostButton from './NewPostButton';
import NexPostTitle from './NexPostTitle';
import NewPostDetail from './NewPostDetail';

export type NewPostProps = {};

const NewPost = (props: NewPostProps) => {
  const { loading } = useWritePost();
  const { onCancel, moveMode, editorMode } = useEditor();
  return (
    <>
      <section css={panelStyle}>
        <NexPostTitle />
        <Editor />
        <div css={btnGroup}>
          <NewPostButton type="normal" text="Cancel" onClick={onCancel} />
          <NewPostButton
            type="primary"
            text="Post"
            onClick={() => moveMode()}
            loading={loading}
          />
        </div>
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

const btnGroup = css`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  & > button {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export default NewPost;
