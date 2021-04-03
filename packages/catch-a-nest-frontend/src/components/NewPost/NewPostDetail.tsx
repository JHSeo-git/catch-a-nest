import { css } from '@emotion/react';
import { uploadPicture } from '@src/assets/images';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import palette from '@src/lib/palette';
import { slideUp } from '@src/lib/styles/animation';
import { resetButton } from '@src/lib/styles/resetButton';
import { newPostDetailResponsiveWidth } from '@src/lib/styles/responsive';
import { useEditorTitleState } from '@src/states/editorState';
import Modal from '../Modal';
import NewPostButton from './NewPostButton';

export type NewPostDetailProps = {};

const NewPostDetail = (props: NewPostDetailProps) => {
  const [editorTitle] = useEditorTitleState();
  const { onSave, loading } = useWritePost();
  const { onDetailPageCancel } = useEditor();
  return (
    <Modal css={modalStyle}>
      <section css={detailWrapper}>
        <h1 css={titleStyle}>{editorTitle}</h1>
        <div css={imageWrapper}>
          <img
            className="image-placeholder"
            src={uploadPicture}
            alt="upload placeholder"
          />
          <button tabIndex={0} css={uploadButton}>
            Upload
          </button>
        </div>
        <textarea
          maxLength={160}
          tabIndex={0}
          css={shortDescStyle}
          placeholder="Please write short description"
        />
        <div css={btnGroup}>
          <NewPostButton
            text="Cancel"
            type="normal"
            onClick={onDetailPageCancel}
          />
          <NewPostButton
            text="Save"
            type="primary"
            onClick={onSave}
            loading={loading}
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

const detailWrapper = css`
  ${newPostDetailResponsiveWidth};
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
`;

const imageWrapper = css`
  position: relative;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: 0.2rem dashed ${palette.blueGrey[100]};
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  .image-placeholder {
    display: block;
    height: 5rem;
  }
`;

const uploadButton = css`
  ${resetButton};
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: white;
  background: ${palette.lightBlue[500]};
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;

const shortDescStyle = css`
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

export default NewPostDetail;
