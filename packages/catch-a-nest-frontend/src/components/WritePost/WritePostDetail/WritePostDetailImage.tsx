import { css } from '@emotion/react';
import { undrawUploadPicture } from '@src/assets/images';
import AppIcon from '@src/components/AppIcon';
import useAppToast from '@src/hooks/useAppToast';
import useUploadImage from '@src/hooks/useUploadImage';
import palette from '@src/lib/palette';
import { resetButton } from '@src/lib/styles/resetButton';
import { useEditorThumbnailState } from '@src/states/editorState';
import React, { useRef } from 'react';

export type WritePostDetailImageProps = {};

const WritePostDetailImage = (props: WritePostDetailImageProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { notify } = useAppToast();
  const { upload, error } = useUploadImage();
  const [thumbnail, setThumbnail] = useEditorThumbnailState();

  const onClick = () => {
    if (!ref.current) return;
    ref.current?.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      try {
        const targetFile = e.target.files[0];
        const imageUrl = await upload({ type: 'post', file: targetFile });
        if (!imageUrl) {
          const error = new Error('Failed upload thumbnail image');
          error.name = 'FailUploadThumbnail';
          throw error;
        }
        setThumbnail(imageUrl);
      } catch (e) {
        notify(`Error: ${e}`, 'error');
      }
    }
  };

  if (error) {
    notify(`Error: ${error}`, 'error');
  }

  return (
    <>
      {thumbnail ? (
        <div css={thumbnailWrapper}>
          <img className="image-thumbnail" src={thumbnail} alt="thumbnail" />
          <button
            tabIndex={0}
            css={updateButton}
            onClick={() => setThumbnail(null)}
          >
            REMOVE
          </button>
        </div>
      ) : (
        <div css={imageWrapper}>
          <img
            className="image-placeholder"
            src={undrawUploadPicture}
            alt="upload placeholder"
          />
          <button tabIndex={0} css={uploadButton} onClick={onClick}>
            {thumbnail ? <AppIcon name="fix" /> : <AppIcon name="plus" />}
          </button>
          <input
            ref={ref}
            type="file"
            css={hideInput}
            accept="image/*"
            onChange={onChange}
          />
        </div>
      )}
    </>
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

const thumbnailWrapper = css`
  position: relative;
  height: 15rem;
  margin-bottom: 1rem;
  .image-thumbnail {
    border-radius: 0.75rem;
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const updateButton = css`
  ${resetButton};
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 0.375rem 0.5rem;
  background: ${palette.blue[900]};
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  &:hover {
    background: ${palette.blue[700]};
  }
  &:active {
    background: ${palette.blue[800]};
  }
`;

const hideInput = css`
  display: none;
`;

export default WritePostDetailImage;
