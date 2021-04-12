import uploadImage from '@src/lib/api/upload/uploadImage';
import axios from 'axios';
import { useCallback, useState } from 'react';

export default function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const upload = useCallback(
    async ({ file, type }: { file: File; type: string }) => {
      if (!file.type.includes('image')) {
        const e = new Error('Not image file...');
        e.name = 'NotImageFile';
        throw e;
      }
      if (file.size > 1024 * 1024 * 15) {
        const e = new Error('Image is too big');
        e.name = 'FileSizeBig';
        throw e;
      }

      try {
        setLoading(true);
        const uploadInfo = await uploadImage({ type, filename: file.name });
        const { image_path, signed_url } = uploadInfo;
        console.log(image_path, signed_url);
        await axios.put(signed_url, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        setImageUrl(image_path);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    upload,
    imageUrl,
    error,
  };
}
