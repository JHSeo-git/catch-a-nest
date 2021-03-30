import { css } from '@emotion/react';
import Editor from '../Editor';
import NewPostButton from './NewPostButton';

export type NewPostProps = {};

const NewPost = (props: NewPostProps) => {
  return (
    <section css={panelStyle}>
      <input type="text" css={inputStyle} />
      <Editor />
      <div css={btnGroup}>
        <NewPostButton type="primary" text="Save" />
        <NewPostButton type="normal" text="Cancel" />
      </div>
    </section>
  );
};

const panelStyle = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const inputStyle = css`
  outline: none;
  border: none;
  width: 50%;
  height: 3rem;
  padding-left: 2rem;
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
