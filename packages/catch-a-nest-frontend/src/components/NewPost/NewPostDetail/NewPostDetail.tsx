import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import palette from '@src/lib/palette';
import { slideUp } from '@src/lib/styles/animation';
import { newPostDetailResponsiveWidth } from '@src/lib/styles/responsive';
import { useEditorTitleState } from '@src/states/editorState';
import Modal from '../../Modal';
import NewPostButton from '../NewPostButton';
import NewPostDetailImage from './NewPostDetailImage';
import NewPostDetailInput from './NewPostDetailInput';

export type NewPostDetailProps = {};

const NewPostDetail = (props: NewPostDetailProps) => {
  const [editorTitle] = useEditorTitleState();
  const { onSave, loading } = useWritePost();
  const { onDetailPageCancel } = useEditor();
  return (
    <Modal css={modalStyle}>
      <section css={detailWrapper}>
        <h1 css={titleStyle}>{editorTitle}</h1>
        <NewPostDetailImage />
        <NewPostDetailInput />
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
