import { css } from '@emotion/react';
import { uploadPicture } from '@src/assets/images';
import palette from '@src/lib/palette';
import { newPostDetailResponsiveWidth } from '@src/lib/styles/responsive';
import { useEditorTitleState } from '@src/states/editorState';
import Modal from '../Modal';

export type NewPostDetailProps = {};

const NewPostDetail = (props: NewPostDetailProps) => {
  const [editorTitle] = useEditorTitleState();
  return (
    <Modal css={modalStyle}>
      <section css={detailWrapper}>
        <h1 css={titleStyle}>{editorTitle}</h1>
        <div css={imageWrapper}>
          <img src={uploadPicture} alt="upload placeholder" />
        </div>
        <h2>Short Description</h2>
      </section>
    </Modal>
  );
};

const modalStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const titleStyle = css`
  color: ${palette.teal[700]};
  margin: 0;
  font-size: 2.5rem;
`;

const detailWrapper = css`
  ${newPostDetailResponsiveWidth};
  background: white;
  border-radius: 0.125rem;
  padding: 2rem;
`;

const imageWrapper = css`
  img {
    height: 10rem;
  }
`;

export default NewPostDetail;
