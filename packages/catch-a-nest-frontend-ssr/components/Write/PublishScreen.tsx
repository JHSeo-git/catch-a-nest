import { css } from '@emotion/react';
import { UseFormRegister } from 'react-hook-form';
import {
  useIsEditPostValue,
  usePostShortDescriptionValue,
  usePostTitleValue,
  useVisiblePublishScreenState,
} from '@/lib/recoil/writeState';
import { slideDown, slideUp } from '@/lib/styles/animation';
import palette from '@/lib/styles/palette';
import { responsiveModalWidth } from '@/lib/styles/responsive';
import Modal from '../Modal';
import WriteThumbnail from './WriteThumbnail';
import AppButton from '../AppButton';
import { WriteInputs } from './Write';
import useLazyClose from '@/hooks/useLazyClose';
import { useThemeValue } from '@/lib/recoil/appState';

export type PublishScreenProps = {
  register: UseFormRegister<WriteInputs>;
  onPublish: () => void;
  handleThumbnailUrl: (url: string) => void;
};

const PublishScreen = ({
  register,
  onPublish,
  handleThumbnailUrl,
}: PublishScreenProps) => {
  const theme = useThemeValue();
  const [visible, setVisible] = useVisiblePublishScreenState();
  const { lazyClosed } = useLazyClose(visible, 200);
  const isEditPost = useIsEditPostValue();
  const title = usePostTitleValue();
  const shortDescription = usePostShortDescriptionValue();

  const onCancel = () => {
    setVisible(false);
  };

  if (!visible && lazyClosed) return null;

  return (
    <Modal css={modalStyle(visible, theme === 'DARK')}>
      <section css={wrapper(theme === 'DARK')}>
        <h1 css={titleStyle(theme === 'DARK')}>{title}</h1>
        <WriteThumbnail handleThumbnailUrl={handleThumbnailUrl} />
        <textarea
          {...register('shortDescription')}
          maxLength={160}
          tabIndex={0}
          css={textareaStyle(theme === 'DARK')}
          defaultValue={shortDescription ?? ''}
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
            onClick={onPublish}
            // loading={loading}
          />
        </div>
      </section>
    </Modal>
  );
};

const modalStyle = (visible: boolean, isDarkMode: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${palette.blueGrey[100]};

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[900]};
  `}

  ${visible
    ? css`
        animation: ${slideUp} 0.2s ease-in-out forwards;
      `
    : css`
        animation: ${slideDown} 0.2s ease-in-out forwards;
      `}
`;

const titleStyle = (isDarkMode: boolean) => css`
  color: ${palette.lightBlue[700]};
  margin: 0;
  margin-bottom: 1rem;
  font-size: 2.5rem;

  ${isDarkMode &&
  css`
    color: ${palette.lightBlue[200]};
  `}
`;

const wrapper = (isDarkMode: boolean) => css`
  ${responsiveModalWidth};
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;

  ${isDarkMode &&
  css`
    background: ${palette.blueGrey[700]};
  `}
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

const textareaStyle = (isDarkMode: boolean) => css`
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

  ${isDarkMode && css``}

  &::placeholder {
    color: ${palette.blueGrey[300]};
  }
`;

export default PublishScreen;
