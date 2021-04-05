import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import WritePostButton from './WritePostButton';

export type WritePostFooterProps = {};

const WritePostFooter = (props: WritePostFooterProps) => {
  const { onCancel, onPostPageSave } = useEditor();
  return (
    <footer css={footerStyle}>
      <WritePostButton
        type="normal"
        text="Back"
        onClick={onCancel}
        preIconName="arrowLeft"
      />
      <WritePostButton type="primary" text="Post" onClick={onPostPageSave} />
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

export default WritePostFooter;
