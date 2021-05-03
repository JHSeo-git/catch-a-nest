import { css } from '@emotion/react';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import {
  useAppModalActions,
  useAppModalValue,
} from '@src/states/appModalState';
import AppButton from '../AppButton';
import Modal from './Modal';

const AppModal = () => {
  const {
    onCancel,
    onConfirm,
    message,
    title,
    cancelText,
    confirmText,
    visible,
    isDestructive,
  } = useAppModalValue();
  const { close } = useAppModalActions();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    close();
  };

  if (!visible) return null;

  return (
    <Modal css={modalOverride}>
      <div css={block(isDestructive ?? false)}>
        <h1>{title}</h1>
        {message && <p>{message}</p>}
        <div css={buttonGroup}>
          <AppButton
            text={cancelText ?? 'CANCEL'}
            type="normal"
            onClick={handleCancel}
          />
          <AppButton
            text={confirmText ?? 'OK'}
            type="thirdary"
            onClick={handleConfirm}
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

const block = (isDestructive: boolean) => css`
  width: 25rem;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 0.25rem 0.25rem rgb(0, 0, 0, 0.05);

  h1 {
    margin: 0;
    margin-bottom: 2rem;
    color: ${isDestructive ? palette.red[500] : palette.blueGrey[900]};
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
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
  justify-content: flex-end;
  button + button {
    margin-left: 1rem;
  }
`;

export default AppModal;
