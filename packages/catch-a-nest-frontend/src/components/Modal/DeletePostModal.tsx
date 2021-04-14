import { css } from '@emotion/react';
import useAppToast from '@src/hooks/useAppToast';
import useDeletePost from '@src/hooks/useDeletePost';
import palette from '@src/lib/palette';
import media from '@src/lib/styles/media';
import AppButton from '../AppButton';
import Modal from './Modal';

export type DeletePostModalProps = {
  slug: string;
};

const DeletePostModal = ({ slug }: DeletePostModalProps) => {
  const {
    onDelete,
    deleteModal,
    onCancelModal,
    loading,
    error,
  } = useDeletePost();
  const { notify } = useAppToast();

  if (!deleteModal) return null;
  if (error) {
    notify(`${error}`, 'error');
  }

  return (
    <Modal css={modalOverride}>
      <div css={block}>
        <h1>Post Delete</h1>
        <div css={buttonGroup}>
          <AppButton text="CANCEL" type="normal" onClick={onCancelModal} />
          <AppButton
            text="DELETE"
            type="thirdary"
            loading={loading}
            onClick={() => onDelete(slug)}
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

export default DeletePostModal;
