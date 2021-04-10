import { css } from '@emotion/react';
import useEditor from '@src/hooks/useEditor';
import useWritePost from '@src/hooks/useWritePost';
import palette from '@src/lib/palette';
import { slideUp } from '@src/lib/styles/animation';
import { writePostDetailResponsiveWidth } from '@src/lib/styles/responsive';
import { useEditorTitleState } from '@src/states/editorState';
import Modal from '../../Modal';
import WritePostButton from '../WritePostButton';
import WritePostDetailImage from './WritePostDetailImage';
import WritePostDetailInput from './WritePostDetailInput';

export type WritePostDetailProps = {
  onSaveOrUpdate(slug?: string): void;
};

const WritePostDetail = ({ onSaveOrUpdate }: WritePostDetailProps) => {
  const [editorTitle] = useEditorTitleState();
  const { loading } = useWritePost();
  const { onDetailPageCancel, editorMode, isEdit } = useEditor();

  if (editorMode !== 'detail-page') return null;

  return (
    <Modal css={modalStyle}>
      <section css={detailWrapper}>
        <h1 css={titleStyle}>{editorTitle}</h1>
        <WritePostDetailImage />
        <WritePostDetailInput />
        <div css={btnGroup}>
          <WritePostButton
            text="Cancel"
            type="normal"
            onClick={onDetailPageCancel}
          />
          <WritePostButton
            text={isEdit ? 'Update' : 'Save'}
            type="primary"
            onClick={onSaveOrUpdate}
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
  ${writePostDetailResponsiveWidth};
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

export default WritePostDetail;
