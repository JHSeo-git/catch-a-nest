import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import EmptyImage from '@/assets/images/undraw-empty.svg';
import { usePostThumbnailUrlState } from '@/lib/recoil/writeState';
import palette from '@/lib/styles/palette';
import { resetButton } from '@/lib/styles/reset/resetButton';
import useUploadImage from '@/hooks/useUploadImage';
import AppIcon from '../AppIcon';
import { UseFormRegister } from 'react-hook-form';
import { WriteInputs } from './Write';

export type WriteThumbnailProps = {
  handleThumbnailUrl: (url: string) => void;
};

const WriteThumbnail = ({ handleThumbnailUrl }: WriteThumbnailProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { upload } = useUploadImage();
  const [thumbnailUrl, setThumbnailUrl] = usePostThumbnailUrlState();

  const onClick = () => {
    if (!ref.current) return;
    ref.current?.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      const targetFile = e.target.files[0];
      const imageUrl = await upload({ type: 'post', file: targetFile });
      if (!imageUrl) {
        return;
      }
      setThumbnailUrl(imageUrl);
      handleThumbnailUrl(imageUrl);
    }
  };

  useEffect(() => {
    if (!thumbnailUrl) return;
    handleThumbnailUrl(thumbnailUrl);
  }, [thumbnailUrl, handleThumbnailUrl]);

  return (
    <>
      {thumbnailUrl ? (
        <div css={thumbnailWrapper}>
          <Image
            className="image-thumbnail"
            src={thumbnailUrl}
            alt="thumbnail"
            layout="fill"
            placeholder="empty"
            objectFit="cover"
          />
          <button
            tabIndex={0}
            css={updateButton}
            onClick={() => setThumbnailUrl(null)}
          >
            REMOVE
          </button>
        </div>
      ) : (
        <div css={imageWrapper}>
          <EmptyImage className="image-placeholder" />
          <button tabIndex={0} css={uploadButton} onClick={onClick}>
            {thumbnailUrl ? <AppIcon name="fix" /> : <AppIcon name="plus" />}
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
    width: 100%;
    height: auto;
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

export default WriteThumbnail;
