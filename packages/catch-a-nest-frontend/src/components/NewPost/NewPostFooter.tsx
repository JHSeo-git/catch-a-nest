import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import NewPostButton from './NewPostButton';

export type NewPostFooterProps = {};

const NewPostFooter = (props: NewPostFooterProps) => {
  const { onCancel, onPostPageSave } = useEditor();
  return (
    <footer css={footerStyle}>
      <NewPostButton
        type="normal"
        text="Back"
        onClick={onCancel}
        preIconName="arrowLeft"
      />
      <NewPostButton type="primary" text="Post" onClick={onPostPageSave} />
    </footer>
  );
};

const footerStyle = css`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 2rem;
  padding-left: 2rem;
`;

export default NewPostFooter;
