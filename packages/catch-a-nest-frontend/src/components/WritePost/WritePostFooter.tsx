import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import AppButton from '../AppButton';

export type WritePostFooterProps = {};

const WritePostFooter = (props: WritePostFooterProps) => {
  const { onCancel, onPostPageSave } = useEditor();
  const { onSaveTempPost } = useWritePost();
  return (
    <footer css={footerStyle}>
      <AppButton
        type="normal"
        text="BACK"
        onClick={onCancel}
        preIconName="arrowLeft"
      />
      <AppButton type="secondary" text="TEMP" onClick={onSaveTempPost} />
      <AppButton type="primary" text="POST" onClick={onPostPageSave} />
    </footer>
  );
};

const footerStyle = css`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export default WritePostFooter;
