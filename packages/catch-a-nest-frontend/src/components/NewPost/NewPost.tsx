import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import Editor from '../Editor';
import NewPostButton from './NewPostButton';
import NexPostTitle from './NexPostTitle';

export type NewPostProps = {};

const NewPost = (props: NewPostProps) => {
  const { onSave, loading } = useWritePost();
  const { onCancel } = useEditor();
  return (
    <section css={panelStyle}>
      <NexPostTitle />
      <Editor />
      <div css={btnGroup}>
        <NewPostButton type="normal" text="Cancel" onClick={onCancel} />
        <NewPostButton
          type="primary"
          text="Save"
          onClick={onSave}
          loading={loading}
        />
      </div>
    </section>
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
