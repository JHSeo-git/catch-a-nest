import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import AppButton from '../AppButton';
import Modal from './Modal';

export type OKCancelModalProps = {
  title: string;
  body?: string;
  loading?: boolean;
  onClick(): void;
  onCancel(): void;
  view: boolean;
};

const OKCancelModal = ({
  title,
  body,
  loading,
  onClick,
  onCancel,
  view,
}: OKCancelModalProps) => {
  if (!view) return null;

  return (
    <Modal css={modalOverride}>
      <div css={block}>
        <h1>{title}</h1>
        {body && <p>{body}</p>}
        <div css={buttonGroup}>
          <AppButton text="CANCEL" type="normal" onClick={onCancel} />
          <AppButton
            text="OK"
            type="thirdary"
            loading={loading}
            onClick={onClick}
          />
        </div>
      </div>
    </Modal>
  );
};

const modalOverride = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const block = css`
  width: 25rem;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 1rem;

  h1 {
    color: ${palette.blueGrey[900]};
    text-align: center;
  }

  ${media.custom(500)} {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const buttonGroup = css`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  button + button {
    margin-left: 1rem;
  }
`;

export default OKCancelModal;
