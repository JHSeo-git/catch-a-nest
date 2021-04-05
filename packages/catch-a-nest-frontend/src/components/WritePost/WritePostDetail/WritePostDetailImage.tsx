import { css } from '@emotion/react';
import { undrawUploadPicture } from '@src/assets/images';
import AppIcon from '@src/components/AppIcon';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';

export type WritePostDetailImageProps = {};

const WritePostDetailImage = (props: WritePostDetailImageProps) => {
  return (
    <div css={imageWrapper}>
      <img
        className="image-placeholder"
        src={undrawUploadPicture}
        alt="upload placeholder"
      />
      <button tabIndex={0} css={uploadButton}>
        <AppIcon name="plus" />
      </button>
    </div>
  );
};

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
  height: 2.25rem;
  width: 2.25rem;
  color: white;
  background: ${palette.lightBlue[500]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  svg {
    height: 1.125rem;
    width: 1.125rem;
    color: white;
  }
`;

export default WritePostDetailImage;
