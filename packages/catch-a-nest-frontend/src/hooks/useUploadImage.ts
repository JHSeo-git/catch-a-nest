import uploadImage from '@src/lib/api/upload/uploadImage';
import { isAxiosError } from '@src/lib/utils/isAxiosError';
import { useAppModalActions } from '@src/states/appModalState';
import axios from 'axios';
import { useCallback, useState } from 'react';

export default function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { open } = useAppModalActions();

  const upload = useCallback(
    async ({ file, type }: { file: File; type: string }) => {
      try {
        if (!file.type.includes('image')) {
          const e = new Error('Not image file');
          e.name = 'NotImageFile';
          throw e;
        }
        if (file.size > 1024 * 1024 * 15) {
          const e = new Error('Image is too big');
          e.name = 'FileSizeBig';
          throw e;
        }

        setLoading(true);
        const uploadInfo = await uploadImage({ type, filename: file.name });

        const { image_path, signed_url } = uploadInfo;

        if (!image_path) {
          const e = new Error('Failed upload thumbnail image');
          e.name = 'FailUploadThumbnail';
          throw e;
        }

        await axios.put(signed_url, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        setImageUrl(image_path);

        return image_path;
      } catch (e) {
        if (isAxiosError(e)) {
          open({
            title: 'Error upload image',
            message: `Error ${e.message}`,
            isDestructive: true,
          });
        } else {
          open({
            title: e.name ?? 'Error upload image',
            message: `Error ${e.message}`,
            isDestructive: true,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [open]
  );

  return {
    loading,
    upload,
    imageUrl,
  };
}
