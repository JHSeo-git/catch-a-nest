import { css } from '@emotion/react';
import {
  useIsEditPostValue,
  usePostShortDescriptionState,
  usePostTitleValue,
  useVisiblePublishScreenState,
} from '@/lib/recoil/writeState';
import { slideUp } from '@/lib/styles/animation';
import palette from '@/lib/styles/palette';
import { responsiveModalWidth } from '@/lib/styles/responsive';
import Modal from '../Modal';
import PublishThumbnail from './PublishThumbnail';
import AppButton from '../AppButton';

export type PublishScreenProps = {};

const PublishScreen = (props: PublishScreenProps) => {
  const [visible, setVisible] = useVisiblePublishScreenState();
  const [description, setDescription] = usePostShortDescriptionState();
  const isEditPost = useIsEditPostValue();
  const title = usePostTitleValue();

  const onCancel = () => {
    setVisible(false);
  };

  const onSave = () => {
    console.log('onSave');
  };

  if (!visible) return null;

  return (
    <Modal css={modalStyle}>
      <section css={wrapper}>
        <h1 css={titleStyle}>{title}</h1>
        <PublishThumbnail />
        <textarea
          maxLength={160}
          tabIndex={0}
          css={textareaStyle}
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write short description"
        />
        <div css={btnGroup}>
          <AppButton
            //
            type="secondary"
            text="CANCEL"
            onClick={onCancel}
          />
          <AppButton
            type="primary"
            text={isEditPost ? 'UPDATE' : 'SAVE'}
            onClick={onSave}
            // loading={loading}
          />
        </div>
      </section>
    </Modal>
  );
};

const modalStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${palette.blueGrey[100]};
  animation: ${slideUp} 0.2s ease-in-out;
`;

const titleStyle = css`
  color: ${palette.lightBlue[700]};
  margin: 0;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const wrapper = css`
  ${responsiveModalWidth};
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const btnGroup = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > button {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

const textareaStyle = css`
  font-family: inherit;
  resize: none;
  border: 0.0625rem solid ${palette.blueGrey[300]};
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  height: 5.25rem;
  padding: 0.75rem;
  color: ${palette.blueGrey[900]};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  &::placeholder {
    color: ${palette.blueGrey[300]};
  }
`;

export default PublishScreen;
