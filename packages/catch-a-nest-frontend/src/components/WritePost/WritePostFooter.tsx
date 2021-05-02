import { css } from '@emotion/react';
import media from '@src/lib/styles/media';
import AppButton from '../AppButton';

export type WritePostFooterProps = {
  onCancel(): void;
  onSaveTempPost(): void;
  onPostPageSave(): void;
};

const WritePostFooter = ({
  onCancel,
  onSaveTempPost,
  onPostPageSave,
}: WritePostFooterProps) => {
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

  ${media.sm} {
    padding: 0;
    button {
      border-radius: 0;
      height: 100%;
      width: 100%;
    }
  }
`;

export default WritePostFooter;
